'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    jsFile: DataTypes.STRING,
    cssFile: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
    // associations can be defined here
  };
  return Board;
};