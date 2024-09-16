import React, { useEffect, useState } from "react";
import banner from "../../public/images/banner_collection_img.png";
import banner1 from "../../public/images/banner_ban_chay_87910a9bcfc24aa19b170faf82419694.webp";
import aopolo from "../../public/images/AoPolo.png";
import banner3 from "../../public/images/banner3.png";
import homefeed1 from "../../public/images/home_feedback_image_1.png";
import homefeed2 from "../../public/images/home_feedback_image_2.png";
import homefeed3 from "../../public/images/home_feedback_image_3.png";
import homefeed4 from "../../public/images/home_feedback_image_4.png";
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../../hook/Product";
const Home = () => {
    const { productsHots } = useProduct();
    const [startIndex, setStartIndex] = useState(0);
    const productsPerPage = 3;
    const autoScrollInterval = 5000;


    const currentProducts = productsHots.slice(startIndex, startIndex + productsPerPage);


    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, autoScrollInterval);


        return () => clearInterval(interval);
    }, [startIndex]);


    const handleNext = () => {
        setStartIndex(prevIndex => {

            if (prevIndex + productsPerPage >= productsHots.length) {
                return 0;
            } else {
                return prevIndex + productsPerPage;
            }
        });
    };

    const handlePrev = () => {
        setStartIndex(prevIndex => {
            if (prevIndex - productsPerPage < 0) {
                return productsHots.length - productsPerPage;
            } else {
                return prevIndex - productsPerPage;
            }
        });
    };
    return (
        <>
            <div>
                {/* BANNER  */}
                <div>
                    <img src={banner} alt="" />
                </div>
                {/* SP hot */}
                <div className="mx-[150px]">

                    <h1 className="mt-8 mb-4 text-center text-2xl">SẢN PHẨM HOT</h1>
                    <hr />
                    <div className="relative mt-9">

                        <div className="grid grid-cols-3 space-x-11 ml-4">
                            <div className="h-[450px] w-[600px] overflow-hidden col-span-1 bg-slate-500">
                                <img
                                    src={aopolo}
                                    alt=""
                                    className="h-full w-80 object-cover"
                                />
                            </div>
                            <button
                                onClick={handlePrev}
                                disabled={startIndex === 0}
                                className={`p-2 rounded-full absolute top-1/2 left-[350px] bg-gray-300  ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                            >
                                <ChevronLeft />
                            </button>
                            <div className="col-span-2 flex gap-40 transition-transform duration-500 ease-in-out" style={{
                                transform: `translateX(-${startIndex * (100 / productsPerPage)}%)`,
                            }}>
                                {currentProducts.map((productHot, index) => (
                                    <div className="group relative h-[350px] w-52" key={index}>
                                        <div className="mb-3 h-[400px] w-72 overflow-hidden bg-slate-200 p-2">
                                            <img
                                                src={aopolo}
                                                alt=""
                                                className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute bottom-[25px] left-20 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                    <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                                </div>
                                                <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                    <ShoppingCart
                                                        color="currentColor"
                                                        strokeWidth="1.5"
                                                        size={20}
                                                    />
                                                </div>
                                                <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                    <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={"#"} className="block">
                                            <div className="truncate hover:text-yellow-500">
                                                {productHot.name}
                                            </div>
                                            <div className="">
                                                <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                                    399.000đ
                                                </span>
                                                <span className="hover:text-yellow-500">{productHot.price}000đ</span>
                                            </div>
                                        </Link>
                                    </div>

                                ))}
                            </div>
                            <button
                                onClick={handleNext}

                                className={`p-2 rounded-full absolute top-1/2 right-[0px] bg-gray-300   'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                            >
                                <ChevronRight />
                            </button>
                            {/* <div className="group relative h-[350px] w-52">
                                <div className="mb-3 h-[400px] w-72 overflow-hidden bg-slate-200 p-2">
                                    <img
                                        src={aopolo}
                                        alt=""
                                        className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-[25px] left-20 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <ShoppingCart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                size={20}
                                            />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                        </div>
                                    </div>
                                </div>
                                <Link to={"#"} className="block">
                                    <div className="truncate hover:text-yellow-500">
                                        Áo Polo Trắng Cơ Bản Không Đường May Chống Nhăn 8APCT401TRK
                                    </div>
                                    <div className="">
                                        <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                            399.000đ
                                        </span>
                                        <span className="hover:text-yellow-500">199.000đ</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="group relative h-[350px] w-52">
                                <div className="mb-3 h-[400px] w-72 overflow-hidden bg-slate-200 p-2">
                                    <img
                                        src={aopolo}
                                        alt=""
                                        className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-[25px] left-20 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <ShoppingCart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                size={20}
                                            />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                        </div>
                                    </div>
                                </div>
                                <Link to={"#"} className="block">
                                    <div className="truncate hover:text-yellow-500">
                                        Áo Polo Trắng Cơ Bản Không Đường May Chống Nhăn 8APCT401TRK
                                    </div>
                                    <div className="">
                                        <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                            399.000đ
                                        </span>
                                        <span className="hover:text-yellow-500">199.000đ</span>
                                    </div>
                                </Link>
                            </div> */}
                        </div>
                    </div>


                </div>
                {/* Banner */}
                <div className="mt-20 h-96 overflow-hidden">
                    <img src={banner1} alt="" className="h-full w-full object-cover" />
                </div>
                {/* SP  */}
                <div className="mx-[150px] mt-12  ">
                    <div className="grid grid-cols-4 gap-20 ">

                        <div className="group relative w-72 h-[500px] ">
                            <div className="mb-3 h-[400px] w-72 overflow-hidden  p-2">
                                <img
                                    src={aopolo}
                                    alt=""
                                    className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute bottom-[40px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <ShoppingCart
                                            color="currentColor"
                                            strokeWidth="1.5"
                                            size={20}
                                        />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                </div>
                            </div>
                            <Link to={"#"} className="block">
                                <div className="truncate hover:text-yellow-500">
                                    Áo Polo Trắng Cơ Bản Không Đường May Chống Nhăn 8APCT401TRK
                                </div>
                                <div className="">
                                    <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                        399.000đ
                                    </span>
                                    <span className="hover:text-yellow-500">199.000đ</span>
                                </div>
                            </Link>
                        </div>
                        <div className="group relative w-72 h-[500px] ">
                            <div className="mb-3 h-[400px] w-72 overflow-hidden bg-slate-200 p-2">
                                <img
                                    src={aopolo}
                                    alt=""
                                    className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute bottom-[40px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <ShoppingCart
                                            color="currentColor"
                                            strokeWidth="1.5"
                                            size={20}
                                        />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                </div>
                            </div>
                            <Link to={"#"} className="block">
                                <div className="truncate hover:text-yellow-500">
                                    Áo Polo Trắng Cơ Bản Không Đường May Chống Nhăn 8APCT401TRK
                                </div>
                                <div className="">
                                    <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                        399.000đ
                                    </span>
                                    <span className="hover:text-yellow-500">199.000đ</span>
                                </div>
                            </Link>
                        </div>
                        <div className="group relative w-72 h-[500px] ">
                            <div className="mb-3 h-[400px] w-72 overflow-hidden bg-slate-200 p-2">
                                <img
                                    src={aopolo}
                                    alt=""
                                    className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute bottom-[40px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <ShoppingCart
                                            color="currentColor"
                                            strokeWidth="1.5"
                                            size={20}
                                        />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                </div>
                            </div>
                            <Link to={"#"} className="block">
                                <div className="truncate hover:text-yellow-500">
                                    Áo Polo Trắng Cơ Bản Không Đường May Chống Nhăn 8APCT401TRK
                                </div>
                                <div className="">
                                    <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                        399.000đ
                                    </span>
                                    <span className="hover:text-yellow-500">199.000đ</span>
                                </div>
                            </Link>
                        </div>
                        <div className="group relative w-72 h-[500px] ">
                            <div className="mb-3 h-[400px] w-72 overflow-hidden bg-slate-200 p-2">
                                <img
                                    src={aopolo}
                                    alt=""
                                    className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute bottom-[40px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <ShoppingCart
                                            color="currentColor"
                                            strokeWidth="1.5"
                                            size={20}
                                        />
                                    </div>
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Heart color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                </div>
                            </div>
                            <Link to={"#"} className="block">
                                <div className="truncate hover:text-yellow-500">
                                    Áo Polo Trắng Cơ Bản Không Đường May Chống Nhăn 8APCT401TRK
                                </div>
                                <div className="">
                                    <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                        399.000đ
                                    </span>
                                    <span className="hover:text-yellow-500">199.000đ</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="mx-[150px] mt-16 flex justify-center gap-4">
                    <div className="h-[600px] w-[600px]">
                        <img src={banner3} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="grid h-[600px] w-[600px] grid-cols-2 grid-rows-2 gap-4">
                        <div>
                            <img src={homefeed1} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <img src={homefeed2} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <img src={homefeed3} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <img src={homefeed4} alt="" className="h-full w-full object-cover" />
                        </div>
                    </div>
                </div>

            </div >
        </>
    );
};

export default Home;
