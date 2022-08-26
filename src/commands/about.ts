import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
  GuildMemberRoleManager,
  SelectMenuBuilder,
  SelectMenuInteraction,
} from "discord.js";
import { EmbedBuilder } from "discord.js";
import { configHandler } from "../listeners/configHandler";

const sendAboutMessage = async (interaction: ChatInputCommandInteraction) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle("About F.R.E.T.")
    .setDescription(
      "F.R.E.T. is a multipurpose ~~Javascript~~ Typescript Discord bot whose purpose is to encourage discussion in a discord server by facilitating an organized environment and by managing databases to store and retrieve information."
    );

  const row: any = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("GitHub")
      .setStyle(ButtonStyle.Link)
      .setURL("https://github.com/robchendev/FRET2")
  );

  await interaction.reply({
    embeds: [exampleEmbed],
    ephemeral: true,
    components: [row],
  });
};

export const aboutCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction
) => {
  await sendAboutMessage(interaction);
};
