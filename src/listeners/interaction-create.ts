import { Client, Interaction } from "discord.js";
import { helpCommand } from "../commands/help";

export const onInteraction = async (
  client: Client,
  interaction: Interaction
) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;
    switch (commandName) {
      case "commands":
        await helpCommand(client, interaction, 1);
        break;
      case "server":
        await interaction.reply("Server Info");
        break;
      case "user":
        await interaction.reply("User Info");
        break;
    }
  } else if (interaction.isSelectMenu()) {
    if (interaction.customId === "select") {
      helpCommand(client, interaction, 2);
    }
  }
};
