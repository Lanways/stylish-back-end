import { QueryInterface, DataTypes } from "sequelize"

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Products', 'category_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Products', 'category_id')
  }
}