'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('applications', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'users', key: 'id' }, onDelete: 'CASCADE'
      },
      jobId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'jobs', key: 'id' }, onDelete: 'CASCADE'
      },
      applyStatus: {
        type: Sequelize.ENUM('pending', 'reviewed', 'rejected', 'accepted'),
        allowNull: false, defaultValue: 'pending'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('applications');

  }
};
