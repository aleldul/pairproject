'use strict';
module.exports = (sequelize, DataTypes) => {
  const Play = sequelize.define('Play', {
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    totalScore: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Play.associate = function(models) {
    // associations can be defined here
  };
  return Play;
};