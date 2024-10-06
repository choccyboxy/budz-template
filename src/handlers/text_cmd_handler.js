const { Message, Collection, MessageType } = require("discord.js");
const { Guilds } = require("../server/db/models");
const BotClient = require("../bot");
const { Emoji } = require("../constants");

/**
 * @param {BotClient} client
 * @param {Message} message
 */
module.exports = async function text_command_handler(client, message) {
  if (message.author.bot) return;
  if (message.poll) return;
  if (
    message.type !== MessageType.Default &&
    message.type !== MessageType.Reply
  )
    return;

  const guild = await Guilds.findOne({
    where: { guild_id: message.guild?.id },
  }).catch((ex) => {
    console.log(ex);
    return;
  });

  if (!guild) {
    await new Guilds({
      guild_id: message.guild?.id,
    })
      .save()
      .catch((ex) => {
        console.log(ex);
        return;
      });
  }

  const prefix = guild?.prefix || client.config.default_prefix;
  const data = message.content.slice(prefix.length).trim().split(" ");
  const commandName = data.shift()?.toLowerCase();

  if (message.content === `<@${client.user?.id}>`)
    return message.reply(`> ${Emoji.CHECK} My prefix is \`${prefix}\``);

  if (message.content.slice(0, prefix.length) != prefix) return;

  let command;

  //TODO: Find better way to go about getting the command data from the collection with alias support.
  client.commands.text.forEach((cmd) => {
    if (cmd.data.aliases?.includes(commandName)) {
      command = cmd;
      return;
    }

    if (cmd.data.name === commandName) {
      command = cmd;
      return;
    }
  });

  //@ts-ignore
  if (!command) return;

  if (command.data.default_member_permissions[0]) {
    for (const member_permission of command.data.default_member_permissions) {
      if (!message.member?.permissions.has(member_permission)) return;
    }
  }

  for (const bot_permission of command.data.bot_permissions) {
    if (!message.guild?.members.me?.permissions.has(bot_permission))
      return message.reply(
        `> ${Emoji.CROSS} I do not have the permissions required to run this command.`
      );
  }

  if (!command.data.dm_permission) {
    if (!message.guild) return;
  }

  if (command.data.dev_only) {
    if (!client.config.dev_ids.includes(message.author.id)) return;
  }

  const { cooldowns } = client;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = command.cooldown * 1000;

  if (
    timestamps.has(message.author.id) &&
    now < (timestamps.get(message.author.id) || 0) + cooldownAmount
  ) {
    message
      .reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `${Emoji.CROSS} Please wait another \`${(
                ((timestamps.get(message.author.id) || 0) +
                  cooldownAmount -
                  now) /
                1000
              ).toFixed(1)}\`s to run this command`
            ),
        ],
      })
      .then((response) => {
        setTimeout(
          () =>
            response.delete().catch((ex) => {
              console.log(ex);
            }),
          15000
        );
      });

    return;
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => {
    timestamps.delete(message.author.id);
  }, cooldownAmount);

  try {
    await command.run(client, message, data);
  } catch (ex) {
    message.reply({
      content: `> ${Emoji.CROSS} An unexpected error occurred while running the command.`,
    });
    console.log(
      `Error occurred while running command\n\nName: ${command.name}\nExecuted by: ${message.author.username}\nFull message: ${message.content}\n}` +
        ex
    );
  }
};
