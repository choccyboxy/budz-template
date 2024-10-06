const fs = require("fs");

module.exports = function generate_log_file() {
  const date = new Date();
  const date_string = `${date.getUTCMonth()}-${date.getDate()}-${date.getUTCFullYear()}`;
  const time_string = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
  const file_name = `${date_string}[${time_string}].log`;

  fs.writeFileSync(`./src/server/logs/${file_name}`, "");
  return `./src/server/logs/${file_name}`;
};
