'use strict';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

interface ProductAttributes {
  id: number
  name: string
  price: string
  createdAt: Date
  updatedAt: Date
  image: string
  sizeOptions: string
  quantity: number
  description: string
  additionalImage: string
  categoryId: string
}

export interface ProductInput extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface ProductOutput extends Required<ProductAttributes> { }

export class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
  static associate(models: any) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
  }
  id!: number
  name!: string
  price!: string
  createdAt!: Date
  updatedAt!: Date
  image!: string
  sizeOptions!: string
  quantity!: number
  description!: string
  additionalImage!: string
  categoryId!: string
}

const productInit = (sequelize: Sequelize) => {
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
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
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sizeOptions: {
      allowNull: false,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    additionalImage: {
      allowNull: false,
      type: DataTypes.TEXT
    }, categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  });
  return Product;
}

export default productInit