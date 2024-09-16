// ProductList.tsx
import React from 'react';

import { useProduct } from '../../hook/Product';

// const products: Product[] = [
//     {
//         id: '1',
//         name: 'Áo Thun',
//         price: 200000,
//         variants: {
//             sizes: ['S', 'M', 'L'],
//             colors: ['Đỏ', 'Xanh', 'Đen'],
//         },
//     },
//     {
//         id: '2',
//         name: 'Quần Jean',
//         price: 500000,
//         variants: {
//             sizes: ['S', 'M', 'L', 'XL'],
//             colors: ['Xám', 'Đen'],
//         },
//     },
// ];

const ProductList: React.FC = () => {
    const { productsHot } = useProduct();

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>we</th>
                        <th>we</th>
                    </tr>
                </thead>
                <tbody>
                    {productsHot.map((product, index) => (


                        <tr key={index}>

                            <td>{product.name}</td>

                            <td>
                                <button className='btn btn-danger'>Xóa</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div >
    );
};

export default ProductList;
