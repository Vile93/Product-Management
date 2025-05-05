import { FC, useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import { IProduct, IProductErrors } from '../../../../../shared/types/product.interface';
import Select from '../../../components/ui/select';
import { FILTER_CATEGORY_OPTIONS } from '../../../constants/product-filter.constant';
import { useFetch } from '../../../hooks/use-fetch.hook';
import { IMessageResponse } from '../../../types/message.interface';
import { deleteProduct, updateProduct } from '../../../api/product.api';
import { showToast } from '../../../store/reducers/toast.reducer';
import { useDispatch } from 'react-redux';
import { CategoryType } from '../../../../../shared/types/category.type';
import { productValidator } from '../../../validators/product.validator';
import ErrorForm from '../../../components/error-form';
import { IPartialFilter } from '../../../../../shared/types/filter.interface';
import { IPartialOrder } from '../../../../../shared/types/order.interface';
import { IPartialPagination } from '../../../../../shared/types/pagination.interface';

interface UpdateModalProps {
    products: IProduct[];
    product: IProduct | null;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setNewArgs: React.Dispatch<
        React.SetStateAction<{
            old: IPartialPagination & IPartialOrder & IPartialFilter;
            new: IPartialPagination & IPartialOrder & IPartialFilter;
        }>
    >;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
export const UpdateModal: FC<UpdateModalProps> = ({
    product,
    isOpen,
    setIsOpen,
    setNewArgs,
    products,
    setCurrentPage,
}) => {
    const [errors, setErrors] = useState<IProductErrors | null>(null);
    const dispatch = useDispatch();
    const deleteFetch = useFetch<IMessageResponse, string>(deleteProduct, String(product?._id));
    const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        deleteFetch.setNewArgs([String(product?._id)]);
    };
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product) return;
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price');
        const count = formData.get('count');
        const category = formData.get('category');
        const productForUpdate: IProduct = {
            _id: product._id,
            name: name as string,
            description: description as string | undefined,
            price: Number(price),
            count: Number(count),
            category: category as CategoryType,
        };
        const validationError = productValidator(productForUpdate);
        if (validationError) {
            setErrors(validationError);
            return;
        }
        updateFetch.setNewArgs([productForUpdate]);
    };
    const updateFetch = useFetch<IMessageResponse | IProduct, IProduct>(updateProduct);
    useEffect(() => {
        if (deleteFetch.data && deleteFetch.isCompleted && deleteFetch.statusCode === 200) {
            dispatch(showToast({ message: deleteFetch.data.message, type: 'success' }));
            setIsOpen(false);
            setNewArgs(prev => ({
                new: {
                    ...prev.old,
                    page:
                        products.length === 1 && prev.old.page !== 1 && typeof prev.old.page === 'number'
                            ? prev.old.page - 1
                            : prev.old.page,
                },
                old: { ...prev.old },
            }));
            setCurrentPage(prev => {
                if (prev === 1) return 1;
                return products.length === 1 ? prev - 1 : prev;
            });
        }
    }, [deleteFetch.isCompleted]);
    useEffect(() => {
        if (deleteFetch.newArgs) {
            deleteFetch.fetchData();
        }
    }, [deleteFetch.newArgs]);
    useEffect(() => {
        if (updateFetch.newArgs) {
            updateFetch.fetchData();
        }
    }, [updateFetch.newArgs]);
    useEffect(() => {
        if (updateFetch.data && updateFetch.isCompleted) {
            if (updateFetch.statusCode === 200) {
                dispatch(showToast({ message: 'Product updated successfully', type: 'success' }));
                setNewArgs(prev => ({ new: { ...prev.old, page: 1 }, old: { ...prev.old } }));
                setCurrentPage(1);
            } else {
                dispatch(
                    showToast({
                        message: 'message' in updateFetch.data ? updateFetch.data.message : 'Error updating product',
                        type: 'error',
                    })
                );
            }
            setIsOpen(false);
        }
    }, [updateFetch.isCompleted]);

    return (
        <>
            <Modal
                acceptButtonText="Update"
                declineButtonText="Close"
                title="Update product"
                content={
                    <div className="w-96 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={product?.name}
                            />
                            <ErrorForm error={errors?.name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Description</label>
                            <input
                                name="description"
                                type="text"
                                id="description"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={product?.description}
                            />
                            <ErrorForm error={errors?.description} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Price</label>
                            <input
                                name="price"
                                type="number"
                                id="price"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={product?.price}
                            />
                            <ErrorForm error={errors?.price} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="count">Count</label>
                            <input
                                name="count"
                                type="number"
                                id="count"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={product?.count}
                            />
                            <ErrorForm error={errors?.count} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category">Category</label>
                            <Select
                                name="category"
                                options={FILTER_CATEGORY_OPTIONS}
                                labelOption="Select category"
                                value={product?.category ?? ''}
                            />
                            <ErrorForm error={errors?.category} />
                        </div>
                    </div>
                }
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                otherButtons={
                    <button
                        onClick={handleDelete}
                        className="cursor-pointer text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Delete
                    </button>
                }
                onSubmit={handleUpdate}
            />
        </>
    );
};
