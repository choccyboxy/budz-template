const { Collection } = require("discord.js");
const get_player_rank = require("../utils/get_player_rank");

module.exports = async function quick_chat_command_handler(client, payload) {
  const { message, ign, server } = payload;
  const { rce_client } = client;

  const command = rce_client.quick_chat_commands.get(message);

  if (!command) return;

  if (!command.data.enabled_servers.includes(server.identifier)) return;

  if (command.data.dev_only && !client.config.dev_igns.includes(ign)) return;

  const rank = await get_player_rank(client, payload);

  if (!command.data.allowed_ranks.includes(rank)) return;

  const { cooldowns } = rce_client;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount =
    (command.cooldown || client.config.default_quick_chat_cooldown) * 1000;

  if (
    timestamps.has(ign) &&
    now < (timestamps.get(ign) || 0) + cooldownAmount
  ) {
    return;
  }

  timestamps.set(ign, now);
  setTimeout(() => {
    timestamps.delete(ign);
  }, cooldownAmount);

  try {
    await command.run(client, ign, server);
  } catch (ex) {
    console.log(
      `Failed to execute quick chat command ${command.name}\n\n` + ex
    );
  }
};
