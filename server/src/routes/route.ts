import { authRouter } from '../routes/auth.route';
import { productRouter } from '../routes/product.route';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authValidator } from '../middlewares/auth.validator';

export const router = Router();

const apiRouter = Router();

apiRouter.use('/products', authMiddleware, productRouter);
apiRouter.use('/auth', authValidator, authRouter);

router.use('/api/v1', apiRouter);
