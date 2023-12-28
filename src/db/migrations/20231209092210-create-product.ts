'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: DataTypes.STRING
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING
      },
      size_options: {
        allowNull: false,
        type: DataTypes.STRING
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      additional_image: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Products');
  }
};