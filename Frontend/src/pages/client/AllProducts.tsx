
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import '../../css/AllProduct.css'
import { useFilterProducts } from '../../hook/UseFilterProduct';

interface PriceRange {
    min: number;
    max: number;
}
const AllProducts = () => {

    const [priceRange, setPriceRange] = useState<PriceRange | null>(null);

    const { filterProductsPrice } = useFilterProducts(priceRange);
    const [sortOrder, setSortOrder] = useState<string>(""); // trạng thái sắp xếp

    // Hàm xử lý khi người dùng chọn khoảng giá
    const handlePriceChange = (min: number, max: number, isChecked: boolean) => {
        if (isChecked) {
            // Cập nhật khoảng giá đã chọn
            setPriceRange({ min, max });
        } else {
            // Bỏ chọn sẽ đặt `selectedPriceRange` về null
            setPriceRange(null);
        }
    };
    const handleClearFilter = () => {
        setPriceRange(null); // Đặt priceRange về null
    };
    // Hàm lấy sản phẩm sau khi lọc và sắp xếp
    const getFilteredAndSortedProducts = () => {
        const products = [...filterProductsPrice];

        if (sortOrder === "lowToHigh") {
            products.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
            products.sort((a, b) => b.price - a.price);
        }

        return products;
    };
    const [isOpenSex, setIsOpenSex] = useState(false);
    const [isOpenShirt, setIsOpenShirt] = useState(false);
    const [isOpenTrousers, setIsOpenTrousers] = useState(false);
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArrange, setIsOpenArrange] = useState(false);


    const toggleCollapseSex = () => {
        setIsOpenSex(!isOpenSex);
    };
    const toggleCollapseShirt = () => {
        setIsOpenShirt(!isOpenShirt);
    };
    const toggleCollapseTrousers = () => {
        setIsOpenTrousers(!isOpenTrousers);
    };
    const toggleCollapsePrice = () => {
        setIsOpenPrice(!isOpenPrice);
    };
    const toggleCollapseArrange = () => {
        setIsOpenArrange(!isOpenArrange);
    };




    return (
        <>


            <div className='mx-[200px]'>
                <div className="sticky top-24 z-30">
                    <div className="mb-5  text-gray-400">
                        <a href="/" className="focus:outline-none hover:underline text-gray-500">Trang chủ</a> / <span className="text-gray-600">Checkout</span>
                    </div>
                </div>
                <div className='flex '>
                    {/* BỘ LỌC */}
                    <div className='mr-20'>
                        <div className=' h-[700px]  overflow-y-scroll  scrollable-content'>
                            <div className='text-2xl mt-5'>Bộ lọc</div>
                            <div className="w-64">
                                {/* Header Collapse */}
                                <div
                                    className="  p-4 cursor-pointer flex items-center"
                                    onClick={toggleCollapseSex}
                                >
                                    <h2 className="text-base mr-2 ">Giới tính</h2><ChevronDown size={17} strokeWidth={1.5} />
                                </div>

                                {/* Nội dung Collapse */}
                                <div
                                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenSex ? 'max-h-40' : 'max-h-0'
                                        }`}
                                >
                                    <div className="p-4">
                                        <form>
                                            <label className="block mb-2">
                                                <input
                                                    type="checkbox"
                                                    value="option1"
                                                    className="mr-2  "
                                                />

                                                Nam
                                            </label>
                                            <label className="block mb-2">
                                                <input
                                                    type="checkbox"
                                                    value="option2"
                                                    // checked={selectedOptions.includes('option2')}
                                                    // onChange={handleCheckboxChange}
                                                    className="mr-2"
                                                />
                                                Nữ
                                            </label>

                                        </form>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div
                                        className="  p-4 cursor-pointer flex items-center"
                                        onClick={toggleCollapseShirt}
                                    >
                                        <h2 className="text-base mr-2">Áo</h2><ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenShirt ? 'max-h-40' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4">
                                            <form>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option1"

                                                        className="mr-2"
                                                    />
                                                    Áo Polo
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"

                                                        className="mr-2"
                                                    />
                                                    Áo sơ mi
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"

                                                        className="mr-2"
                                                    />
                                                    Áo phông
                                                </label>

                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <hr className=' bg-black' />

                                <div>
                                    <div
                                        className=" text-black p-4 cursor-pointer flex items-center"
                                        onClick={toggleCollapseTrousers}
                                    >
                                        <h2 className="text-base mr-2 ">Quần</h2> <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenTrousers ? 'max-h-40' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4 ">
                                            <form>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option1"

                                                        className="mr-2"
                                                    />
                                                    Quần Polo
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"

                                                        className="mr-2"
                                                    />
                                                    Quần sơ mi
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"

                                                        className="mr-2"
                                                    />
                                                    Quần phông
                                                </label>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div
                                        className=" text-black p-4 cursor-pointer flex items-center"
                                        onClick={toggleCollapsePrice}
                                    >
                                        <h2 className="text-base mr-2 ">Khoảng giá</h2> <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenPrice ? 'max-h-40' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4 ">
                                            <form>
                                                <label className="block mb-2">
                                                    <input
                                                        type="radio"
                                                        name="price-range"
                                                        className="mr-2"
                                                        onChange={(e) => handlePriceChange(150000, 350000, e.target.checked)}
                                                        checked={priceRange?.min === 150000 && priceRange?.max === 350000}
                                                    />
                                                    Từ 150.000 - 350.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="radio"
                                                        name="price-range"
                                                        className="mr-2"
                                                        onChange={(e) => handlePriceChange(350000, 550000, e.target.checked)}
                                                        checked={priceRange?.min === 350000 && priceRange?.max === 550000}
                                                    />
                                                    Từ 350.000 - 550.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="radio"
                                                        name="price-range"
                                                        className="mr-2"
                                                        onChange={(e) => handlePriceChange(550000, Number.MAX_SAFE_INTEGER, e.target.checked)}
                                                        checked={priceRange?.min === 550000 && priceRange?.max === Number.MAX_SAFE_INTEGER}
                                                    />
                                                    Trên 550.000
                                                </label>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="mb-2 mt-3 text-sm">
                                    <span>Màu Sắc: </span>
                                    <div className="mt-2 flex space-x-2">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="radio"
                                                    className=" focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full"
                                                />
                                            </label>

                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="radio"
                                                    className=" focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full bg-black"
                                                />
                                            </label>

                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="radio"
                                                    className=" focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full bg-yellow-400"
                                                />
                                            </label>

                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="radio"
                                                    className=" focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full bg-blue-500"
                                                />
                                            </label>

                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="radio"
                                                    className=" focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full bg-red-500"
                                                />
                                            </label>

                                        </div>

                                    </div>
                                </div>


                                <div className='mt-4 '>
                                    <h2 className='mb-2'>Kích Thước</h2>
                                    <div className="inline-flex items-center ">
                                        <div className="flex space-x-2 mr-2">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"

                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                />
                                                <span className=" uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    S
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex space-x-2 mr-2">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"

                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                />
                                                <span className=" uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    M
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex space-x-2 mr-2">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"

                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                />
                                                <span className=" uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    L
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex space-x-2 mr-2">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"

                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                />
                                                <span className=" uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    XL
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex space-x-2 mr-2">
                                            <label className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"

                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                />
                                                <span className=" uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    2XL
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* // */}
                            </div>

                        </div>

                    </div>

                    {/* BOX PRODUCTS*/}
                    <div className=''>
                        <div className='sticky top-[79px] z-40 pt-2 bg-white '>
                            <div className='flex justify-between'>
                                <div>
                                    <div className="inline-block  mb-3 ml-4 pt-3">Đang dùng bộ lọc:</div>
                                    {priceRange && (
                                        <div className="inline-flex items-center bg-slate-100 w-20 justify-center rounded-lg ml-2">
                                            {priceRange.min} -{' '}
                                            {priceRange.max === Number.MAX_SAFE_INTEGER
                                                ? 'trên 550.000'
                                                : priceRange.max} <X className="ml-1" size={17} strokeWidth={1} onClick={handleClearFilter} />
                                        </div>
                                    )}

                                    <div className="inline-flex items-center bg-slate-100 w-20 justify-center rounded-lg ml-2">
                                        ĐỎ <X className="ml-1" size={17} strokeWidth={1} />
                                    </div>
                                </div>
                                <div >
                                    <div
                                        className=" text-black  cursor-pointer flex items-center justify-end w-48"
                                        onClick={toggleCollapseArrange}
                                    >
                                        <h2 className="text-base   ">Sắp xếp theo</h2> <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={` absolute transition-max-height duration-500 ease-in-out overflow-hidden  ${isOpenArrange ? 'max-h-40' : 'max-h-0 '
                                            }`}
                                    >
                                        <div className="p-4  bg-white border-2 rounded" >

                                            <label className="block mb-2">
                                                <button
                                                    className={`mr-2 p-1 ${sortOrder === "lowToHigh" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                                    onClick={() => setSortOrder("lowToHigh")}
                                                >
                                                    Từ thấp đến cao
                                                </button>
                                            </label>
                                            <label className="block mb-2">
                                                <button
                                                    className={` mr-2 p-1 ${sortOrder === "highToLow" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                                    onClick={() => setSortOrder("highToLow")}
                                                >
                                                    Từ cao đến thấp
                                                </button>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3'>
                            {getFilteredAndSortedProducts().length > 0 ? (
                                getFilteredAndSortedProducts().map((item, index: number) => (
                                    <div key={index} className="relative mt-4 ml-3.5 md:ml-4 lg:ml-3 ">
                                        <div
                                            className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:gap-7"
                                        >
                                            <div
                                                className="group relative mb-4 h-[80vw] w-[45vw] ml-1 right-0 transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:w-[18vw] "

                                            >
                                                <div className="mb-3 h-[90%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                    <img
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/100/438/408/products/ao-ba-lo-nu-bln6030-bee-cvn5148-nan-5-yodyvn-f885bf48-c73c-4fa7-b848-8105fb3cde79.jpg?v=1681107396047"
                                                        alt=""
                                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                        <a className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
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
                                                <a className="block overflow-hidden">
                                                    <div className="truncate text-center text-sm md:text-base lg:text-base xl:text-base hover:text-yellow-500">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-center block">
                                                        <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">

                                                        </span>
                                                        <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                            {item.price}.000đ
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}



                        </div>
                        <div className="flex justify-center mt-4">
                            {/* Nút Previous */}
                            <button

                                className="mx-2 p-1 border-2 text-gray-700 rounded-md hover:bg-yellow-300"
                            >
                                <ChevronLeft strokeWidth={0.5} />
                            </button>

                            {/* Số trang */}

                            <button


                                className="mx-1 px-3 py-1 border-2 rounded-md  text-gray-700 hover:bg-yellow-100"

                            >
                                1
                            </button>


                            {/* Nút Next */}
                            <button

                                className="mx-2 p-1 border-2 text-gray-700 rounded-md hover:bg-yellow-300"
                            >
                                <ChevronRight strokeWidth={0.5} />
                            </button>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default AllProducts