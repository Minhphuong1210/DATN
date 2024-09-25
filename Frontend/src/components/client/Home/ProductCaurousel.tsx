import React from 'react';
import { useProductPagination, useProductSwipe } from '../../../hook/useProductCarousel';
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from 'lucide-react';

// Thay thế bằng các import phù hợp

const ProductCarousel = ({ products }) => {
    const { currentProducts, handleNext, handlePrev } = useProductPagination(products);
    const swipeHandlers = useProductSwipe(handleNext, handlePrev);

    return (
        <div className="relative mt-9 ml-3.5 md:ml-4 lg:ml-3 ">
            <div
                className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:gap-7"
                {...swipeHandlers}
            >


                {currentProducts.map((product, index) => (
                    <div
                        className="group relative mb-4 h-[80vw] w-[45vw] ml-1 right-0 transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw] "
                        key={index}
                    >
                        <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                            <img
                                src={product.image}
                                alt={product.image}
                                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <a href={`productdetail/${product.id}/subcate/${product.sub_category_id}`} className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                    <Eye
                                        color="currentColor"
                                        strokeWidth="1.5"
                                        className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                    />
                                </a>
                                <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                    <ShoppingCart
                                        color="currentColor"
                                        strokeWidth="1.5"
                                        className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                    />
                                </div>
                                <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                    <Heart
                                        color="currentColor"
                                        strokeWidth="1.5"
                                        className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <a href={`productdetail/${product.id}/subcate/${product.sub_category_id}`} className="block overflow-hidden">
                            <div className="truncate text-center text-sm md:text-base lg:text-base xl:text-base hover:text-yellow-500">
                                {product.name}
                            </div>
                            <div className="text-center block">
                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                    399.000đ
                                </span>
                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                    {product.price}.000đ
                                </span>
                            </div>
                        </a>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default ProductCarousel;
