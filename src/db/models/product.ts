'use strict';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

interface ProductAttributes {
  id?: number
  name: string
  price: string
}

interface ProductInput extends Optional<ProductAttributes, 'id'> { }

export class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
  id!: number
  name!: string
  price!: string
}

export const productInit = (sequelize: Sequelize) => {
  Product.init({
    id: {
      type: DataTypes.INTEGER
    },
    name: { type: DataTypes.STRING, },
    price: { type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  });
  return Product;
}