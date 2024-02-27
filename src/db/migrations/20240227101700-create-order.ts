import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      shipping_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      shipping_fee_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      total_price: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['Pending', 'Shipped', 'Delivered', 'Cancelled']
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
    await queryInterface.dropTable('Orders')
  }
}