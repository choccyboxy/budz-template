const { QuickChat } = require("rce.js");
const QuickChatCommandBuilder = require("../../structures/QuickChatCommandBuilder");
const BotClient = require("../../bot");
const { CommandCategory, RustRanks } = require("../../constants");

module.exports = {
  data: new QuickChatCommandBuilder()
    .setName("test")
    .setTrigger(QuickChat.RESPONSES_Hello)
    .setDescription("Test quick chat command - DEV ONLY")
    .setCategory(CommandCategory.DEBUG)
    .setDevOnly(true)
    .setEnabledServers(["example"])
    .setAllowedRanks([RustRanks.OWNER]),

  /**
   * @param {BotClient} client
   * @param {string} ign
   * @param {import("rce.js/dist/types").RustServer} server
   */
  run: async (client, ign, server) => {
    const { rce_client } = client;
    rce_client.sendCommand(server.identifier, `say Hello, ${ign}!`);
  },
};
