import "dotenv/config";

export type GatewayConfig = {
  discordToken?: string;
  discordClientId?: string;
  discordGuildId?: string;
  ollamaBaseUrl: string;
  ollamaDefaultModel: string;
  ollamaChatModel: string;
  ollamaCodeModel: string;
  agentWorkbenchBaseUrl: string;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): GatewayConfig {
  const ollamaChatModel =
    env.OLLAMA_CHAT_MODEL ??
    env.OLLAMA_DEFAULT_MODEL ??
    env.OLLAMA_MODEL ??
    "qwen2.5:3b";

  const ollamaCodeModel =
    env.OLLAMA_CODE_MODEL ??
    env.OLLAMA_DEFAULT_MODEL ??
    env.OLLAMA_MODEL ??
    "qwen2.5-coder:3b";

  return {
    discordToken: env.DISCORD_BOT_TOKEN ?? env.DISCORD_TOKEN,
    discordClientId: env.DISCORD_CLIENT_ID,
    discordGuildId: env.DISCORD_GUILD_ID,
    ollamaBaseUrl: env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
    ollamaDefaultModel: env.OLLAMA_DEFAULT_MODEL ?? ollamaChatModel,
    ollamaChatModel,
    ollamaCodeModel,
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
