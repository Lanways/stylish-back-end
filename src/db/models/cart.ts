import { Model, Optional, Sequelize, DataTypes } from "sequelize"
import db from './index'

interface CartAttributes {
  id: number
  userId: number
  createdAt: Date
  updatedAt: Date
}

interface CartInput extends Optional<CartAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface CartOutput extends Required<CartAttributes> { }

class Cart extends Model<CartAttributes, CartInput> implements CartAttributes {
  static associate(model: typeof db.Cart) {
    Cart.belongsTo(model.User, { foreignKey: 'userId' })
    Cart.hasMany(model.CartItem, { foreignKey: 'cartId' })
  }
  id!: number
  userId!: number
  createdAt!: Date
  updatedAt!: Date
}

const cartInit = (sequelize: Sequelize) => {
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true
  })
  return Cart
}

export default cartInit