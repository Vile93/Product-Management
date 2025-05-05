import { IAuth } from '../types/auth.interface';
import { myFetch } from './main.api';

export const login = async (data: IAuth) => {
    return myFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const register = async (data: IAuth) => {
    return myFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
