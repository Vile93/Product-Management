import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

export class AuthController {
    static async login(req: Request, res: Response) {
        const { login, password } = req.body;
        await AuthService.login(login, password, res);
    }

    static async register(req: Request, res: Response) {
        const { login, password } = req.body;
        await AuthService.register(login, password, res);
    }
}
