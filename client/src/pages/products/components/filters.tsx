import { FC } from 'react';
import { PRODUCT_SORT_OPTIONS } from '../../../constants/product-filter.constant';
import Select from '../../../components/ui/select';
import { FILTER_CATEGORY_OPTIONS } from '../../../constants/product-filter.constant';

interface FiltersProps {
    handleSortChange: (value: string) => void;
    handleCategoryChange: (value: string) => void;
    handleSearch: (e: React.FormEvent<HTMLButtonElement>) => void;
    setIsOpenCreateModal: (isOpen: boolean) => void;
    sortValue: string;
    categoryValue: string;
}

const Filters: FC<FiltersProps> = ({
    handleSortChange,
    handleCategoryChange,
    handleSearch,
    setIsOpenCreateModal,
    sortValue,
    categoryValue,
}) => {
    return (
        <div className="flex gap-4 flex-wrap justify-between">
            <div className="flex gap-4 flex-wrap">
                <div className="w-64 flex items-center gap-2">
                    <div className="text-sm font-medium">Sort by</div>
                    <div className="grow-1">
                        <Select
                            options={PRODUCT_SORT_OPTIONS}
                            labelOption="Select sort"
                            onChange={handleSortChange}
                            value={sortValue ?? ''}
                        />
                    </div>
                </div>
                <div className="w-64 flex items-center gap-2">
                    <div className="text-sm font-medium">Category</div>
                    <div className="grow-1">
                        <Select
                            options={FILTER_CATEGORY_OPTIONS}
                            labelOption="Select category"
                            onChange={handleCategoryChange}
                            value={categoryValue ?? ''}
                        />
                    </div>
                </div>
                <div className="w-64 flex items-center gap-2">
                    <button
                        type="button"
                        className="font-medium bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => setIsOpenCreateModal(true)}
                >
                    Add product
                </button>
            </div>
        </div>
    );
};

export default Filters;
