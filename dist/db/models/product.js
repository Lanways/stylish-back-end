'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.productInit = exports.Product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
const productInit = (sequelize) => {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER
        },
        name: { type: sequelize_1.DataTypes.STRING, },
        price: { type: sequelize_1.DataTypes.STRING }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        underscored: true
    });
    return Product;
};
exports.productInit = productInit;
