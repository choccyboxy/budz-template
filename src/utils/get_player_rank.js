module.exports = async function GetPlayerRank(client, payload) {
  const { server, ign } = payload;
  const { rce_client } = client;

  const rank_data = await rce_client.sendCommand(
    server.identifier,
    `global.getauthlevel "${ign}"`,
    true
  );

  if (!rank_data) {
    client.discord_logger(
      "Error",
      client.config.log_channel,
      `Failed to get rank for ${ign}...`
    );
    console.log(`Failed to get rank for ${ign}...`);
    return "unknown";
  }

  const rank = rank_data.split(" ")[2];

  return rank;
}
