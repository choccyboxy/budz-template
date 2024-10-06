const { Collection } = require("discord.js");

module.exports = async function slash_command_handler(client, interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.slash.get(interaction.commandName);

  if (!command) {
    client.commands.slash.delete(interaction.commandName);

    interaction.reply({
      content: "This command does not exist",
      ephemeral: true,
    });

    return;
  }

  const { cooldowns } = client;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount =
    (command.cooldown || client.config.default_cooldown) * 1000;

  if (
    timestamps.has(interaction.user.id) &&
    now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
  ) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        `${Emoji.CROSS} Please wait another \`${(
          ((timestamps.get(interaction.user.id) || 0) + cooldownAmount - now) /
          1000
        ).toFixed(1)}\`s to run this command`
      );

    interaction.reply({ embeds: [embed], ephemeral: true }).then((response) => {
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

  timestamps.set(interaction.user.id, now);
  setTimeout(() => {
    timestamps.delete(interaction.user.id);
  }, cooldownAmount);

  try {
    const sub_command_group = interaction.options.getSubcommandGroup(false);
    const sub_command = `${interaction.commandName}${
      sub_command_group ? `.${sub_command_group}` : ""
    }.${interaction.options.getSubcommand(false) || ""}`;

    return (
      client.commands.sub.get(sub_command)?.run(client, interaction) ||
      command.run(client, interaction)
    );
  } catch (error) {
    interaction.reply({
      content: "Error while running command.",
      ephemeral: true,
    });
    console.log(error);
  }
};
