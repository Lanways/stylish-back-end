import { Model, DataTypes, Sequelize, Optional } from 'sequelize'
import db from './index'

interface PaymentAttributes {
  id: number
  orderId: number
  amount: number
  provider: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface PaymentInput extends Optional<PaymentAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface PaymentOutput extends Required<PaymentAttributes> { }

export class Payment extends Model<PaymentAttributes, PaymentInput> implements PaymentAttributes {
  static associate(models: typeof db) {
    Payment.belongsTo(models.Order, { foreignKey: 'orderId' })
  }
  id!: number
  orderId!: number
  amount!: number
  provider!: string
  status!: string
  createdAt!: Date
  updatedAt!: Date
}

const paymentInit = (sequelize: Sequelize) => {
  Payment.init({
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
    modelName: 'Payment',
    tableName: 'Payments',
    underscored: true
  });
  return Payment
}

export default paymentInit