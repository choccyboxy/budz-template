const {
  PermissionFlagsBits,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const CustomSlashCommandBuilder = require("../../structures/CustomSlashCommandBuilder");
const { Emoji, CommandCategory } = require("../../constants");

module.exports = {
  data: new CustomSlashCommandBuilder()
    .setName("test")
    .setDescription("Test command - DEV ONLY")
    .setCategory(CommandCategory.DEBUG)
    .setBotPermissions(PermissionFlagsBits.SendMessages)
    .setTestGuildOnly(true),

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    interaction.reply(
      `> ${Emoji.CHECK} \`${
        interaction.user.username
      }\` slash command test successful!\n-# Uptime: ${
        (client.uptime || 0) * 1000
      }s`
    );
  },
};
