import axios, { AxiosError } from 'axios';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useLoading } from '../../../../context/Loading';
import { Product } from '../../../../interfaces/Product';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useColor } from '../../../../hook/Color';
import { useCart } from '../../../../context/Cart';
type ModalAddToCartProps = {
    isOpenModalAddToCart: boolean;
    closeModal: () => void;
    productId: { id: string; idSub: string } | null; // Hỗ trợ null
};

const ModalAddToCart = ({
    isOpenModalAddToCart,
    closeModal,
    productId = { id: '', idSub: '' },
}: ModalAddToCartProps) => {
    const { setLoading } = useLoading();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [product, setProduct] = useState<Product>();
    const { color, size } = useColor();
    const [size_id, setSizeId] = useState<{ id: string; name: string } | null>(null);
    const [color_id, setColorId] = useState<{ id: string; name: string } | null>(null);
    useEffect(() => {
        if (isOpenModalAddToCart) {
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpenModalAddToCart]);

    const incurement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const dercrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const getProductById = async (id: string, idSub: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/productDetai/${id}/subcate/${idSub}`);
            setProduct(response.data.Product);
            console.log(product);

        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId?.id && productId?.idSub) {
            getProductById(productId.id, productId.idSub);
        }
    }, [productId]);

    if (!isOpenModalAddToCart) {
        return null;
    }


    const handleSize = (id: string, name: string, isChecked: boolean) => {
        if (isChecked) {
            setSizeId({ id, name });
            console.log({ id, name });
        } else {
            setSizeId(null);
        }
    };

    const handleColor = (id: string, name: string, isChecked: boolean) => {
        if (isChecked) {
            setColorId({ id, name })
        } else {
            setColorId(null);
        }
    }
    const handleAddToCart = async (product: Product, color_id: string, size_id: string) => {
        try {
            await addToCart(product, color_id, size_id, quantity);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {product && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal} >
                    <div className={`bg-white  p-6  rounded shadow-lg text-center w-[600px] h-[330px] overflow-hidden  transform transition-all duration-700 ease-in-out ${isOpenModalAddToCart && isAnimating ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}  `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='absolute right-5 top-3'><button onClick={closeModal}><X /></button></div>

                        <div className='flex  gap-4 h-60 overflow-hidden mt-4 items-start  '>
                            <img src={product.imageUrl} className='w-40 h-full object-cover' alt="" />
                            <div>
                                <p className='text-[18px]'>{product.name}</p>
                                <div className='flex items-cente text-sm font-medium text-gray-700 mt-3'>
                                    <p>Size: </p>
                                    {size_id && (
                                        <p >
                                            {size_id.name}
                                        </p>
                                    )}
                                </div>

                                <div className='absolute mt-2 pb-8'>
                                    <div className='flex items-center gap-2'>
                                        {size.map((item) => (
                                            <label key={item.id} className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                    onChange={(e) => handleSize(item.id, item.name, e.target.checked)}
                                                    checked={size_id?.id === item.id}
                                                />
                                                <span className="uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    {item.name}
                                                </span>
                                            </label>
                                        ))}

                                    </div>
                                    <div className='flex items-cente text-sm font-medium text-gray-700 mt-3'>
                                        <p>Màu: </p>
                                        {color_id && (
                                            <p >
                                                {color_id.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className='flex items-center gap-2 mt-2'>
                                        {color.map((item) => (
                                            <div key={item.id}>
                                                <input
                                                    type="checkbox"
                                                    className=" focus:outline-none focus:ring-2   peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full"
                                                    onChange={(e) => handleColor(item.id, item.name, e.target.checked)}
                                                    checked={color_id?.id === item.id}
                                                    style={{
                                                        backgroundColor: item.color_code,

                                                    }}

                                                />
                                            </div>
                                        ))}

                                    </div>
                                    <Link className='hover:text-yellow-500 text-[14px] font-extralight ' to={`productdetail/${product.id}/subcate/${product.sub_category_id}`}>Xem chi tiết</ Link>
                                    <div className=" flex h-10  ">
                                        <button
                                            className="rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300"
                                            onClick={dercrement}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="w-16 appearance-none border-b border-t border-gray-300 text-center"
                                            style={{
                                                WebkitAppearance: "none",
                                                MozAppearance: "textfield",
                                            }}
                                        />
                                        <button
                                            className="mr-4 rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300"
                                            onClick={incurement}
                                        >
                                            +
                                        </button>
                                        <button onClick={() => handleAddToCart(product, size_id, color_id, quantity)} className="  rounded-sm bg-yellow-400 px-7  hover:bg-yellow-300 text-gray-800" >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

            )}
        </>
    )
}

export default ModalAddToCart