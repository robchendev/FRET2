import { Client, GatewayIntentBits } from "discord.js";
import { secrets } from "./config/secrets";
import { main } from "./listeners/register-commands";
import { Routes } from "discord.js";
import { config } from "src/config/config";
import { commands } from "./commands";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => console.log(`${client.user?.username} is online`));

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply("User info.");
  }
});

main(client);
