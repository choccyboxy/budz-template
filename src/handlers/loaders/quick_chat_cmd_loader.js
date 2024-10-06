const { glob } = require("glob");
const path = require("path");

module.exports = async function (client) {
  const files = (await glob("src/commands/quick_chat_cmds/**/*.js")).map(
    (filePath) => path.resolve(filePath)
  );

  files.map(async (file) => {
    const quick_chat_command = await require(file);

    if (!quick_chat_command.data?.name) {
      return (
        delete require.cache[require.resolve(file)] &&
        console.log(file.split("/").pop() + " does not have a name...")
      );
    }

    client.rce_client.quick_chat_commands.set(
      quick_chat_command.data.trigger,
      quick_chat_command
    );

    return delete require.cache[require.resolve(file)];
  });
};
