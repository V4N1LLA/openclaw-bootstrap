import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";
import type { GatewayConfig } from "../config.js";
import { getAgentWorkbenchStatus } from "../services/agentWorkbench.js";
import { askOllama, getOllamaStatus } from "../services/ollama.js";
import { sendChunkedReply } from "./messages.js";
import { createPmIntakeResponse, createPmPreflightResult } from "./pmIntake.js";
import {
  createDiscordChannelSender,
  dispatchPmWorkCard,
  formatPmDispatchSummary
} from "./pmDispatch.js";

export async function handleAwCommand(
  interaction: ChatInputCommandInteraction,
  config: GatewayConfig
): Promise<void> {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === "ask-local") {
    const prompt = interaction.options.getString("prompt", true);
    const model = interaction.options.getString("model") ?? undefined;
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const answer = await askOllama(config, prompt, model);
    await sendChunkedReply(interaction, answer);
    return;
  }

  if (subcommand === "status") {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const [ollamaStatus, agentWorkbenchStatus] = await Promise.all([
      getOllamaStatus(config),
      getAgentWorkbenchStatus(config)
    ]);

    const statusMessage = [
      "Agent Gateway status",
      formatStatusLine("Gateway", true, "Discord interaction handler is running"),
      formatStatusLine(
        "Ollama",
        ollamaStatus.ok,
        ollamaStatus.detail ?? "OpenAI-compatible models endpoint check"
      ),
      formatStatusLine(
        "Ollama default model",
        ollamaStatus.defaultModelAvailable,
        `configured=${config.ollamaDefaultModel}`
      ),
      formatStatusLine(
        "Agent Workbench",
        agentWorkbenchStatus.ok,
        agentWorkbenchStatus.detail ?? "local API health check"
      ),
      "",
      `Ollama models: ${ollamaStatus.models.length > 0 ? ollamaStatus.models.join(", ") : "none detected"}`
    ].join("\n");

    await sendChunkedReply(interaction, statusMessage);
    return;
  }

  if (subcommand === "pm") {
    const command = interaction.options.getString("command", true);
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const preflight = createPmPreflightResult({
      channelId: interaction.channelId,
      command,
      config
    });
    const dispatchPlan = await dispatchPmWorkCard(
      command,
      preflight,
      config,
      createDiscordChannelSender(interaction.client)
    );
    const intakeMessage = createPmIntakeResponse({
      channelId: interaction.channelId,
      command,
      config
    });
    await sendChunkedReply(
      interaction,
      [intakeMessage, "", formatPmDispatchSummary(dispatchPlan)].join("\n")
    );
  }
}

function formatStatusLine(name: string, ok: boolean, detail: string): string {
  return `${ok ? "OK" : "WARN"} ${name}: ${detail}`;
}
