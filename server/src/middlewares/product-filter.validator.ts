import { Request, Response, NextFunction } from 'express';
import { PRODUCT_CATEGORIES, PRODUCT_SORT_DIRECTIONS, PRODUCT_SORT_OPTIONS } from '../constants';
import { Category } from '../../../shared/types/category.enum';

export const productFilterValidator = (req: Request, res: Response, next: NextFunction) => {
    const { categoryFilter, orderField, orderDirection } = req.query;

    if (categoryFilter && !PRODUCT_CATEGORIES.includes(categoryFilter as Category)) {
        res.status(400).json({ message: 'Invalid category' });
        return;
    }
    if (orderDirection && !PRODUCT_SORT_DIRECTIONS.includes(orderDirection as string)) {
        res.status(400).json({ message: 'Invalid order direction' });
        return;
    }
    if (orderField && !PRODUCT_SORT_OPTIONS.includes(orderField as string)) {
        res.status(400).json({ message: 'Invalid order field' });
        return;
    }
    next();
};
