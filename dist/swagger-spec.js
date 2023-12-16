"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: 'Stylish',
        description: 'Description'
    },
    host: 'localhost:3000'
};
const outputFile = './src/swagger-output.json';
const routes = ['./src/routes/index.ts'];
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
(0, swagger_autogen_1.default)()(outputFile, routes, doc);
