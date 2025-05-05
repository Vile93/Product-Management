import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
        validate: [
            {
                validator: (value: number) => Number.isFinite(value),
                message: 'Price must be a finite number',
            },
            {
                validator: (value: number) => value > 0,
                message: 'Price must be a positive number',
            },
        ],
    },
    count: {
        type: Number,
        required: true,
        validate: [
            {
                validator: (value: number) => Number.isInteger(value),
                message: 'Count must be an integer',
            },
            {
                validator: (value: number) => value >= 0,
                message: 'Count must be a positive integer',
            },
        ],
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'products'],
    },
});

export const ProductModel = mongoose.model('Product', productSchema);
