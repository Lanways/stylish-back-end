'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size_options: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      additional_image: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};