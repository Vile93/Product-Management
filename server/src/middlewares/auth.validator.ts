import { Request, Response, NextFunction } from 'express';

export const authValidator = (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    if (!login || !password) {
        res.status(400).json({ message: 'Login and password are required' });
        return;
    }
    if (typeof login !== 'string' && typeof password !== 'string') {
        res.status(400).json({ message: 'Login and password must be strings' });
        return;
    }
    if (login.length < 3 || login.length > 30) {
        res.status(400).json({ message: 'Login must be between 3 and 30 characters' });
        return;
    }
    if (password.length < 8 || password.length > 30) {
        res.status(400).json({ message: 'Password must be between 8 and 30 characters' });
        return;
    }
    next();
};
