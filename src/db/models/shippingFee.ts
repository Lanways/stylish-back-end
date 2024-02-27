import { Model, DataTypes, Sequelize, Optional } from 'sequelize'
import db from './index'

interface ShippingFeeAttributes {
  id: number
  country: string
  paymentMethod: string
  shippingMethod: string
  fee: number
  createdAt: Date
  updatedAt: Date
}

export interface ShippingFeeInput extends Optional<ShippingFeeAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface ShippingFeeOutput extends Required<ShippingFeeAttributes> { }

export class ShippingFee extends Model<ShippingFeeAttributes, ShippingFeeInput> implements ShippingFeeAttributes {
  static associate(models: typeof db) {
    ShippingFee.hasOne(models.Order, { foreignKey: 'shippingFeeId' })
  }
  id!: number
  country!: string
  paymentMethod!: string
  shippingMethod!: string
  fee!: number
  createdAt!: Date
  updatedAt!: Date
}

const shippingFeeInit = (sequelize: Sequelize) => {
  ShippingFee.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    paymentMethod: {
      allowNull: false,
      type: DataTypes.STRING
    },
    shippingMethod: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fee: {
      allowNull: false,
      type: DataTypes.DECIMAL
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
    modelName: 'ShippingFee',
    tableName: 'ShippingFees',
    underscored: true
  });
  return ShippingFee
}

export default shippingFeeInit