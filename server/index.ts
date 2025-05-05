import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { router } from './src/routes/route';
import { bodyMiddleware } from './src/middlewares/body.middleware';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
    app.use(cors(), morgan('dev'));
}
app.use(helmet(), express.json(), bodyMiddleware, router);

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://admin:admin@db/product-management?authSource=admin')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
    });
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'src', 'public')));
    app.use('/*splat', (req: express.Request, res: express.Response) => {
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
    });
}

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: err.errors });
        return;
    }
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
