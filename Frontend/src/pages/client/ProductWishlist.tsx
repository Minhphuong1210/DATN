import React, { useEffect, useRef } from "react";
import useFavorites from "../../hook/useFavorites";
import { Product } from "../../interfaces/Product";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Heart,
    ShoppingCart,
} from "lucide-react";

type Props = {};

const ProductWishlist: React.FC<Props> = () => {
    const { favorites } = useFavorites();
    const lastProductRef = useRef<HTMLDivElement | null>(null); // Tạo ref cho sản phẩm cuối

    useEffect(() => {
        if (favorites.length >= 4) {
            lastProductRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [favorites]); // Mỗi khi danh sách favorites thay đổi, thực hiện kiểm tra

    return (
        <>
            <h1 className="text-center text-xl font-bold">Sản phẩm yêu thích</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[1300px] mx-auto">
                    {favorites.map((product: Product, index) => (
                        <div
                            key={index}
                            ref={index === favorites.length - 1 ? lastProductRef : null} // Gắn ref vào sản phẩm cuối
                            className="flex "
                        >
                            <div className="group relative mx-auto mb-4 h-[80vw] w-[45vw] p-2 md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw]">
                                <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out ">
                                    <img
                                        src={product.product.image}
                                        alt={product.product.name}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                    <div className="sale-badge absolute right-0 top-0 mx-1 my-2 rounded-md bg-red-500 px-2 py-1 text-white">
                                        100%
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-[30px] left-0 right-0 z-10 flex justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <a
                                             href={`productdetail/${product.product.id}/subcate/${product.product.sub_category_id}`}
                                            className="rounded-full bg-white p-2 hover:bg-black hover:text-white"
                                        >
                                            <Eye
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                                            />
                                        </a>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <ShoppingCart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                                            />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Heart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={`productdetail/${product.product.id}/subcate/${product.product.sub_category_id}`}
                                    className="block overflow-hidden"
                                >
                                    <div className="truncate text-center text-sm hover:text-yellow-500 md:text-base lg:text-base xl:text-base">
                                        {product.product.name}
                                    </div>
                                    <div className="block text-center">
                                        <span className="mr-1 text-xs text-gray-500 line-through hover:text-yellow-500 md:text-sm lg:text-base xl:text-base">
                                            399.000đ
                                        </span>
                                        <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                            {product.product.price}.000đ
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-6 text-center">
                    <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                </div>
            )}
            <div className="text-center">
                <div className="mt-4 flex justify-center">
                    {/* Nút Previous */}
                    <button className="mx-2 rounded-md border-2 p-1 text-gray-700 hover:bg-yellow-300">
                        <ChevronLeft strokeWidth={0.5} />
                    </button>

                    {/* Số trang */}
                    <button className="mx-1 rounded-md border-2 px-3 py-1 text-gray-700 hover:bg-yellow-100">
                        1
                    </button>

                    {/* Nút Next */}
                    <button className="mx-2 rounded-md border-2 p-1 text-gray-700 hover:bg-yellow-300">
                        <ChevronRight strokeWidth={0.5} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductWishlist;
