'use strict';

const seedrandom = require('seedrandom');
const seedUsers = require('./utils/seed-users');
const seedFriendshipGraph = require('./utils/seed-friendship-graph');

const seed = parseInt(process.env.SEED, 10) || 100;
const userNum = parseInt(process.env.SEED_USER_NUM, 10) || 1000;
const averageFriendships = parseInt(process.env.SEED_AVG_FRIENDSHIPS, 10) || 20;

seedrandom(seed, { global: true });

function genSeedValues() {
  const users = seedUsers(userNum);
  const friendships = seedFriendshipGraph(users, averageFriendships);
  return {
    users,
    friendships,
  };
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { users, friendships } = genSeedValues();
    await queryInterface.bulkInsert('sm_users', users);
    await queryInterface.bulkInsert('sm_friendships', friendships);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sm_users', null);
    await queryInterface.bulkDelete('sm_friendships', null);
  }
};
