import { Model, Optional, Sequelize, DataTypes } from "sequelize"
import db from './index'

interface OrderItemAttributes {
  id: number
  orderId: number
  skuId: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}

interface OrderItemInput extends Optional<OrderItemAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface OrderItemOutput extends Required<OrderItemAttributes> { }

class OrderItem extends Model<OrderItemAttributes, OrderItemInput> implements OrderItemAttributes {
  static associate(model: typeof db) {
    OrderItem.belongsTo(model.Order, { foreignKey: 'orderId' })
    OrderItem.belongsTo(model.Sku, { foreignKey: 'skuId' })
  }
  id!: number
  orderId!: number
  skuId!: number
  quantity!: number
  createdAt!: Date
  updatedAt!: Date
}

const orderItemInit = (sequelize: Sequelize) => {
  OrderItem.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderId: {
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
    modelName: 'OrderItem',
    tableName: 'OrderItems',
    underscored: true
  })
  return OrderItem
}

export default orderItemInit