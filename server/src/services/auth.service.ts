import { UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import { Response } from 'express';

export class AuthService {
    static async login(login: string, password: string, res: Response) {
        const user = await UserModel.findOne({ login });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const token = jwt.sign({ id: user._id, login: user.login }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });
        res.status(200).json({ token });
    }

    static async register(login: string, password: string, res: Response) {
        const candidate = await UserModel.findOne({ login });
        if (candidate) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ login, password: hashedPassword });
        const token = jwt.sign({ id: user._id, login: user.login }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });
        res.status(200).json({ token });
    }
}
