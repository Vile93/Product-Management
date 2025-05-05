import { Request, Response, NextFunction } from 'express';

export const bodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body === 'undefined') {
        req.body = {};
    }
    next();
};
