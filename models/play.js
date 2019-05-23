'use strict';
module.exports = (sequelize, DataTypes) => {
  const Play = sequelize.define('Play', {
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    totalScore: DataTypes.INTEGER,
    status: {
      type : DataTypes.STRING,
      defaultValue : 'active'
    }
  }, {});
  Play.associate = function(models) {
    // associations can be defined here
    Play.belongsTo(models.Game)
    Play.belongsTo(models.User)
  };
  return Play;
};