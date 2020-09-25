const randomName = require('node-random-name');

module.exports = function seedUsers(n) {
  const users = Array(n).fill().map((_, i) => {
    return {
      id: i+1,
      first_name: randomName({ random: Math.random, first: true }),
      last_name: randomName({ random: Math.random, first: true }),
    };
  });

  return users;
}