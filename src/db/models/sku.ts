import { DataTypes, Model, Optional, Sequelize } from "sequelize"
import db from "./index"

interface SkuAttributes {
  id: number
  productId: number
  skuCode: string
  price: number
  inventoryQuantity: number
  color: string
  size: string
  createdAt: Date
  updatedAt: Date
}

export interface SkuInput extends Optional<SkuAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface SkuOutput extends Required<SkuAttributes> { }

export class Sku extends Model<SkuAttributes, SkuInput> implements SkuAttributes {
  static associate(models: typeof db.Sku) {
    Sku.belongsTo(models.Product, { foreignKey: 'productId' })
  }
  id!: number
  productId!: number
  skuCode!: string
  price!: number
  inventoryQuantity!: number
  color!: string
  size!: string
  createdAt!: Date
  updatedAt!: Date
}

const SkuInit = (sequelize: Sequelize) => {
  Sku.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    skuCode: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    inventoryQuantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    color: {
      allowNull: false,
      type: DataTypes.STRING
    },
    size: {
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
  }, {
    sequelize,
    modelName: 'Sku',
    tableName: 'Skus',
    underscored: true,
  })
  return Sku
}

export default SkuInit