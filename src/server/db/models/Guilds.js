const { Model, DataTypes } = require("sequelize");
const { default_prefix } = require("../../../../config.json");
const db = require("../database");

class Guilds extends Model {
  static associate() {}
}

Guilds.init(
  {
    guild_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    prefix: {
      type: DataTypes.STRING,
      defaultValue: default_prefix,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    sequelize: db,
    modelName: "Guilds",
  }
);

module.exports = Guilds;
