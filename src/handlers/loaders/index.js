const game_server_loader = require("./game_server_loader");
const quick_chat_cmd_loader = require("./quick_chat_cmd_loader");
const slash_cmd_loader = require("./slash_cmd_loader");
const text_command_loader = require("./text_cmd_loader");

module.exports = function loader(client) {
  text_command_loader(client);
  slash_cmd_loader(client);
  quick_chat_cmd_loader(client);
  game_server_loader(client);
};
