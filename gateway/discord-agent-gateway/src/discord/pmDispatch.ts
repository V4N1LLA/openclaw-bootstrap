import type { Client } from "discord.js";
import type { GatewayConfig } from "../config.js";
import type { PmPreflightResult } from "./pmIntake.js";
import {
  createPmRoutingPlan,
  type PmRoute,
  type PmRoutingPlan
} from "./pmRouting.js";

export type PmDispatchStatus = "sent" | "setup-needed" | "stopped";

export type PmDispatchResult = {
  status: PmDispatchStatus;
  target: PmRoute["target"];
  channelConfigured: boolean;
  channelSent: boolean;
  executionStarted: false;
  reason: string;
};

export type PmDispatchPlan = {
  routing: PmRoutingPlan;
  dispatch: PmDispatchResult;
};

export type PmChannelSender = {
  sendToChannel(channelId: string, content: string): Promise<void>;
};

export async function dispatchPmWorkCard(
  command: string,
  preflight: PmPreflightResult,
  config: GatewayConfig,
  sender: PmChannelSender
): Promise<PmDispatchPlan> {
  const routing = createPmRoutingPlan(command, preflight, config);
  const card = createDispatchCard(command, preflight, routing);

  if (!routing.route.channelId) {
    return {
      routing,
      dispatch: {
        status: "setup-needed",
        target: routing.route.target,
        channelConfigured: false,
        channelSent: false,
        executionStarted: false,
        reason: `missing channel id for #${routing.route.target}; dispatch stopped safely`
      }
    };
  }

  try {
    await sender.sendToChannel(routing.route.channelId, card);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown channel send failure";

    return {
      routing,
      dispatch: {
        status: "stopped",
        target: routing.route.target,
        channelConfigured: true,
        channelSent: false,
        executionStarted: false,
        reason: `channel dispatch failed; stopped safely: ${detail}`
      }
    };
  }

  return {
    routing,
    dispatch: {
      status: "sent",
      target: routing.route.target,
      channelConfigured: true,
      channelSent: true,
      executionStarted: false,
      reason: getSentReason(preflight, routing.route)
    }
  };
}

export function createDiscordChannelSender(client: Client): PmChannelSender {
  return {
    async sendToChannel(channelId: string, content: string): Promise<void> {
      const channel = await client.channels.fetch(channelId);

      if (!channel?.isTextBased() || !("send" in channel)) {
        throw new Error("target channel is not accessible as a text channel");
      }

      await channel.send(content);
    }
  };
}

export function formatPmDispatchSummary(plan: PmDispatchPlan): string {
  return [
    "Dispatch",
    `Target channel: #${plan.dispatch.target}`,
    `Dispatch result: ${plan.dispatch.status}`,
    `Channel configured: ${plan.dispatch.channelConfigured ? "yes" : "no"}`,
    `Channel sent: ${plan.dispatch.channelSent ? "yes" : "no"}`,
    `Execution started: ${plan.dispatch.executionStarted ? "yes" : "no"}`,
    `Reason: ${plan.dispatch.reason}`
  ].join("\n");
}

function createDispatchCard(
  command: string,
  preflight: PmPreflightResult,
  routing: PmRoutingPlan
): string {
  if (routing.route.status === "stopped") {
    return [
      "PM audit card",
      `Classification: ${preflight.classification}`,
      `Summary: ${preflight.summary}`,
      `Route: #${routing.route.target}`,
      "Execution: false",
      "",
      "Stops:",
      ...preflight.stops.map((stop) => `- ${stop}`)
    ].join("\n");
  }

  if (preflight.classification === "CRITICAL") {
    return [
      "PM approval required card",
      `Classification: ${preflight.classification}`,
      `Summary: ${preflight.summary}`,
      `Route: #${routing.route.target}`,
      "Execution: false",
      "Required action: explicit user approval before any execution"
    ].join("\n");
  }

  return [
    "PM work card",
    routing.workCard,
    "",
    "Original command",
    command.trim() || "(empty)"
  ].join("\n");
}

function getSentReason(preflight: PmPreflightResult, route: PmRoute): string {
  if (route.status === "stopped") {
    return "audit card sent to #agent-log; no execution candidate channel was used";
  }

  if (preflight.classification === "CRITICAL") {
    return "approval required card sent to #agent-ops; execution was not started";
  }

  return "work card dispatched; execution was not started by this gateway";
}
