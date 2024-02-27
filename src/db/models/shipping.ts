import { Model, DataTypes, Sequelize, Optional } from 'sequelize'
import db from './index'

interface ShippingAttributes {
  id: number
  orderId: number
  recipient: string
  address: string
  telephone: number
  createdAt: Date
  updatedAt: Date
}

export interface ShippingInput extends Optional<ShippingAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface ShippingOutput extends Required<ShippingAttributes> { }

export class Shipping extends Model<ShippingAttributes, ShippingInput> implements ShippingAttributes {
  static associate(models: typeof db) {
    Shipping.belongsTo(models.Order, { foreignKey: 'orderId' })
  }
  id!: number
  orderId!: number
  recipient!: string
  address!: string
  telephone!: number
  createdAt!: Date
  updatedAt!: Date
}

const shippingInit = (sequelize: Sequelize) => {
  Shipping.init({
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
    recipient: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telephone: {
      allowNull: false,
      type: DataTypes.STRING
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
    modelName: 'Shipping',
    tableName: 'Shippings',
    underscored: true
  });
  return Shipping
}

export default shippingInit