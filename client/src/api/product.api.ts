import { myFetch } from './main.api';
import { IProduct } from '../../../shared/types/product.interface';
import { IPartialPagination } from '../../../shared/types/pagination.interface';
import { setQuery } from '../utils/set-query.util';
import { IPartialOrder } from '../../../shared/types/order.interface';
import { IPartialFilter } from '../../../shared/types/filter.interface';

export const getProducts = async (query: IPartialPagination & IPartialOrder & IPartialFilter) => {
    return myFetch('/products' + setQuery(query));
};

export const createProduct = async (product: Omit<IProduct, '_id'>) => {
    return myFetch('/products', {
        method: 'POST',
        body: JSON.stringify(product),
    });
};

export const updateProduct = async (product: IProduct) => {
    return myFetch(`/products/${product._id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
    });
};

export const deleteProduct = async (id: string) => {
    return myFetch(`/products/${id}`, {
        method: 'DELETE',
    });
};

export const getProductById = async (id: string) => {
    return myFetch(`/products/${id}`);
};

export const getStatistics = async () => {
    return myFetch('/products/statistics');
};
