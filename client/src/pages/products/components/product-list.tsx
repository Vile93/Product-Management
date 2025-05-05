import { FC } from 'react';
import { IProduct } from '../../../../../shared/types/product.interface';
import Product from './product';

interface ProductListProps {
    products: IProduct[];
    setSelectedProduct: (product: IProduct) => void;
    setIsOpenUpdateModal: (isOpen: boolean) => void;
}

const ProductList: FC<ProductListProps> = ({ products, setSelectedProduct, setIsOpenUpdateModal }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Count
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        setSelectedProduct={setSelectedProduct}
                        setIsOpenUpdateModal={setIsOpenUpdateModal}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
