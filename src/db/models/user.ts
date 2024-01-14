import { DataTypes, Model, Optional, Sequelize } from "sequelize"
import db from './index'

interface UserAttributes {
  id: number
  name?: string
  account?: string
  email: string
  password: string
  phone: string
  address?: string
  isAdmin?: boolean
  createdAt: Date
  updatedAt: Date
}

interface UserInput extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  static associate(model: typeof db.User) {
    User.hasOne(model.Cart, { foreignKey: 'userId' })
  }
  id!: number
  name?: string
  account?: string
  email!: string
  password!: string
  phone!: string
  address?: string
  isAdmin?: boolean
  createdAt!: Date
  updatedAt!: Date
}

const userInit = (sequelize: Sequelize) => {
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    account: {
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}

export default userInit