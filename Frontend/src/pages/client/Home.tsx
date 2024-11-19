import React, { useEffect, useState } from "react";
import banner from "../../public/images/banner_collection_img.png";
import banner1 from "../../public/images/banner_ban_chay_87910a9bcfc24aa19b170faf82419694.webp";
import banner3 from "../../public/images/banner3.png";
import homefeed1 from "../../public/images/home_feedback_image_1.png";
import homefeed2 from "../../public/images/home_feedback_image_2.png";
import homefeed3 from "../../public/images/home_feedback_image_3.png";
import homefeed4 from "../../public/images/home_feedback_image_4.png";

import { useProduct } from "../../hook/Product";


import ProductCarousel from "../../components/client/Home/ProductCaurousel";

const Home = () => {
    const { productsHots, productsSale } = useProduct();

    return (
        <>
            <div className="   overflow-hidden">
                {/* BANNER  */}
                <div>
                    <img src={banner} alt="" />
                </div>
                {/* SP hot */}
                <div className="lg:mx-[150px]">
                    <h1 className="mb-4 mt-8 text-center text-2xl">SẢN PHẨM HOT</h1>
                    <hr />
                    <ProductCarousel productsHot={productsHots} />
                </div>
                {/* Banner */}
                <div className="mb-10 h-96 overflow-hidden" >
                    <img src={banner1} alt="" className="h-full w-full object-cover" />
                </div >
                {/* SP SALE */}
                <div className=" lg:mx-[150px] ">
                    <h1 className="mb-4 mt-8 text-center text-2xl">SẢN PHẨM KHUYẾN MÃI</h1>
                    <hr />
                    <ProductCarousel productsHot={productsSale} />
                </div >
                <div className="mx-[150px] mt-16 flex justify-center gap-4">
                    <div className="h-[600px] w-[600px]">
                        <img src={banner3} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="grid h-[600px] w-[600px] grid-cols-2 grid-rows-2 gap-4">
                        <div>
                            <img
                                src={homefeed1}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={homefeed2}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={homefeed3}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={homefeed4}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Home;
