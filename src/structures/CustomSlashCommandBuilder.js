const { SlashCommandBuilder } = require("discord.js");
const { default_cooldown } = require("../../config.json");

module.exports = class CustomSlashCommandBuilder extends SlashCommandBuilder {
  category;
  bot_permissions;
  test_guild_only;
  cooldown;

  constructor() {
    super();

    this.category = "";
    this.bot_permissions = [];
    this.test_guild_only = false;
    this.cooldown = default_cooldown;
  }

  /**
   * @param {string} category
   */
  setCategory(category) {
    this.category = category;
    return this;
  }

  /**
   * @param {bigint} permissions
   */
  setBotPermissions(permissions) {
    this.bot_permissions = permissions;
    return this;
  }

  /**
   * @param {boolean} value
   */
  setTestGuildOnly(value) {
    this.test_guild_only = value;
    return this;
  }

  /**
   * @param {number} cooldown
   */
  setCooldown(cooldown) {
    this.cooldown = cooldown;
    return this;
  }
};
