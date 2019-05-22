'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    level: DataTypes.STRING,
    time: DataTypes.INTEGER,
    BoardId: DataTypes.INTEGER
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.belongsTo(models.Board)
    Game.hasMany(models.Play)
  };
  return Game;
};