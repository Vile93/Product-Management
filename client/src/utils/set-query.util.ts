// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setQuery = (query: { [key: string]: any }) => {
    const params = new URLSearchParams();

    for (const key in query) {
        if (key && query[key] && key !== 'undefined') {
            params.append(key, query[key]);
        }
    }
    return params.toString() ? `?${params.toString()}` : '';
};
