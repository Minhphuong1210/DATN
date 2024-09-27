// ProductList.tsx
import React from 'react';

import { useProduct } from '../../hook/Product';


const ProductList: React.FC = () => {
    const { productsHots } = useProduct();

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
                    {productsHots.map((product, index) => (


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
