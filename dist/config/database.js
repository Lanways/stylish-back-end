"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
exports.config = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME_TEST,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": 'password',
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
