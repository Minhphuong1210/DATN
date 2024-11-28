import React, { useEffect, useState } from 'react'
type ModalCartProps = {
    isOpenModalCart: boolean;
    handleMouseEnterCart: (data: any) => void;
    handleMouseLeaveCart: (data: any) => void;
}
const ModalCart = ({ isOpenModalCart, handleMouseEnterCart, handleMouseLeaveCart }: ModalCartProps) => {
    const [isAnimaton, setIsAnimaton] = useState(false)

    useEffect(() => {
        if (isOpenModalCart) {
            setTimeout((() => {
                setIsAnimaton(true)
            }), 100)
        } else {
            setIsAnimaton(false)
        }
    }, [isOpenModalCart])

    const [quantity, setQuantity] = useState<number>(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    return (
        <div className=' fixed right-0   top-[103px]   '
            onMouseEnter={handleMouseEnterCart} onMouseLeave={handleMouseLeaveCart}>
            <div className={`transform transition-all bg-white duration-700 overflow-hidden ease-in-out w-96 h-[650px] rounded p-2 
                ${isOpenModalCart && isAnimaton ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} 
                flex flex-col shadow-xl border border-gray-400`}>
                <h1 className='text-center text-lg'>Giỏ hàng</h1>
                {/* Progress Bar */}
                <hr className='' />

                {/* Product Information */}
                <div className=" mt-6 overflow-y-scroll scrollable-content h-[450px]">
                    <div className='flex mb-3'>
                        <img src="http://127.0.0.1:8000/storage/uploads/products/Hz1ozzyyZwIxR5FzWRKzXISDdTEh1dwRImADVCtu.png" alt="Product" className="w-20 h-24 object-cover" />
                        <div className="ml-4 text-[13px]">
                            <p className="">COURTSIDE PICKLEBALL PADDLE COVER</p>
                            <span className="text-gray-500 mr-1">Màu: Trắng, </span>
                            <span className="text-gray-500 mr-1">Size: S,</span>
                            <span className="text-gray-500 mr-1">Sl: S</span>
                            <p className="mt-2 ">549.000đ</p>
                            <div className="flex items-center mt-2">
                                <button onClick={handleDecrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">-</button>
                                <span className="mx-4">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">+</button>
                            </div>
                            <hr className='  mt-2' />
                        </div>

                    </div>
                    <div className='flex mb-3'>
                        <img src="http://127.0.0.1:8000/storage/uploads/products/Hz1ozzyyZwIxR5FzWRKzXISDdTEh1dwRImADVCtu.png" alt="Product" className="w-20 h-24 object-cover" />
                        <div className="ml-4 text-[13px]">
                            <p className="">COURTSIDE PICKLEBALL PADDLE COVER</p>
                            <span className="text-gray-500 mr-1">Màu: Trắng, </span>
                            <span className="text-gray-500 mr-1">Size: S,</span>
                            <span className="text-gray-500 mr-1">Sl: S</span>
                            <p className="mt-2 ">549.000đ</p>
                            <div className="flex items-center mt-2">
                                <button onClick={handleDecrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">-</button>
                                <span className="mx-4">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">+</button>
                            </div>

                        </div>
                    </div>
                    <div className='flex mb-3'>
                        <img src="http://127.0.0.1:8000/storage/uploads/products/Hz1ozzyyZwIxR5FzWRKzXISDdTEh1dwRImADVCtu.png" alt="Product" className="w-20 h-24 object-cover" />
                        <div className="ml-4 text-[13px]">
                            <p className="">COURTSIDE PICKLEBALL PADDLE COVER</p>
                            <span className="text-gray-500 mr-1">Màu: Trắng, </span>
                            <span className="text-gray-500 mr-1">Size: S,</span>
                            <span className="text-gray-500 mr-1">Sl: S</span>
                            <p className="mt-2 ">549.000đ</p>
                            <div className="flex items-center mt-2">
                                <button onClick={handleDecrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">-</button>
                                <span className="mx-4">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">+</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex mb-3'>
                        <img src="http://127.0.0.1:8000/storage/uploads/products/Hz1ozzyyZwIxR5FzWRKzXISDdTEh1dwRImADVCtu.png" alt="Product" className="w-20 h-24 object-cover" />
                        <div className="ml-4 text-[13px]">
                            <p className="">COURTSIDE PICKLEBALL PADDLE COVER</p>
                            <span className="text-gray-500 mr-1">Màu: Trắng, </span>
                            <span className="text-gray-500 mr-1">Size: S,</span>
                            <span className="text-gray-500 mr-1">Sl: S</span>
                            <p className="mt-2 ">549.000đ</p>
                            <div className="flex items-center mt-2">
                                <button onClick={handleDecrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">-</button>
                                <span className="mx-4">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">+</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex mb-3'>
                        <img src="http://127.0.0.1:8000/storage/uploads/products/Hz1ozzyyZwIxR5FzWRKzXISDdTEh1dwRImADVCtu.png" alt="Product" className="w-20 h-24 object-cover" />
                        <div className="ml-4 text-[13px]">
                            <p className="">COURTSIDE PICKLEBALL PADDLE COVER</p>
                            <span className="text-gray-500 mr-1">Màu: Trắng, </span>
                            <span className="text-gray-500 mr-1">Size: S,</span>
                            <span className="text-gray-500 mr-1">Sl: S</span>
                            <p className="mt-2 ">549.000đ</p>
                            <div className="flex items-center mt-2">
                                <button onClick={handleDecrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">-</button>
                                <span className="mx-4">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">+</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex mb-3'>
                        <img src="http://127.0.0.1:8000/storage/uploads/products/Hz1ozzyyZwIxR5FzWRKzXISDdTEh1dwRImADVCtu.png" alt="Product" className="w-20 h-24 object-cover" />
                        <div className="ml-4 text-[13px]">
                            <p className="">COURTSIDE PICKLEBALL PADDLE COVER</p>
                            <span className="text-gray-500 mr-1">Màu: Trắng, </span>
                            <span className="text-gray-500 mr-1">Size: S,</span>
                            <span className="text-gray-500 mr-1">Sl: S</span>
                            <p className="mt-2 ">549.000đ</p>
                            <div className="flex items-center mt-2">
                                <button onClick={handleDecrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">-</button>
                                <span className="mx-4">{quantity}</span>
                                <button onClick={handleIncrease} className="bg-gray-200 px-[4px] py-[2px] rounded-full">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto flex justify-around items-center">
                    <p className="">Tổng giá: 549.000đ</p>
                    <div className="flex space-x-2">
                        {/* <button className="bg-black text-white py-2 px-4 rounded-full">Thủ tục thanh toán</button> */}
                        <button className="bg-yellow-400 hover:bg-yellow-500 py-2 text-sm px-2 rounded">Xem giỏ hàng</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ModalCart