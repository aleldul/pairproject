'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 12],
          msg: "Username must between 8 and 12 character"
        },
        customIsUnique(value) {
          return User.findOne({
            where: {
              username: value
            }
          })
          .then(data => {
            if (data) {
              throw new Error(`Username used, please use other username`)
            }
          })
          .catch(err => {
            throw err
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 64],
          msg: "Password minimal 8 character"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Play)
  };
  return User;
};