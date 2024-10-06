const { PermissionFlagsBits, Message } = require("discord.js");
const TextCommandBuilder = require("../../structures/TextCommandBuilder");
const BotClient = require("../../bot");
const { CommandCategory, Emoji } = require("../../constants");

module.exports = {
  data: new TextCommandBuilder()
    .setName("test")
    .setDescription("Test text command - DEV ONLY")
    .setCategory(CommandCategory.DEBUG)
    .setDevOnly(true)
    .setAliases(["t"])
    .setBotPermissions([PermissionFlagsBits.SendMessages]),

  /**
   * @param {BotClient} client
   * @param {Message} message
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    message.reply(
      `> ${Emoji.CHECK} \`${
        message.author.username
      }\` text command test successful!\n-# Uptime: ${
        (client.uptime || 0) / 1000
      }s`
    );
  },
};
