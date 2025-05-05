import { ProductService } from '../services/product.service';
import { IPagination, IPaginationQuery } from '../../../shared/types/pagination.interface';
import { Request, Response } from 'express';
import { IPartialFilter } from '../../../shared/types/filter.interface';
import { IPartialOrder } from '../../../shared/types/order.interface';

export class ProductController {
    static async getProducts(req: Request, res: Response) {
        const { page = String(1), limit = String(10) }: IPaginationQuery = req.query;
        const { orderField, orderDirection, categoryFilter }: IPartialOrder & IPartialFilter = req.query;
        await ProductService.getProducts(
            {
                page: Number(page),
                limit: Number(limit),
                orderField,
                orderDirection,
                categoryFilter,
            },
            res
        );
    }

    static async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        await ProductService.getProductById(id, res);
    }

    static async deleteProductById(req: Request, res: Response) {
        const { id } = req.params;
        await ProductService.deleteProductById(id, res);
    }

    static async createProduct(req: Request, res: Response) {
        const { name, description, price, count, category } = req.body;
        await ProductService.createProduct({ name, description, price, count, category }, res);
    }

    static async updateProductById(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, count, category } = req.body;
        await ProductService.updateProductById(id, { name, description, price, count, category }, res);
    }

    static async getStatistics(req: Request, res: Response) {
        const statistics = await ProductService.getStatistics();
        res.json(statistics);
    }
}
