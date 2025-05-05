import { Request } from 'express';

export const getToken = (req: Request) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return null;
        const token = authHeader.split('Bearer')[1];
        return token.trim();
    } catch {
        return null;
    }
};
