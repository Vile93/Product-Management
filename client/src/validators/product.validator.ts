import { IProduct } from '../../../shared/types/product.interface';

export const productValidator = (product: Omit<IProduct, '_id'>) => {
    const { name, price, count, category } = product;
    const errors = { name: '', price: '', count: '', category: '', description: '' };
    if (price < 0) {
        errors.price = 'Price must be positive';
    }
    if (count < 0) {
        errors.count = 'Count must be positive';
    }
    if (!name) {
        errors.name = 'Name is required';
    }
    if (!price || price <= 0) {
        errors.price = 'Price is required';
    }
    if (count < 0) {
        errors.count = 'Count is required';
    }
    if (!category) {
        errors.category = 'Category is required';
    }
    if (errors.name || errors.price || errors.count || errors.category || errors.description) {
        return errors;
    }
    return null;
};
