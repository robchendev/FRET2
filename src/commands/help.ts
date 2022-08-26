import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  Client,
  GuildMemberRoleManager,
  SelectMenuBuilder,
  SelectMenuInteraction,
} from "discord.js";
import { EmbedBuilder } from "discord.js";
import { configHandler } from "../listeners/configHandler";

const conf = new configHandler();
conf.init();

const sendHelpSelectMenu = async (interaction: ChatInputCommandInteraction) => {
  const options = [
    { label: "General", value: "general" },
    { label: "Help Forum", value: "help_forum" },
    { label: "Weekly Submissions", value: "weekly_submissions" },
  ];
  const modOptions = [...options, { label: "Moderator", value: "moderator" }];
  const isMod = (interaction.member?.roles as GuildMemberRoleManager).cache.has(
    conf.flux!.moderatorRoleId
  );
  let selectHelp: any = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder("Select a command category")
      .addOptions(...(isMod ? modOptions : options))
  );
  await interaction.reply({
    components: [selectHelp],
    ephemeral: true,
  });
};
const sendUserSelectedMenu = async (interaction: SelectMenuInteraction) => {
  const embed = new EmbedBuilder().setColor(0x2f3136); // refactor to config
  switch (interaction.values[0]) {
    case "general":
      generalCommands(embed);
      break;
    case "help_forum":
      helpForumCommands(embed);
      break;
    case "weekly_submissions":
      weeklySubmissionCommands(embed);
      break;
    case "moderator":
      moderatorCommands(embed);
      break;
  }
  await interaction.update({
    embeds: [embed],
    components: [],
  });
};

const generalCommands = (embed: EmbedBuilder) => {
  embed.setTitle("General Commands").addFields(
    { name: "`/profile`", value: "View your server profile" }, // includes thanks, weekly info
    // 1. /gdex makes the bot query all page IDs and titles from gdex and updates global memory of the current gdex info
    // 2. the bot should already query all the current info on boot and store it in global memory
    // 3. the bot uses auto-complete to perform the search with each search result showing up like:
    //    [4] Wrist Thump
    // 4. user selects the one they want, and an embed with the title, tab, and video is shown.
    {
      name: "`/gdex <search text>`",
      value: "COMING SOON - Search and display a Guitardex page summary",
    },
    { name: "`/about`", value: "Show info about this bot" }
  );
};

const helpForumCommands = (embed: EmbedBuilder) => {
  // Add bounty system
  embed.setTitle("Help Forum Commands").addFields(
    { name: "`/thanks @user`", value: "Awards points to user" },
    {
      name: "`/thanks @user1 @user2 @user3`",
      value: "Awards points to multiple users",
    },
    { name: "`/points`", value: "Shows how many points you have" },
    { name: "`/points @user`", value: "Shows how many points a user has" },
    { name: "`/rankup`", value: "Ranks up if you have enough points" },
    { name: "`/leaderboard`", value: "Shows the forum leaderboard" },
    {
      name: "`/leaderboard N`",
      value:
        "Shows up to N top users in the leaderboard (replace N with a number)",
    }
  );
};

const weeklySubmissionCommands = (embed: EmbedBuilder) => {
  embed
    .setTitle("Weekly Commands")
    .addFields(
      { name: "`/submit <link/file>`", value: "Submit weekly" },
      { name: "`/info`", value: "Show this week's deadline" }
    );
};

const moderatorCommands = (embed: EmbedBuilder) => {
  embed.setTitle("Moderator Commands").addFields(
    { name: "`/hfmod @user`", value: "Opens dialog to adjust user's points" },
    {
      name: "`/wsmod @user`",
      value: "Opens dialog to adjust user's weekly score",
    }
  );
};

export const helpCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction | SelectMenuInteraction,
  step: number
) => {
  // Idea: Create a logging service that logs all interactions in a channel
  switch (step) {
    case 1:
      sendHelpSelectMenu(interaction as ChatInputCommandInteraction);
      break;
    case 2:
      sendUserSelectedMenu(interaction as SelectMenuInteraction);
      break;
  }
};
