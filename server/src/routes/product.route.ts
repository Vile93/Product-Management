import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { mongoIdValidator } from '../middlewares/mongo-id.valdator';
import { productFilterValidator } from '../middlewares/product-filter.validator';

const router = Router();

router.get('/', productFilterValidator, ProductController.getProducts);
router.get('/statistics', ProductController.getStatistics);
router.get('/:id', mongoIdValidator, ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', mongoIdValidator, ProductController.updateProductById);
router.delete('/:id', mongoIdValidator, ProductController.deleteProductById);

export const productRouter = router;
