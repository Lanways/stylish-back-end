import { QueryInterface, DataTypes } from "sequelize"

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Skus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      sku_code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      inventory_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      color: {
        allowNull: false,
        type: DataTypes.STRING
      },
      size: {
        allowNull: false,
        type: DataTypes.STRING
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Skus')
  }
}