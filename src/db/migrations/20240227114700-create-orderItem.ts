import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      sku_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('OrderItems')
  }
}