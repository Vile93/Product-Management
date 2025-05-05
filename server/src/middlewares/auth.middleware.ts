import { Request, Response, NextFunction } from 'express';
import { getToken } from '../utils/getToken.util';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getToken(req);
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decoded = jwt.verify(token, jwtConfig.secret);
        if (!decoded) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
