"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'CustomError';
    }
}
const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.status || 500).json({
            status: 'error',
            message: `${err.name}:${err.message}`
        });
    }
    else if (err instanceof Error) {
        res.status(500).json({
            status: 'error',
            message: `${err}`
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
