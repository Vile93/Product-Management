import { IAuth } from '../types/auth.interface';

export const authValidator = (authData: IAuth) => {
    const { login, password } = authData;
    const errors = { login: '', password: '' };
    if (login.length < 3 || login.length > 30) {
        errors.login = 'Login must be between 3 and 30 characters';
    }
    if (password.length < 8 || password.length > 30) {
        errors.password = 'Password must be between 8 and 30 characters';
    }
    if (!login) {
        errors.login = 'Login and password are required';
    }
    if (!password) {
        errors.password = 'Password and password are required';
    }
    if (errors.login || errors.password) return errors;
    return null;
};
