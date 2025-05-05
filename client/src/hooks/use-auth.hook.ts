import { useDispatch } from 'react-redux';
import { auth } from '../store/reducers/auth.reducer';
import { authValidator } from '../validators/auth.validator';
import { IAuthResponse } from '../types/auth.interface';
import { login, register } from '../api/auth.api';
import { IAuth } from '../types/auth.interface';
import { useFetch } from './use-fetch.hook';
import { IMessageResponse } from '../types/message.interface';
import { useEffect, useState } from 'react';
import { setLocation } from '../store/reducers/location.reducer';
import { ROUTE_PATH } from '../constants/route.constant';

interface useAuthProps {
    authFn: typeof login | typeof register;
}

export const useAuth = ({ authFn }: useAuthProps) => {
    const [error, setError] = useState<{
        login?: string;
        password?: string;
        message?: string;
    } | null>(null);
    const { fetchData, setNewArgs, isCompleted, data, newArgs } = useFetch<IAuthResponse | IMessageResponse, IAuth>(
        authFn
    );
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setError(null);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const login = formData.get('login');
        const password = formData.get('password');
        const authData: IAuth = {
            login: login as string,
            password: password as string,
        };
        const validationError = authValidator(authData);
        if (validationError) {
            setError(validationError);
            return;
        }
        setNewArgs([authData]);
    };
    useEffect(() => {
        if (isCompleted && data) {
            if ('token' in data) {
                localStorage.setItem('token', data.token);
                dispatch(auth());
                dispatch(setLocation(ROUTE_PATH.PRODUCTS));
            } else {
                setError({ message: data.message });
            }
        }
    }, [isCompleted]);
    useEffect(() => {
        if (newArgs) {
            fetchData();
        }
    }, [newArgs]);

    return {
        error,
        handleSubmit,
    };
};
