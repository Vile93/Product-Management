import { useEffect, useState } from 'react';
import { IPagination, IPartialPagination } from '../../../../shared/types/pagination.interface';
import { IProduct } from '../../../../shared/types/product.interface';
import { getProducts } from '../../api/product.api';
import { useFetch } from '../../hooks/use-fetch.hook';
import { IMessageResponse } from '../../types/message.interface';
import Loader from '../../components/loader';
import Pagination from './components/pagination';
import { PRODUCT_SORT_OPTIONS } from '../../constants/product-filter.constant';
import ProductList from './components/product-list';
import { IPartialOrder } from '../../../../shared/types/order.interface';
import { IPartialFilter } from '../../../../shared/types/filter.interface';
import { UpdateModal } from './components/update-modal';
import CreateModal from './components/create-modal';
import Filters from './components/filters';

const ProductsPage = () => {
    const { data, fetchData, isLoading, newArgs, setNewArgs } = useFetch<
        IMessageResponse | { products: IProduct[]; totalPages: number },
        IPartialPagination & IPartialOrder & IPartialFilter
    >(getProducts, { page: 1, limit: 3 });

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setCurrentPage(page);
        setNewArgs(prev => [{ ...(prev?.[0] ?? []), ...{ page, limit: 3 } }]);
    };
    const [sortValue, setSortValue] = useState<string | null>(null);
    const handleSortChange = (value: string) => {
        setSortValue(value);
    };
    const [categoryValue, setCategoryValue] = useState<string | null>(null);
    const handleCategoryChange = (value: string) => {
        setCategoryValue(value);
    };
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const handleSearch = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newArgs: IPagination & IPartialOrder & IPartialFilter = {
            page: 1,
            limit: 3,
            orderField: PRODUCT_SORT_OPTIONS.find(option => option.value === sortValue)?.orderField,
            orderDirection: PRODUCT_SORT_OPTIONS.find(option => option.value === sortValue)?.orderDirection,
            categoryFilter: categoryValue ?? undefined,
        };
        setCurrentPage(1);
        setNewArgs([newArgs]);
    };
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [newArgsForProduct, setNewArgsForProduct] = useState<{
        old: IPartialPagination & IPartialOrder & IPartialFilter;
        new: IPartialPagination & IPartialOrder & IPartialFilter;
    }>({
        old: { page: 1, limit: 3 },
        new: {},
    });
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (newArgs) {
            fetchData();
            setSelectedProduct(null);
        }
    }, [newArgs]);
    useEffect(() => {
        if (Object.keys(newArgsForProduct.new).length > 0) {
            setNewArgs([newArgsForProduct.new]);
            setNewArgsForProduct(prev => ({ ...prev, new: {} }));
        }
    }, [newArgsForProduct]);
    useEffect(() => {
        if (newArgs) {
            setNewArgsForProduct(prev => ({ ...prev, old: { ...prev.old, ...newArgs[0] } }));
        }
    }, [newArgs]);
    if (data && 'message' in data) {
        return <div>{data.message}</div>;
    }
    if (!data || isLoading) return <Loader />;
    return (
        <div>
            <CreateModal
                isOpen={isOpenCreateModal}
                setIsOpen={setIsOpenCreateModal}
                setNewProductArgs={setNewArgsForProduct}
            />
            <UpdateModal
                products={data.products}
                product={selectedProduct}
                isOpen={isOpenUpdateModal}
                setIsOpen={setIsOpenUpdateModal}
                setNewArgs={setNewArgsForProduct}
                setCurrentPage={setCurrentPage}
            />
            <Filters
                handleSortChange={handleSortChange}
                handleCategoryChange={handleCategoryChange}
                handleSearch={handleSearch}
                setIsOpenCreateModal={setIsOpenCreateModal}
                sortValue={sortValue ?? ''}
                categoryValue={categoryValue ?? ''}
            />

            {data.products.length > 0 ? (
                <div>
                    <div className="mt-4 relative overflow-x-auto">
                        <ProductList
                            products={data.products}
                            setSelectedProduct={setSelectedProduct}
                            setIsOpenUpdateModal={setIsOpenUpdateModal}
                        />
                    </div>
                    <div className="mt-4">
                        <Pagination
                            totalPages={data.totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center mt-12">
                    <div className="text-2xl font-bold">No products found</div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
