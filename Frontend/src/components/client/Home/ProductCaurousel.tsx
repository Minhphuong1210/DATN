import React from 'react';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../../interfaces/Product';
import '../../../css/ProductCarousel.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductCarouselProps {
    productsHot?: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ productsHot = [] }) => {
    const settings = {
        dots: true,
        infinite: productsHot.length > 1,
        speed: 500,
        slidesToShow: productsHot.length > 1 ? 4 : 4, // Luôn hiển thị 4 vị trí dù có 1 sản phẩm
        slidesToScroll: 1,
        autoplay: productsHot.length > 1,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // Khi màn hình nhỏ hơn 1024px (tablet)
                settings: {
                    slidesToShow: productsHot.length > 1 ? 3 : 3, // Hiển thị 3 sản phẩm trên tablet
                },
            },
            {
                breakpoint: 768, // Khi màn hình nhỏ hơn 768px (mobile)
                settings: {
                    slidesToShow: 2, // Hiển thị 2 sản phẩm trên điện thoại
                },
            },
        ],
    };
    console.log(productsHot

    );


    return (
        <div className="relative mb-14  ">
            <div className="">
                {productsHot.length > 1 ? (

                    <Slider {...settings}>
                        {productsHot.map((product) => (
                            <div
                                className="group relative h-[80vw] w-[45vw] md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw] p-2  "
                                key={product.id}
                            >
                                <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                    <img
                                        src={product.image}
                                        alt={product.image}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                    <div className='absolute top-0 right-0 my-3 mx-3 py-1 px-2 rounded-md bg-red-500 text-white sale-badge'>100%</div>
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
                    </Slider>
                ) : (
                    // Nếu chỉ có 1 sản PHẨM
                    <div className='flex'>
                        <div className="group relative mb-4 h-[80vw] w-[45vw] md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw] p-2 mx-auto ">
                            <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                <img
                                    src={productsHot[0]?.image}
                                    alt={productsHot[0]?.image}
                                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                                <div className="absolute top-0 right-0 my-2 mx-1 py-1 px-2 rounded-md bg-red-500 text-white sale-badge">100%</div>
                            </div>
                            <div className="relative">
                                <div className="absolute bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <a href={`productdetail/${productsHot[0]?.id}/subcate/${productsHot[0]?.sub_category_id}`} className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
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
                            <a href={`productdetail/${productsHot[0]?.id}/subcate/${productsHot[0]?.sub_category_id}`} className="block overflow-hidden">
                                <div className="truncate text-center text-sm md:text-base lg:text-base xl:text-base hover:text-yellow-500">
                                    {productsHot[0]?.name}
                                </div>
                                <div className="text-center block">
                                    <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                        399.000đ
                                    </span>
                                    <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                        {productsHot[0]?.price}.000đ
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className='w-1/4'></div>
                        <div className='w-1/4'></div>
                        <div className='w-1/4'></div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductCarousel;
