import { secrets } from "../config/secrets";
import { Client, Routes } from "discord.js";
import { commands } from "../commands";
import { REST } from "discord.js";

const rest = new REST({ version: "10" }).setToken(secrets.token);

export const main = async (client: Client) => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(secrets.clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");

    client.login(secrets.token);
  } catch (error) {
    console.error(error);
  }
};
