import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as SignOptions['expiresIn'],
};
