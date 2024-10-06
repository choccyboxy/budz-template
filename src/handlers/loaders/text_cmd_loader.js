const { glob } = require("glob");
const path = require("path");

module.exports = async function (client) {
  const files = (await glob("src/commands/text_cmds/**/*.js")).map((filePath) =>
    path.resolve(filePath)
  );

  files.map(async (file) => {
    const text_command = await require(file);

    if (!text_command.data?.name) {
      return (
        delete require.cache[require.resolve(file)] &&
        console.log(file.split("/").pop() + " does not have a name...")
      );
    }

    const names = [text_command.data.name];

    if (text_command.data.aliases) {
      text_command.data.aliases.forEach((alias) => names.push(alias));
    }

    client.commands.text.set(names, text_command);

    return delete require.cache[require.resolve(file)];
  });
};
