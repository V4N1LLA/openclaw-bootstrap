import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";

const DISCORD_MESSAGE_LIMIT = 2000;
const SAFE_MESSAGE_LIMIT = 1900;

export function splitDiscordMessage(content: string): string[] {
  if (content.length <= DISCORD_MESSAGE_LIMIT) {
    return [content];
  }

  const chunks: string[] = [];
  let remaining = content;

  while (remaining.length > SAFE_MESSAGE_LIMIT) {
    const breakAt = findBreakPoint(remaining);
    chunks.push(remaining.slice(0, breakAt).trimEnd());
    remaining = remaining.slice(breakAt).trimStart();
  }

  if (remaining.length > 0) {
    chunks.push(remaining);
  }

  return chunks;
}

export async function sendChunkedReply(
  interaction: ChatInputCommandInteraction,
  content: string
): Promise<void> {
  const chunks = splitDiscordMessage(content);
  const [firstChunk, ...restChunks] = chunks;

  await interaction.editReply(firstChunk ?? "");

  for (const chunk of restChunks) {
    await interaction.followUp({ content: chunk, flags: MessageFlags.Ephemeral });
  }
}

function findBreakPoint(content: string): number {
  const searchWindow = content.slice(0, SAFE_MESSAGE_LIMIT);
  const paragraphBreak = searchWindow.lastIndexOf("\n\n");

  if (paragraphBreak > SAFE_MESSAGE_LIMIT / 2) {
    return paragraphBreak;
  }

  const lineBreak = searchWindow.lastIndexOf("\n");

  if (lineBreak > SAFE_MESSAGE_LIMIT / 2) {
    return lineBreak;
  }

  const spaceBreak = searchWindow.lastIndexOf(" ");

  if (spaceBreak > SAFE_MESSAGE_LIMIT / 2) {
    return spaceBreak;
  }

  return SAFE_MESSAGE_LIMIT;
}
