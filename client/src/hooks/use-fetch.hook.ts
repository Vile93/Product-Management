import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unauth } from '../store/reducers/auth.reducer';
import { ROUTE_PATH } from '../constants/route.constant';
import { setLocation } from '../store/reducers/location.reducer';

export const useFetch = <T, Y>(callback: (...args: Y[]) => Promise<Response>, ...args: Y[]) => {
    const [data, setData] = useState<T>();
    const [newArgs, setNewArgs] = useState<Y[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessCompleted, setIsSuccessCompleted] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const dispatch = useDispatch();

    const fetch = async (): Promise<Response> => {
        if (newArgs) {
            return callback(...newArgs);
        } else {
            return callback(...args);
        }
    };
    const fetchData = async () => {
        setIsSuccessCompleted(false);
        setIsCompleted(false);
        setIsLoading(true);
        setIsError(false);
        try {
            const res = await fetch();
            try {
                const data = await res.json();
                setData(data);
            } catch {
                setIsError(true);
            }
            setStatusCode(res.status);
            if (res.status === 401) {
                localStorage.removeItem('token');
                dispatch(unauth());
                dispatch(setLocation(ROUTE_PATH.LOGIN));
            }
            setIsSuccessCompleted(true);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsCompleted(true);
        }
    };
    return {
        data,
        fetchData,
        isLoading,
        isError,
        statusCode,
        newArgs,
        setNewArgs,
        isSuccessCompleted,
        isCompleted,
    };
};
