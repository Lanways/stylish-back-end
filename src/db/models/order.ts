import { Model, Optional, Sequelize, DataTypes } from "sequelize"
import db from './index'

interface OrderAttributes {
  id: number
  userId: number
  shippingId: number
  shippingFeeId: number
  totalPrice: number
  status: string
  createdAt: Date
  updatedAt: Date
}

interface OrderInput extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface OrderOutput extends Required<OrderAttributes> { }

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  static associate(model: typeof db.Order) {
    Order.belongsTo(model.User, { foreignKey: 'userId' })
    Order.hasOne(model.Shipping, { foreignKey: 'shippingId' })
    Order.hasOne(model.ShippingFee, { foreignKey: 'shippingFeeId' })
    Order.hasMany(model.OrderItem, { foreignKey: 'OrderId' })
  }
  id!: number
  userId!: number
  shippingId!: number
  shippingFeeId!: number
  totalPrice!: number
  status!: string
  createdAt!: Date
  updatedAt!: Date
}

const orderInit = (sequelize: Sequelize) => {
  Order.init({
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
    shippingId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    shippingFeeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['Pending', 'Shipped', 'Delivered', 'Cancelled']
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
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  })
  return Order
}

export default orderInit