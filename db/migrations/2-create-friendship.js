'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sm_friendships', {
      user_id_1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'sm_users',
          key: 'id',
        },
      },
      user_id_2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'sm_users',
          key: 'id',
        },
      },
    });

    await queryInterface.addIndex('sm_friendships', ['user_id_1']);

    await queryInterface.addIndex('sm_friendships', ['user_id_2']);

    await queryInterface.addIndex('sm_friendships', ['user_id_1', 'user_id_2'], {
      type: 'unique',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sm_friendships');
  }
};