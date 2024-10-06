const { PermissionFlagsBits } = require("discord.js");
const TextCommandBuilder = require("../../structures/TextCommandBuilder");
const { Emoji } = require("../../constants");
const { Guilds } = require("../../server/db/models");

module.exports = {
  data: new TextCommandBuilder()
    .setName("prefix")
    .setAliases(["p"])
    .setDescription("Set the bot's prefix for this server")
    .setCategory("Settings")
    .setDefaultMemberPermissions([PermissionFlagsBits.Administrator])
    .setBotPermissions([PermissionFlagsBits.SendMessages]),

  /**
   * @param {BotClient} client
   * @param {Message} message
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    const prefix = args[0];
    if (!prefix) {
      message.reply(
        `> ${Emoji.CROSS} \`${message.author.username}\` please provide a prefix.`
      );

      return;
    }

    Guilds.update(
      { prefix: prefix },
      { where: { guild_id: message.guild?.id } }
    )
      .then(() => {
        message.reply(
          `> ${Emoji.CHECK} \`${message.author.username}\` successfully updated the prefix to \`${prefix}\``
        );
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
};
