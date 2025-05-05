import { FC } from 'react';
import { IProduct } from '../../../../../shared/types/product.interface';

interface ProductProps {
    product: IProduct;
    setSelectedProduct: (product: IProduct) => void;
    setIsOpenUpdateModal: (isOpen: boolean) => void;
}

const Product: FC<ProductProps> = ({ product, setSelectedProduct, setIsOpenUpdateModal }) => {
    return (
        <>
            <tr
                className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                    setSelectedProduct(product);
                    setIsOpenUpdateModal(true);
                }}
            >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.count}</td>
                <td className="px-6 py-4">{product.category}</td>
            </tr>
        </>
    );
};

export default Product;
