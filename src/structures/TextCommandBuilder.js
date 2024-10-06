const { default_cooldown } = require("../../config.json");

module.exports = class TextCommandBuilder {
  name;
  aliases;
  description;
  category;
  default_member_permissions;
  bot_permissions;
  test_guild_only;
  dev_only;
  dm_permission;
  cooldown;

  constructor() {
    this.name = "";
    this.aliases = [];
    this.description = "";
    this.category = "";
    this.default_member_permissions = [];
    this.bot_permissions = [];
    this.test_guild_only = false;
    this.dev_only = false;
    this.dm_permission = false;
    this.cooldown = default_cooldown;
  }

  /**
   * @param {string} name
   */
  setName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {string[]} aliases
   */
  setAliases(aliases) {
    this.aliases = aliases;
    return this;
  }

  /**
   * @param {string} description
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  /**
   * @param {string} category
   */
  setCategory(category) {
    this.category = category;
    return this;
  }

  /**
   * @param {bigint[]} permissions
   */
  setDefaultMemberPermissions(permissions) {
    this.default_member_permissions = permissions;
    return this;
  }

  /**
   * @param {bigint[]} permissions
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
   * @param {boolean} value
   */
  setDevOnly(value) {
    this.dev_only = value;
    return this;
  }

  /**
   * @param {boolean} value
   */
  setDmPermission(value) {
    this.dm_permission = value;
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
