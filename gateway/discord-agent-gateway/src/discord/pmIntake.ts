import type { GatewayConfig } from "../config.js";
import { createPmRoutingDraft } from "./pmRouting.js";

export type PmClassification = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "STOP";

type PmPreflightInput = {
  channelId?: string | null;
  command: string;
  config: GatewayConfig;
};

export type PmPreflightResult = {
  classification: PmClassification;
  stops: string[];
  warnings: string[];
  summary: string;
};

const MAX_COMMAND_LENGTH = 1_500;

export function createPmIntakeResponse(input: PmPreflightInput): string {
  const result = runPmPreflight(input);
  const nextStep = formatNextStep(result);
  const routingDraft = createPmRoutingDraft(input.command, result, input.config);

  return [
    "Discord PM command intake",
    `Preflight: ${result.stops.length > 0 ? "STOP" : "PASS"}`,
    `Classification: ${result.classification}`,
    `Summary: ${result.summary}`,
    "",
    "Runtime guard",
    ...formatList("Stops", result.stops),
    ...formatList("Warnings", result.warnings),
    "",
    routingDraft,
    "",
    "Next step",
    nextStep
  ].join("\n");
}

function runPmPreflight(input: PmPreflightInput): PmPreflightResult {
  const command = input.command.trim();
  const warnings: string[] = [];
  const stops: string[] = [];

  if (!command) {
    stops.push("command text is empty");
  }

  if (command.length > MAX_COMMAND_LENGTH) {
    stops.push(`command text exceeds ${MAX_COMMAND_LENGTH} characters`);
  }

  if (input.config.discordPmChannelId) {
    if (input.channelId !== input.config.discordPmChannelId) {
      stops.push("command was not received in the configured Discord PM channel");
    }
  } else {
    warnings.push("DISCORD_PM_CHANNEL_ID is not configured; channel guard is advisory only");
  }

  const classification = classifyPmCommand(command);

  if (classification === "STOP") {
    stops.push("command asks for secret/token/password/API key/raw secret handling");
  }

  if (classification === "CRITICAL") {
    warnings.push("critical command requires explicit user approval before any execution");
  }

  return {
    classification,
    stops,
    warnings,
    summary: summarizeCommand(command)
  };
}

function classifyPmCommand(command: string): PmClassification {
  const normalized = command.toLowerCase();

  if (/(secret|token|password|api key|raw secret|\.env|비밀번호|토큰|시크릿)/i.test(command)) {
    return "STOP";
  }

  if (/(force push|reset --hard|deploy|배포|삭제|권한|보안 정책|merge|병합|push)/i.test(command)) {
    return "CRITICAL";
  }

  if (/(구현|수정|fix|build|test|ci|runtime|gateway|코드|테스트|실패)/i.test(command)) {
    return "HIGH";
  }

  if (/(문서|docs|체크리스트|하네스|정책|등록|갱신|정리|pr|커밋)/i.test(command)) {
    return "MEDIUM";
  }

  if (/(요약|상태|알려줘|초안|summary|status|draft)/i.test(normalized)) {
    return "LOW";
  }

  return "MEDIUM";
}

function summarizeCommand(command: string): string {
  const trimmed = command.trim().replace(/\s+/g, " ");

  if (!trimmed) {
    return "empty command";
  }

  if (trimmed.length <= 140) {
    return trimmed;
  }

  return `${trimmed.slice(0, 137)}...`;
}

function formatNextStep(result: PmPreflightResult): string {
  if (result.stops.length > 0) {
    return "Do not execute. Report STOP with the listed guard reasons.";
  }

  if (result.classification === "LOW") {
    return "Handle with Local LLM or rule-based response; Codex handoff is optional.";
  }

  if (result.classification === "MEDIUM") {
    return "Prepare minimal context, allowed files, forbidden actions, and validation candidates before Codex handoff.";
  }

  if (result.classification === "HIGH") {
    return "Require Codex execution with scope guard, validation, and review path.";
  }

  return "Require explicit user approval before any execution.";
}

function formatList(label: string, items: string[]): string[] {
  if (items.length === 0) {
    return [`${label}: none`];
  }

  return [`${label}:`, ...items.map((item) => `- ${item}`)];
}
