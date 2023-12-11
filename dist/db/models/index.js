"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
const product_1 = require("./product");
const env = process.env.NODE_ENV || 'development';
const dbConfig = database_1.config[env];
const dbUsername = dbConfig.username;
const dbPassword = dbConfig.password;
const dbName = dbConfig.database;
const dbHost = dbConfig.host;
const dbDialect = dbConfig.dialect;
let sequelize = new sequelize_1.Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect
});
const db = {};
const Product = (0, product_1.productInit)(sequelize);
exports.Product = Product;
db.Product = Product;
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
