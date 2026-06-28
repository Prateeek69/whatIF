import { Request, Response, NextFunction } from 'express';
import { env } from '../lib/env.js';

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error('Unexpected error:', err);

    // Default to the safe message — only reveal raw error text in development.
    const safe = env.NODE_ENV !== 'development';
    return res.status(500).json({
        success: false,
        message: safe ? 'Internal server error' : err.message,
    });
};
