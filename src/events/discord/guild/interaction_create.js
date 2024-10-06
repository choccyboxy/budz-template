const { Events } = require("discord.js");
const slash_cmd_handler = require("../../../handlers/slash_cmd_handler");

module.exports = {
  name: Events.InteractionCreate,

  run: async (client, interaction) => {
    slash_cmd_handler(client, interaction);
  },
};
