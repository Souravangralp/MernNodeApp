'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    hashpassword: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    uniqueId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};