const { RCEEvent } = require("rce.js");
const quick_chat_cmd_handler = require("../../handlers/quick_chat_cmd_handler");

module.exports = {
  name: RCEEvent.QuickChat,

  run: async (client, payload) => {
    quick_chat_cmd_handler(client, payload);
  },
};
