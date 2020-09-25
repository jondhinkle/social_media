const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(userCredentials) {
    userCredentials.password = bcryptService().password(userCredentials); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'sm_user_credentials';

const UserCredentials = sequelize.define('UserCredentials', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// eslint-disable-next-line
UserCredentials.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = UserCredentials;
