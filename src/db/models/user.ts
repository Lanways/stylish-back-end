import { DataTypes, Model, Optional, Sequelize } from "sequelize"

interface UserAttributes {
  id: number
  name?: string
  email: string
  phone: number
  address?: string
  createdAt: Date
  updatedAt: Date
}

interface UserInput extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  id!: number
  name?: string
  email!: string
  phone!: number
  address?: string
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
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
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