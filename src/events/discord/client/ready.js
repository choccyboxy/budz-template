const { Events, REST, Routes } = require("discord.js");
const models = require("../../../server/db/models");
const BotClient = require("../../../bot");
const format_command_data = require("../../../utils/format_command_data");

module.exports = {
  name: Events.ClientReady,
  once: true,

  /**
   * @param {BotClient} client
   */
  run: async (client) => {
    console.log(`[BOT] ✅ Logged in as ${client.user.tag}`);

    const rest = new REST().setToken(client.token);

    const set_global_commands = await rest.put(
      Routes.applicationCommands(client.user.id),
      {
        body: format_command_data(
          client.commands.slash.filter(
            (command) => !command.data.test_guild_only
          )
        ),
      }
    );

    const set_local_commands = await rest.put(
      Routes.applicationGuildCommands(client.user.id, client.config.test_guild),
      {
        body: format_command_data(
          client.commands.slash.filter(
            (command) => command.data.test_guild_only
          )
        ),
      }
    );

    console.log(
      `[BOT] ✅ Registered ${set_global_commands.length} global slash commands`
    );
    console.log(
      `[BOT] ✅ Registered ${set_local_commands.length} test guild slash commands`
    );
    console.log(`[BOT] ✅ Loaded ${client.commands.text.size} text commands`);
    console.log(
      `[BOT] ✅ Loaded ${client.rce_client.quick_chat_commands.size} quick_chat commands`
    );

    Object.keys(models).forEach((ele) => {
      models[ele].associate(models);
    });

    try {
      await client.db.sync({ force: false });
      console.log("[BOT] ✅ Connecting to database...");
    } catch (err) {
      console.log(`Could not connect to DB. ${err}`);
    }
  },
};
