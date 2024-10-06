module.exports = function format_command_data(commands) {
  const data = [];

  commands.forEach((command) => {
    data.push({
      name: command.data.name,
      description: command.data.description,
      options: command.data.options,
      default_member_permissions:
        command.data.default_member_permissions?.toString(),
      dm_permission: command.data.dm_permission,
    });
  });

  return data;
};
