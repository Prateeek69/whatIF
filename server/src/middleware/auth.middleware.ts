import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware.js';
import { env } from '../lib/env.js';

export interface AuthRequest extends Request {
    userId?: string;
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export const authenticate = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, env.JWT_SECRET, {
            algorithms: ['HS256'],
            issuer: 'whatif',
            audience: 'whatif-client',
        }) as JwtPayload;

        req.userId = decoded.userId;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(new AppError('Token expired', 401));
        } else if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError('Invalid token', 401));
        } else {
            next(error);
        }
    }
};
