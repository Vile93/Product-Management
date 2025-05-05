import { Legend, Line, Tooltip, XAxis, YAxis, LineChart, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { getStatistics } from '../../api/product.api';
import Loader from '../../components/loader';
import { useFetch } from '../../hooks/use-fetch.hook';
import { IMessageResponse } from '../../types/message.interface';
import { useEffect } from 'react';

const StatisticsPage = () => {
    const { fetchData, data, isLoading, isError } = useFetch<
        | IMessageResponse
        | {
              categoryCount: [{ category: string; count: number }];
              categoryAvgPrice: [{ category: string; avgPrice: number }];
          },
        null
    >(getStatistics);

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <Loader />;
    if (isError) return <div>Error</div>;
    if (data && 'message' in data) {
        return <div>{data.message}</div>;
    }

    return (
        <>
            <div className="text-xl font-bold my-4">Count of products by category</div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart width={1280} height={500} data={data?.categoryCount}>
                    <XAxis dataKey="category" />
                    <YAxis dataKey="count" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" />
                </LineChart>
            </ResponsiveContainer>
            <div className="text-xl font-bold my-4">Average price by category</div>
            <div className="flex justify-center">
                <ResponsiveContainer width="66%" height={300}>
                    <BarChart data={data?.categoryAvgPrice}>
                        <XAxis dataKey="category" />
                        <Tooltip formatter={(value: number) => value.toFixed(2)} />
                        <Bar dataKey="avgPrice">
                            {data?.categoryAvgPrice.map(entry => (
                                <Cell type="monotone" key={entry?.avgPrice} fill="#8884d8" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default StatisticsPage;
