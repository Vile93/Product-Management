import { IProduct } from '../../../shared/types/product.interface';
import { ProductModel } from '../models/product.model';
import { IPagination } from '../../../shared/types/pagination.interface';
import { Response } from 'express';
import { IPartialOrder } from '../../../shared/types/order.interface';
import { IPartialFilter } from '../../../shared/types/filter.interface';

export class ProductService {
    static async getProducts(query: IPagination & IPartialOrder & IPartialFilter, res: Response) {
        const { page, limit, orderField, orderDirection, categoryFilter } = query;
        const products = await ProductModel.find()
            .sort(orderField && orderDirection ? { [orderField]: orderDirection } : {})
            .where(categoryFilter ? { category: categoryFilter } : {})
            .skip((page - 1) * limit)
            .limit(limit);
        const totalProducts = (
            await ProductModel.find()
                .sort(orderField && orderDirection ? { [orderField]: orderDirection } : {})
                .where(categoryFilter ? { category: categoryFilter } : {})
        ).length;
        const totalPages = Math.ceil(totalProducts / Number(limit));
        res.status(200).json({ products, totalPages });
    }

    static async getTotalProducts() {
        const totalProducts = await ProductModel.countDocuments();
        return totalProducts;
    }

    static async getProductById(id: string, res: Response) {
        const product = await ProductModel.findById(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    }

    static async deleteProductById(id: string, res: Response) {
        const product = await ProductModel.findById(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        await ProductModel.deleteOne({ _id: id });
        res.status(200).json({ message: 'Product deleted successfully' });
    }

    static async createProduct(product: Omit<IProduct, '_id'>, res: Response) {
        const candidate = await ProductModel.findOne({ name: product.name });
        if (candidate) {
            res.status(400).json({ message: 'Product already exists' });
            return;
        }
        const productEntity = new ProductModel(product);
        await productEntity.validate();
        const newProduct = await ProductModel.create(product);
        res.status(200).json(newProduct);
    }

    static async updateProductById(id: string, product: Omit<IProduct, '_id'>, res: Response) {
        const dbProduct = await ProductModel.findById(id);
        if (!dbProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const candidate = await ProductModel.findOne({ name: product.name });
        if (candidate && dbProduct._id.toString() !== candidate._id.toString()) {
            res.status(400).json({ message: 'Product already exists' });
            return;
        }
        const productEntity = new ProductModel(product);
        await productEntity.validate();
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json(updatedProduct);
    }

    static async getStatistics() {
        const statistics = await Promise.all([
            ProductModel.aggregate([
                {
                    $group: {
                        _id: null,
                        count: { $sum: '$count' },
                    },
                },
            ]),
            ProductModel.aggregate([
                {
                    $group: {
                        _id: null,
                        avgPrice: { $avg: '$price' },
                    },
                },
            ]),
            ProductModel.aggregate([
                {
                    $group: {
                        _id: '$category',
                        count: { $sum: '$count' },
                    },
                },
            ]),
            ProductModel.aggregate([
                {
                    $group: {
                        _id: '$category',
                        avgPrice: { $avg: '$price' },
                    },
                },
            ]),
        ]);
        const [totalCount, averagePrice, categoryCount, categoryAvgPrice] = statistics;

        return {
            categoryCount: [
                ...categoryCount.map((stat: { _id: string; count: number }) => ({
                    category: stat._id,
                    count: stat.count,
                })),
                { category: 'all', count: totalCount[0]?.count },
            ],
            categoryAvgPrice: [
                ...categoryAvgPrice.map((stat: { _id: string; avgPrice: number }) => ({
                    category: stat._id,
                    avgPrice: stat.avgPrice,
                })),
                { category: 'all', avgPrice: averagePrice[0]?.avgPrice },
            ],
        };
    }
}
