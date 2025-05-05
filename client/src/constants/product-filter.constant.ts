import { IOrder } from '../../../shared/types/order.interface';

interface IProductSortOption {
    value: string;
    label: string;
    orderDirection: IOrder['orderDirection'];
    orderField: IOrder['orderField'];
}

export const PRODUCT_SORT_OPTIONS: IProductSortOption[] = [
    { value: 'lowPrice', label: 'Low Price', orderDirection: 'asc', orderField: 'price' },
    { value: 'highPrice', label: 'High Price', orderDirection: 'desc', orderField: 'price' },
    { value: 'lowCount', label: 'Low Count', orderDirection: 'asc', orderField: 'count' },
    { value: 'highCount', label: 'High Count', orderDirection: 'desc', orderField: 'count' },
];

export const FILTER_CATEGORY_OPTIONS = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'products', label: 'Products' },
];
