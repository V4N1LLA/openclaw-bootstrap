import { REST, Routes } from "discord.js";
import {
  assertDiscordCommandRegistrationConfig,
  loadConfig
} from "./config.js";
import { awCommand } from "./discord/commands.js";

const config = loadConfig();
assertDiscordCommandRegistrationConfig(config);

const discordToken = config.discordToken as string;
const discordClientId = config.discordClientId as string;
const discordGuildId = config.discordGuildId as string;

const rest = new REST({ version: "10" }).setToken(discordToken);
const commands = [awCommand.toJSON()];

await rest.put(
  Routes.applicationGuildCommands(
    discordClientId,
    discordGuildId
  ),
  { body: commands }
);

console.log(
  `Registered ${commands.length} Discord slash command(s) for guild ${discordGuildId}.`
);
