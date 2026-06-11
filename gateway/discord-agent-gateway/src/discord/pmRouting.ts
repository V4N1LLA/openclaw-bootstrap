import type { GatewayConfig } from "../config.js";
import type { PmPreflightResult } from "./pmIntake.js";

type PmRouteTarget =
  | "agent-dev-local"
  | "agent-docs-local"
  | "agent-review"
  | "agent-ops"
  | "agent-log";

type PmRouteStatus = "ready" | "setup-needed" | "stopped";

type PmRoute = {
  target: PmRouteTarget;
  channelId?: string;
  reason: string;
  status: PmRouteStatus;
};

type PmWorkCardInput = {
  command: string;
  preflight: PmPreflightResult;
  route: PmRoute;
};

export function createPmRoutingDraft(
  command: string,
  preflight: PmPreflightResult,
  config: GatewayConfig
): string {
  const route = selectPmRoute(command, preflight, config);
  const workCard = createWorkCardDraft({ command, preflight, route });

  return [
    "Sub-Agent routing",
    `Status: ${route.status}`,
    `Target: #${route.target}`,
    `Channel configured: ${route.channelId ? "yes" : "no"}`,
    `Reason: ${route.reason}`,
    "",
    "Work card draft",
    workCard
  ].join("\n");
}

function selectPmRoute(
  command: string,
  preflight: PmPreflightResult,
  config: GatewayConfig
): PmRoute {
  if (preflight.stops.length > 0) {
    const target = "agent-log";
    const channelId = getChannelIdForTarget(target, config);

    return {
      target,
      channelId,
      reason: "preflight stopped; forced to audit/log route",
      status: "stopped"
    };
  }

  const target = chooseRouteTarget(command, preflight);
  const channelId = getChannelIdForTarget(target, config);

  if (!channelId) {
    return {
      target,
      reason: `missing channel id for #${target}`,
      status: "setup-needed"
    };
  }

  return {
    target,
    channelId,
    reason: `classification=${preflight.classification}`,
    status: "ready"
  };
}

function chooseRouteTarget(
  command: string,
  preflight: PmPreflightResult
): PmRouteTarget {
  const normalized = command.toLowerCase();

  if (preflight.classification === "STOP") {
    return "agent-log";
  }

  if (preflight.classification === "CRITICAL") {
    return "agent-ops";
  }

  if (/(review|리뷰|pr 상태|thread|comment|댓글)/i.test(command)) {
    return "agent-review";
  }

  if (/(docs|문서|정책|하네스|체크리스트|readme|handoff)/i.test(normalized)) {
    return "agent-docs-local";
  }

  if (preflight.classification === "LOW") {
    return "agent-log";
  }

  return "agent-dev-local";
}

function getChannelIdForTarget(
  target: PmRouteTarget,
  config: GatewayConfig
): string | undefined {
  if (target === "agent-dev-local") {
    return config.discordAgentDevLocalChannelId;
  }

  if (target === "agent-docs-local") {
    return config.discordAgentDocsLocalChannelId;
  }

  if (target === "agent-review") {
    return config.discordAgentReviewChannelId;
  }

  if (target === "agent-ops") {
    return config.discordAgentOpsChannelId;
  }

  return config.discordAgentLogChannelId;
}

function createWorkCardDraft(input: PmWorkCardInput): string {
  return [
    `- title: ${input.preflight.summary}`,
    `- classification: ${input.preflight.classification}`,
    `- target: #${input.route.target}`,
    `- route_status: ${input.route.status}`,
    "- execute: false",
    "- fan_in: false",
    "- allowed_next_step: manual review only"
  ].join("\n");
}
