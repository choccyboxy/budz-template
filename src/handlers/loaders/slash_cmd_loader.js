const { glob } = require("glob");
const path = require("path");

module.exports = async function (client) {
  const files = (await glob("src/commands/slash_cmds/**/*.js")).map(
    (filePath) => path.resolve(filePath)
  );

  files.map(async (file) => {
    const slash_command = await require(file);

    if (!slash_command.data?.name) {
      return (
        delete require.cache[require.resolve(file)] &&
        console.log(file.split("/").pop() + " does not have a name...")
      );
    }

    if (file.split("/").pop()?.split(".")[2]) {
      return client.commands.slash.set(slash_command.data.name, slash_command);
    }

    client.commands.slash.set(slash_command.data.name, slash_command);

    return delete require.cache[require.resolve(file)];
  });
};
