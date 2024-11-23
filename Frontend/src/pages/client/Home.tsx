import React, { useEffect, useState } from "react";

import homefeed2 from "../../public/images/CV1_720x.webp";
import homefeed3 from "../../public/images/CV2_720x.webp";
import homefeed4 from "../../public/images/CV3_720x.webp";
import { useProduct } from "../../hook/Product";
import ProductCarousel from "../../components/client/Home/ProductCaurousel";
import { useBanner } from "../../hook/useBanner";
import Slider from "react-slick";
import ListCategory from "../../components/client/Home/Category/ListCategory";
import { Flame, ZapIcon } from "lucide-react";

const Home = () => {
    const { productsHots, productsSale, expiresTimeProducts } = useProduct();
    const { banner } = useBanner()
    const timeSale = expiresTimeProducts;
    const [remainingTime, setRemainingTime] = useState<{ hours: number, minutes: number, seconds: number }>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    useEffect(() => {
        const expires_time = new Date(timeSale)
        const updateRemaningTime = () => {
            const currentTime = new Date();
            const timeDifference = expires_time.getTime() - currentTime.getTime();

            if (timeDifference <= 0) {
                setRemainingTime({ hours: 0, minutes: 0, seconds: 0 }); // Nếu thời gian hết hạn, đặt về 0
                console.log("Thời gian đã hết!");
            } else {
                const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setRemainingTime({ hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft });
            }
        };


        const timer = setInterval(updateRemaningTime, 1000);


        return () => clearInterval(timer);
    }, [timeSale])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arow: true
    };



    return (
        <>
            <div className="   overflow-hidden mt-5">
                {/* BANNER  */}
                <Slider {...settings}>
                    {banner.map((item) => (
                        <div key={item.id} >
                            <img
                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                alt="banner"
                                className="w-full h-[600px] object-cover"
                            />
                        </div >
                    ))}
                </Slider>

                {/* SP hot */}
                <div className="lg:mx-[150px] mt-14">
                    <h1 className="mb-4 mt-8 text-center text-2xl flex justify-center items-center">SẢN PHẨM HOT<Flame className="fill-red-600" fill="currentColor" strokeWidth={1} color="#ff0000" size={30} /></h1>
                    <hr />
                    <ProductCarousel productsHot={productsHots} />
                </div>
                {/* CATEGOTY */}
                <div>
                    <h1 className='text-2xl text-center mb-3'>Danh mục sản phẩm</h1>
                    <hr className="mb-5 mx-[150px]" />
                    <ListCategory />
                </div>

                {/* SP SALE */}
                <div className=" lg:mx-[150px] bg-[#fcb017c5] ">
                    <div className="flex justify-center gap-4 p-4 bg-white  ">
                        {/* Banner 1 */}
                        <div className="flex items-center border-2 border-black rounded-md overflow-hidden">
                            <div className="flex items-center justify-center 22 bg-gray-200">
                                <div className="text-red-500 font-bold text-3xl">%</div>
                            </div>
                            <div className="flex flex-col items-start justify-center p-4">
                                <p className="text-lg font-bold text-red-500">GIẢM ĐẾN</p>
                                <p className="text-2xl font-bold text-black">200K →</p>
                            </div>
                        </div>

                        {/* Banner 2 */}
                        <div className="flex items-center border-2 border-black rounded-md overflow-hidden">
                            <div className="flex items-center justify-center  bg-gray-200">
                                <div className="text-red-500 font-bold text-lg">FREE</div>
                            </div>
                            <div className="flex flex-col items-start justify-center p-4">
                                <p className="text-lg font-bold text-black">MIỄN PHÍ VẬN CHUYỂN</p>
                                <p className="text-sm text-gray-500">ĐƠN HÀNG TỪ 498K →</p>
                            </div>
                        </div>

                        {/* Banner 3 */}
                        <div className="flex items-center border-2 border-black rounded-md overflow-hidden">
                            <div className="flex items-center justify-center  bg-gray-200">
                                <div className="text-red-500 font-bold text-3xl">📦</div>
                            </div>
                            <div className="flex flex-col items-start justify-center p-4">
                                <p className="text-lg font-bold text-red-500">ĐỔI TRẢ</p>
                                <p className="text-2xl font-bold text-black">15 NGÀY →</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mt-4" >
                        <div className="col-span-1"></div>
                        <div className="col-span-2">
                            <h1 className="mb-4  text-center text-2xl ">SẢN PHẨM SALE </h1>
                            <p className=" text-center text-xl flex justify-center items-center ">Săn ưu đãi hot <ZapIcon className="fill-red-600" fill="currentColor" strokeWidth={1} color="#ff0000" size={30} /></p>
                        </div>
                        <div className="flex items-center justify-center col-span-1 ">
                            <p className="text-lg font-semibold text-black mr-4">Kết thúc sau</p>
                            <div className="flex gap-2">
                                <div className="bg-red-500 text-white font-bold px-3 py-2 rounded-md">
                                    {remainingTime.hours.toString().padStart(2, '0')}
                                </div>
                                <span className="font-bold text-black">:</span>
                                <div className="bg-red-500 text-white font-bold px-3 py-2 rounded-md">
                                    {remainingTime.minutes.toString().padStart(2, '0')}:
                                </div>
                                <span className="font-bold text-black">:</span>
                                <div className="bg-red-500 text-white font-bold px-3 py-2 rounded-md">
                                    {remainingTime.seconds.toString().padStart(2, '0')}
                                </div>
                            </div>

                        </div>
                    </div>
                    <ProductCarousel productsHot={productsSale} />
                </div >

                <div className=" flex justify-center gap-4">
                    <div className="flex flex-col items-start gap-7">
                        <img
                            src={homefeed2}
                            alt=""
                            className="w-[608px] h-[405px] object-cover"
                        />

                        <div className="w-[608px] h-[476px] bg-gray-100 flex items-center flex-col justify-center px-4 ">
                            <p className="pb-2">
                                COURTSIDE COLLECTION
                                Với 3 màu sắc chủ đạo, Jade Green mang tinh thần thể thao, Cinnamon Brown của sự tinh tế và Midnight Black của sự thanh lịch
                            </p>
                            <button> MUA NGAY</button>
                        </div>


                    </div>

                    <div>
                        <img
                            src={homefeed3}
                            alt=""
                            className="w-[608px] h-[911px] object-cover"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-7">
                        <div className="w-[608px] h-[476px] bg-gray-100 flex items-center flex-col justify-center px-4 ">
                            <p className="pb-2">
                                COURTSIDE COLLECTION
                                Với 3 màu sắc chủ đạo, Jade Green mang tinh thần thể thao, Cinnamon Brown của sự tinh tế và Midnight Black của sự thanh lịch
                            </p>
                            <button> MUA NGAY</button>
                        </div>
                        <div className="w-[608px] h-[405px]">
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
