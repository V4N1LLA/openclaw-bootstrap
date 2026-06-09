import { Events, MessageFlags } from "discord.js";
import { assertDiscordRuntimeConfig, loadConfig } from "./config.js";
import { createDiscordClient } from "./discord/client.js";
import { handleAwCommand } from "./discord/handlers.js";

const config = loadConfig();
assertDiscordRuntimeConfig(config);

const client = createDiscordClient();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Discord Agent Gateway ready as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName !== "aw") {
    return;
  }

  try {
    await handleAwCommand(interaction, config);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown gateway error";
    const reply = `Gateway request failed: ${message}`;

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(reply);
      return;
    }

    await interaction.reply({ content: reply, flags: MessageFlags.Ephemeral });
  }
});

await client.login(config.discordToken);
