'use strict';
const {
  Model
} = require('sequelize');

const {hashPass} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        },
        notEmpty: true,
      },
      unique: true
    },
    password: {
      type : DataTypes.STRING,
      validate: {
        len: [6,30]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user, opt) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};