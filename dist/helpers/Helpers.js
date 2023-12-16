"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const ResponseData = (status, message, data) => {
    return {
        status,
        message,
        data,
    };
};
exports.ResponseData = ResponseData;
