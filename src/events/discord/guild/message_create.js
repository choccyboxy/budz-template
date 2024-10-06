const { Events } = require("discord.js");
const text_cmd_handler = require("../../../handlers/text_cmd_handler");

module.exports = {
  name: Events.MessageCreate,

  run: async (client, message) => {
    text_cmd_handler(client, message);
  },
};
