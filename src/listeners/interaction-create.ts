import { Interaction } from "discord.js";

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "server":
      await interaction.reply("Server Info");
      break;
    case "user":
      await interaction.reply("User Info");
      break;
  }
};
