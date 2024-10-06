const { glob } = require("glob");
const path = require("path");

module.exports = async function discord_event_handler(client) {
  const files = (await glob("src/events/discord/**/*.js")).map((filePath) =>
    path.resolve(filePath)
  );

  files.map(async (file) => {
    const event = await require(file);

    if (!event.name)
      return (
        delete require.cache[require.resolve(file)] &&
        console.log(file.split("/").pop() + " does not have a name...")
      );

    const run = (...args) => event.run(client, ...args);

    if (event.once) {
      //@ts-ignore
      client.once(event.name, run);
    } else {
      //@ts-ignore
      client.on(event.name, run);
    }

    return delete require.cache[require.resolve(file)];
  });
};
