import React, { useState } from "react";
import { useCarts } from "../../hook/Cart";
import { useQuantity } from "../../hook/useCartQuantity";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, PackageX } from "lucide-react";

const Cart = () => {
    const { productCart, setProductCart, handleRemoveCart } = useCarts();
    const { increaseQuantity, decreaseQuantity } = useQuantity();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productCart.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalCartPrice = productCart.reduce(
        (acc, item) => acc + item.PriceProduct * item.quantity,
        0
    );
    const totalPages = Math.ceil(productCart.length / productsPerPage);
    return (
        <section className="bg-white py-8 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Giỏ hàng của bạn</h2>

                {productCart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="mt-6 flex flex-col items-center">
                            <PackageX size={200} strokeWidth="0.1" className="opacity-50" />
                            <span className="text-gray-500">Không có sản phẩm nào trong giỏ hàng.</span><Link to="/" className="hover:text-yellow-500 text-xl mt-2">Tiếp tục mua sắm.</Link>
                        </div>
                    </div>


                ) : (
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {currentProducts.map((item) => {
                                    const totalPrice = item.PriceProduct * item.quantity;

                                    return (
                                        <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <img className="h-20 w-20 dark:hidden" src={item.ImageProduct} alt="product image" />
                                                    <img className="hidden h-20 w-20 dark:block" src={item.ImageProduct} alt="product image" />
                                                </a>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <button onClick={() => decreaseQuantity(item, setProductCart)} type="button" className="inline-flex h-5 w-5 items-center justify-center border rounded-md bg-gray-100 hover:bg-gray-200">
                                                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <input type="text" className="w-10 text-center" value={item.quantity} readOnly />
                                                        <button onClick={() => increaseQuantity(item, setProductCart)} type="button" className="inline-flex h-5 w-5 items-center justify-center border rounded-md bg-gray-100 hover:bg-gray-200">
                                                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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

                                                    <div className="flex items-center gap-4">
                                                        <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                            </svg>
                                                            Add to Favorites
                                                        </button>
                                                        <button onClick={() => handleRemoveCart(item.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center mt-4 ">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="mx-2 p-1 border-2 text-gray-700 rounded-md hover:bg-yellow-300"
                                >
                                    <ChevronLeft strokeWidth={0.5} />
                                </button>
                                <span className="p-2 opacity-60">{` ${currentPage} / ${totalPages}`}</span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="mx-2 p-1  border-2 text-gray-700 rounded-md hover:bg-yellow-300"
                                >
                                    <ChevronRight strokeWidth={0.5} />
                                </button>
                            </div>
                        </div>
                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <p className="text-xl font-semibold text-gray-900">Tổng đơn hàng</p>
                                <div className="space-y-4">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-bold text-gray-900">Giá</dt>
                                        <dd className="text-base font-bold text-gray-900">{totalCartPrice} đ</dd>
                                    </dl>
                                    <div className="flex justify-center">
                                        <Link to={'/checkout'} className="py-3 px-5 bg-yellow-400 hover:bg-yellow-300 rounded-md">Đặt hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
