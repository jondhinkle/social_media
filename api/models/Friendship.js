const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const User = require('./User.js');

const tableName = 'sm_friendships';

const hooks = {
  beforeCreate(friendship) {
    const { user1, user2 } = friendship;
    if (user1 > user2) {
      // swap values
      [friendship.user1, friendship.user2] = [user2, user1];
    }
  },
};

const indexes = [
  { fields: ['user_id_1'] },
  { fields: ['user_id_2'] },
  { fields: ['user_id_1', 'user_id_2'], unique: true },
];

const Friendship = sequelize.define('Friendship', {
  userId1: {
    field: 'user_id_1',
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'sm_users',
      key: 'id',
    },
  },
  userId2: {
    field: 'user_id_2',
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'sm_users',
      key: 'id',
    },
    validate: {
      idIsNotDuplicate: (value) => {
        if (value === this.user1) {
          throw new Error('user_id_1 field must not equal user_id_2 field');
        }
      },
    },
  },
}, { sequelize, hooks, tableName, indexes, timestamps: false });

const getForUserIdQuery = `
  SELECT sm_users.* 
  FROM (
    SELECT user_id_1 AS id FROM sm_friendships WHERE user_id_2 = :id
    UNION ALL
    SELECT user_id_2 AS id FROM sm_friendships WHERE user_id_1 = :id
  ) AS friendships 
  LEFT OUTER JOIN sm_users 
    ON friendships.id = sm_users.id;
`;

Friendship.getForUserId = async function getForUserId(id) {
  return sequelize.query(
    getForUserIdQuery,
    {
      replacements: { id },
      model: User,
      mapToModel: true,
      type: Sequelize.QueryTypes.SELECT,
    },
  );
};

// eslint-disable-next-line
Friendship.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Friendship;
