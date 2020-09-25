const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'sm_users';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    field: 'first_name',
    type: Sequelize.STRING,
  },
  lastName: {
    field: 'last_name',
    type: Sequelize.STRING,
  },
}, { sequelize, tableName, timestamps: false });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = User;
