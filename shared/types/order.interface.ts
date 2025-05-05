import { IProduct } from './product.interface';

export interface IOrder {
    orderField: keyof Pick<IProduct, 'price' | 'count'>;
    orderDirection: 'asc' | 'desc';
}

export interface IPartialOrder extends Partial<IOrder> {}
