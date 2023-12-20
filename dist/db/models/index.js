"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
fs_1.default.readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== path_1.default.basename(__filename)) && (file.slice(-3) === '.ts');
})
    .forEach(file => {
    const model = require(path_1.default.join(__dirname, file)).default(sequelize);
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
