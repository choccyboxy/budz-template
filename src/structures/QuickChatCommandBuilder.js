module.exports = class QuickChatCommandBuilder {
  name;
  trigger;
  description;
  category;
  allowed_ranks;
  enabled_servers;
  cooldown;
  dev_only;

  constructor() {
    this.name = "";
    this.trigger = "";
    this.description = "";
    this.category = "";
    this.allowed_ranks = [];
    this.enabled_servers = [];
    this.cooldown = 0;
    this.dev_only = false;
  }

  /**
   * @param {string} name
   */
  setName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {string} trigger
   */
  setTrigger(trigger) {
    this.trigger = trigger;
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
   * @param {string[]} ranks
   */
  setAllowedRanks(ranks) {
    this.allowed_ranks = ranks;
    return this;
  }

  /**
   * @param {string[]} servers
   */
  setEnabledServers(servers) {
    this.enabled_servers = servers;
    return this;
  }

  /**
   * @param {number} cooldown
   */
  setCooldown(cooldown) {
    this.cooldown = cooldown;
    return this;
  }

  /**
   * @param {boolean} value
   */
  setDevOnly(value) {
    this.dev_only = value;
    return this;
  }
};
