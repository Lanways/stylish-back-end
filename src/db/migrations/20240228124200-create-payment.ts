import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Payments', {
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
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      provider: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
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
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Payments')
  }
}