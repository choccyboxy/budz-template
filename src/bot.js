const { Client, Collection } = require("discord.js");
const { LogLevel } = require("rce.js");
const loader = require("./handlers/loaders");
const discord_event_handler = require("./handlers/discord_event_handler");
const rce_event_handler = require("./handlers/rce_event_handler");
const generate_log_file = require("./utils/generate_log_file");
const RCEClient = require("./structures/RCEClient");
require("dotenv").config();

module.exports = class BotClient extends Client {
  config;
  db;
  cooldowns;
  rce_client;
  commands;

  constructor() {
    super({
      intents: [
        "MessageContent",
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "DirectMessages",
        "GuildMembers",
      ],
      allowedMentions: { repliedUser: false },
    });

    this.config = require("../config.json");
    this.db = require("./server/db/database");
    this.cooldowns = new Collection();
    this.rce_client = null;
    this.commands = {
      text: new Collection(),
      slash: new Collection(),
      sub: new Collection(),
    };
  }

  async init() {
    await this.create_rce_client();

    loader(this);
    await discord_event_handler(this);
    await rce_event_handler(this);

    this.login(process.env.BOT_TOKEN);
  }

  /**
   * @param {string} log_type
   * @param {import("discord.js").GuildChannelResolvable} log_channel
   * @param {string} message
   */
  async discord_logger(log_type, log_channel, message) {
    let channel = this.client.channels.cache.get(log_channel);
    if (!channel) {
      channel = await this.client.channels
        .fetch(log_channel)
        .catch(() =>
          console.log(
            `[Discord Logger] Error: Channel not found: ${log_channel}`
          )
        );
    }
    if (!channel) return;

    channel.send(
      `\`[${log_type}]\`: ${message}\n-# <t:${new Date().toTimeString}:D>`
    );
  }

  async create_rce_client() {
    const rce_client = new RCEClient(
      {
        email: process.env.GPORTAL_EMAIL,
        password: process.env.GPORTAL_PASSWORD,
      },
      { logFile: generate_log_file(), logLevel: LogLevel.Info }
    );

    await rce_client.init();

    this.rce_client = rce_client;
  }
};
