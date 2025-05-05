import { CategoryType } from './category.type';

export interface IProduct {
    _id: string;
    name: string;
    description?: string;
    price: number;
    count: number;
    category: CategoryType;
}

export interface IProductErrors {
    name: string;
    description: string;
    price: string;
    count: string;
    category: string;
}
