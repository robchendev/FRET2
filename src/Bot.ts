import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { secrets } from "./config/secrets";
import { main } from "./listeners/register-commands";
import { Routes } from "discord.js";
import { config } from "src/config/config";
import { commands } from "./commands";
import { onInteraction } from "./listeners/interaction-create";
import { configHandler } from "./listeners/configHandler";

const conf = new configHandler();
conf.init();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => console.log(`${client.user?.username} is online`));

client.on("interactionCreate", (interaction: Interaction) => {
  onInteraction(client, interaction);
});

main(client);
