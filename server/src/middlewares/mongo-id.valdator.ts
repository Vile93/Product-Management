import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

export const mongoIdValidator = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid product id' });
        return;
    }
    next();
};
