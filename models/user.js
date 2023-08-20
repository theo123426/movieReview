'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedBy: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user =>{
    user.password = hashPassword(user.password)
    console.log(user.password)
    console.log("beforeCreate")
    user.createdBy = 'System';
    user.set("updatedAt",null)
  })
  User.beforeUpdate(user =>{
    if (user.changed()) {
      user.updatedBy = user.username;
      user.updatedAt = new Date()
    }
  })
  User.beforeDestroy(user =>{
    user.deletedAt = new Date();
    return user.save();
  })
  return User;
};