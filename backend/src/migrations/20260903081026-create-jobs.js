'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

        await queryInterface.createTable('jobs', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
         autoIncrement: true 
        },
      title: { 
        type: Sequelize.STRING, 
        allowNull: false
       },
      description: { 
        type: Sequelize.TEXT, 
        allowNull: false 
      },
      category: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      experienceLevel: { 
        type: Sequelize.ENUM('entry', 'mid', 'senior'), 
        allowNull: false 
      },
      location: {
         type: Sequelize.STRING, 
         allowNull: false 
        },
      salaryRange: { 
        type: Sequelize.STRING,
         allowNull: true
         },
      jobStatus: {
         type: Sequelize.ENUM('active', 'closed'),
          allowNull: false, 
          defaultValue: 'active'
         },
      createdAt: {
         type: Sequelize.DATE,
          allowNull: false 
        },
      updatedAt: { 
        type: Sequelize.DATE,
         allowNull: false
         },
    });

  },

  async down (queryInterface) {
        await queryInterface.dropTable('jobs');

  }
};
