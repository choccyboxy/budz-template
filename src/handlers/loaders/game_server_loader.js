const { glob } = require("glob");
const path = require("path");

module.exports = async function (client) {
  const files = (await glob("src/server/gameservers/**/*.js")).map((filePath) =>
    path.resolve(filePath)
  );

  files.map(async (file) => {
    const game_server = await require(file);

    if (
      !game_server.identifier &&
      !game_server.region &&
      !game_server.serverId
    ) {
      return (
        delete require.cache[require.resolve(file)] &&
        console.log(file.split("/").pop() + " is missing required fields...")
      );
    }

    if (!["US", "EU"].includes(game_server.region)) {
      return (
        delete require.cache[require.resolve(file)] &&
        console.log(file.split("/").pop() + " has an invalid region...")
      );
    }

    await client.rce_client.addServer(game_server);

    return delete require.cache[require.resolve(file)];
  });
};
