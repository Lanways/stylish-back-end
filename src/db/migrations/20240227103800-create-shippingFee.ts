import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('ShippingFees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      payment_method: {
        allowNull: false,
        type: DataTypes.STRING
      },
      shipping_method: {
        allowNull: false,
        type: DataTypes.STRING
      },
      fee: {
        allowNull: false,
        type: DataTypes.DECIMAL
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
    await queryInterface.dropTable('ShippingFees')
  }
}