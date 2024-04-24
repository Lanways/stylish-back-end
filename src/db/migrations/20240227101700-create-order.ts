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
        values: ['Pending', 'Processing', 'Delivered', 'Cancelled']
      },
      provider: {
        allowNull: false,
        type: DataTypes.STRING
      },
      aes_encrypt: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      sha_encrypt: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      email: {
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
    await queryInterface.dropTable('Orders')
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS public."enum_Orders_status"`)
  }
}