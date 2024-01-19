import { Model, Optional, Sequelize, DataTypes } from "sequelize"
import db from './index'

interface CartItemAttributes {
  id: number
  cartId: number
  skuId: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}

interface CartItemInput extends Optional<CartItemAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface CartItemOutput extends Required<CartItemAttributes> { }

class CartItem extends Model<CartItemAttributes, CartItemInput> implements CartItemAttributes {
  static associate(model: typeof db.CartItem) {
    CartItem.belongsTo(model.Cart, { foreignKey: 'cartId' })
    CartItem.belongsTo(model.Sku, { foreignKey: 'skuId' })
  }
  id!: number
  cartId!: number
  skuId!: number
  quantity!: number
  createdAt!: Date
  updatedAt!: Date
}

const cartItemInit = (sequelize: Sequelize) => {
  CartItem.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cartId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    skuId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
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
    modelName: 'CartItem',
    tableName: 'CartItems',
    underscored: true
  })
  return CartItem
}

export default cartItemInit