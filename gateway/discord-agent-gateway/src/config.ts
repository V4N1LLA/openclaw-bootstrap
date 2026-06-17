import "dotenv/config";

export type GatewayConfig = {
  discordToken?: string;
  discordClientId?: string;
  discordGuildId?: string;
  discordPmChannelId?: string;
  discordAgentDevLocalChannelId?: string;
  discordAgentDocsLocalChannelId?: string;
  discordAgentReviewChannelId?: string;
  discordAgentOpsChannelId?: string;
  discordAgentLogChannelId?: string;
  ollamaBaseUrl: string;
  ollamaDefaultModel: string;
  agentWorkbenchBaseUrl: string;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): GatewayConfig {
  return {
    discordToken: env.DISCORD_BOT_TOKEN ?? env.DISCORD_TOKEN,
    discordClientId: env.DISCORD_CLIENT_ID,
    discordGuildId: env.DISCORD_GUILD_ID,
    discordPmChannelId: env.DISCORD_PM_CHANNEL_ID,
    discordAgentDevLocalChannelId: env.DISCORD_AGENT_DEV_LOCAL_CHANNEL_ID,
    discordAgentDocsLocalChannelId: env.DISCORD_AGENT_DOCS_LOCAL_CHANNEL_ID,
    discordAgentReviewChannelId: env.DISCORD_AGENT_REVIEW_CHANNEL_ID,
    discordAgentOpsChannelId: env.DISCORD_AGENT_OPS_CHANNEL_ID,
    discordAgentLogChannelId: env.DISCORD_AGENT_LOG_CHANNEL_ID,
    ollamaBaseUrl: env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
    ollamaDefaultModel:
      env.OLLAMA_DEFAULT_MODEL ?? env.OLLAMA_MODEL ?? "qwen2.5-coder:3b",
    agentWorkbenchBaseUrl: env.AGENT_WORKBENCH_BASE_URL ?? "http://127.0.0.1:3000"
  };
}

export function assertDiscordRuntimeConfig(config: GatewayConfig): void {
  const missing = [
    ["DISCORD_BOT_TOKEN", config.discordToken],
    ["DISCORD_CLIENT_ID", config.discordClientId]
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    const names = missing.map(([name]) => name).join(", ");
    throw new Error(`Discord runtime config is missing: ${names}`);
  }
}

export function assertDiscordCommandRegistrationConfig(config: GatewayConfig): void {
  const missing = [
    ["DISCORD_BOT_TOKEN", config.discordToken],
    ["DISCORD_CLIENT_ID", config.discordClientId],
    ["DISCORD_GUILD_ID", config.discordGuildId]
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    const names = missing.map(([name]) => name).join(", ");
    throw new Error(`Discord command registration config is missing: ${names}`);
  }
}
