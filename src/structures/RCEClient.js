const { Collection } = require("discord.js");
const { RCEManager } = require("rce.js");

module.exports = class RCEClient extends RCEManager {
  quick_chat_commands;
  cooldowns;

  /**
   *
   * @param {import("rce.js/dist/types").AuthOptions} auth
   * @param {import("rce.js/dist/types").LoggerOptions} logger
   */
  constructor(auth, logger) {
    super(auth, logger);

    this.quick_chat_commands = new Collection();
    this.cooldowns = new Collection();
  }
};
