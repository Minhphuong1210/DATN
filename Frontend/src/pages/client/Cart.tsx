import React from "react";

import axios from "axios";
import { useCarts } from "../../hook/Cart";


const Cart = () => {
    const { productCart } = useCarts();

    const updateQuantityInDB = async (id: number, quantity: number) => {
        try {
            await axios.put(`/api/cart/${id}`, { quantity });
            // Xử lý thông báo thành công nếu cần
        } catch (error) {
            console.error("Failed to update quantity", error);
        }
    };

    const increaseQuantity = (item: any) => {
        const newQuantity = item.quantity + 1;
        updateQuantityInDB(item.id, newQuantity); // Sử dụng item.id
        // Cập nhật giỏ hàng cục bộ nếu cần
    };

    const decreaseQuantity = (item: any) => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateQuantityInDB(item.id, newQuantity); // Sử dụng item.id
            // Cập nhật giỏ hàng cục bộ nếu cần
        }
    };

    const totalCartPrice = productCart.reduce(
        (acc, item) => acc + item.PriceProduct * item.quantity,
        0
    );

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {productCart && productCart.length > 0 && productCart.map((item, index) => {
                                const totalPrice = item.PriceProduct * item.quantity;
                                console.log(productCart);

                                return (
                                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <a href="#" className="shrink-0 md:order-1">
                                                <img className="h-20 w-20 dark:hidden" src={item.ImageProduct} alt="product image" />
                                                <img className="hidden h-20 w-20 dark:block" src={item.ImageProduct} alt="product image" />
                                            </a>
                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="flex items-center">
                                                    <button onClick={() => decreaseQuantity(item)} type="button" className="inline-flex h-5 w-5 items-center justify-center border rounded-md bg-gray-100 hover:bg-gray-200">
                                                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input type="text" className="w-10 text-center" value={item.quantity} readOnly />
                                                    <button onClick={() => increaseQuantity(item)} type="button" className="inline-flex h-5 w-5 items-center justify-center border rounded-md bg-gray-100 hover:bg-gray-200">
                                                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">{item.PriceProduct} đ</p>
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">{totalPrice} đ</p>
                                                </div>
                                            </div>
                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.NameProduct}</a>
                                                <div>Size: {item.sizeName}, Màu: {item.colorName}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                            <div className="space-y-4">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">{totalCartPrice} đ</dd>

                                </dl>
                                <div className="flex justify-center">
                                    <button className="py-3 px-5 bg-yellow-400 rounded-md">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
