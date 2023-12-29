import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

interface CategoryAttributes {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryInput extends Optional<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export interface CategoryOutput extends Required<CategoryAttributes> { }

export class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
  static associate(models: any) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' })
  }
  id!: number
  name!: string
  createdAt!: Date
  updatedAt!: Date
}

const categoryInit = (sequelize: Sequelize) => {
  Category.init({
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
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true
  });
  return Category;
}

export default categoryInit