'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
const productInit = (sequelize) => {
    Product.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        price: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE
        },
        image: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        sizeOptions: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        quantity: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER
        },
        description: {
            allowNull: true,
            type: sequelize_1.DataTypes.TEXT
        },
        additionalImage: {
            allowNull: false,
            type: sequelize_1.DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        underscored: true
    });
    return Product;
};
exports.default = productInit;
