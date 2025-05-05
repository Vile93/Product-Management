const defaultOptions = (): RequestInit => {
    const token = localStorage.getItem('token');
    if (token) {
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export const myFetch = async (url: string, options?: RequestInit) => {
    return fetch((import.meta.env.VITE_API || 'api/v1') + url, { ...defaultOptions(), ...options });
};
