import { SlashCommandBuilder } from "discord.js";

export const awCommand = new SlashCommandBuilder()
  .setName("aw")
  .setDescription("Agent Workbench local gateway")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("ask-local")
      .setDescription("Ask the local Ollama model")
      .addStringOption((option) =>
        option
          .setName("prompt")
          .setDescription("Question for the local model")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("model")
          .setDescription("Optional Ollama model override")
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("status")
      .setDescription("Check Gateway, Ollama, and Agent Workbench status")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("pm")
      .setDescription("Intake a Discord PM command without executing it")
      .addStringOption((option) =>
        option
          .setName("command")
          .setDescription("Command text from #agent-pm")
          .setRequired(true)
      )
  );
