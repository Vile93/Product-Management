import { FC, useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import Select from '../../../components/ui/select';
import { FILTER_CATEGORY_OPTIONS } from '../../../constants/product-filter.constant';
import { IProduct, IProductErrors } from '../../../../../shared/types/product.interface';
import { productValidator } from '../../../validators/product.validator';
import { Category } from '../../../../../shared/types/category.enum';
import ErrorForm from '../../../components/error-form';
import { useFetch } from '../../../hooks/use-fetch.hook';
import { IMessageResponse } from '../../../types/message.interface';
import { createProduct } from '../../../api/product.api';
import { showToast } from '../../../store/reducers/toast.reducer';
import { useDispatch } from 'react-redux';
import { IPartialFilter } from '../../../../../shared/types/filter.interface';
import { IPartialOrder } from '../../../../../shared/types/order.interface';
import { IPartialPagination } from '../../../../../shared/types/pagination.interface';

interface CreateModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setNewProductArgs: React.Dispatch<
        React.SetStateAction<{
            old: IPartialPagination & IPartialOrder & IPartialFilter;
            new: IPartialPagination & IPartialOrder & IPartialFilter;
        }>
    >;
}

const CreateModal: FC<CreateModalProps> = ({ isOpen, setIsOpen, setNewProductArgs }) => {
    const { fetchData, isCompleted, data, newArgs, setNewArgs } = useFetch<
        IMessageResponse | IProduct,
        Omit<IProduct, '_id'>
    >(createProduct);
    const [errors, setErrors] = useState<IProductErrors | null>(null);
    const [categoryValue, setCategoryValue] = useState<string>('');
    const handleCategoryChange = (value: string) => {
        setCategoryValue(value);
    };
    const dispatch = useDispatch();
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        setErrors(null);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price');
        const count = formData.get('count');
        const category = formData.get('category');
        const product: Omit<IProduct, '_id'> = {
            name: name as string,
            price: Number(price),
            count: Number(count),
            category: category as Category,
            description: description as string,
        };
        const errors = productValidator(product);
        if (errors) {
            setErrors(errors);
            return;
        }
        setNewArgs([product]);
    };
    useEffect(() => {
        if (newArgs) {
            fetchData();
        }
    }, [newArgs]);

    useEffect(() => {
        if (isCompleted && data) {
            setIsOpen(false);
            if ('message' in data) {
                dispatch(showToast({ message: data.message, type: 'error' }));
            } else {
                dispatch(showToast({ message: 'Product created successfully', type: 'success' }));
            }
            setNewProductArgs(prev => ({ new: { ...prev.old }, old: { ...prev.old } }));
        }
    }, [isCompleted, data]);
    return (
        <Modal
            acceptButtonText="Create"
            declineButtonText="Close"
            title="Create product"
            content={
                <div className="w-96 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" id="name" className="border-2 border-gray-300 rounded-md p-2" />
                        <ErrorForm error={errors?.name} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <input
                            name="description"
                            type="text"
                            id="description"
                            className="border-2 border-gray-300 rounded-md p-2"
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
                            min={0}
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
                            min={0}
                        />
                        <ErrorForm error={errors?.count} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Category</label>
                        <Select
                            name="category"
                            options={FILTER_CATEGORY_OPTIONS}
                            labelOption="Select category"
                            onChange={handleCategoryChange}
                            value={categoryValue ?? ''}
                        />
                        <ErrorForm error={errors?.category} />
                    </div>
                </div>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSubmit={handleCreate}
        />
    );
};

export default CreateModal;
