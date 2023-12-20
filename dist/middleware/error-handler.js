"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'CustomError';
    }
}
exports.CustomError = CustomError;
const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.status || 500).json({
            status: `${err.status}`,
            message: err.message
        });
    }
    else if (err instanceof Error) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'An unknow error occurred'
        });
    }
    next(err);
};
exports.apiErrorHandler = apiErrorHandler;
