
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart, X } from 'lucide-react';
import React, { useState } from 'react'
import '../../css/AllProduct.css'

const AllProducts = () => {
    const [isOpenSex, setIsOpenSex] = useState(false);
    const [isOpenShirt, setIsOpenShirt] = useState(false);
    const [isOpenTrousers, setIsOpenTrousers] = useState(false);
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArrange, setIsOpenArrange] = useState(false);
    // const [selectedOptions, setSelectedOptions] = useState([]);

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
    const [value, setValue] = useState(50); // Giá trị ban đầu

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    // const handleCheckboxChange = (e) => {
    //     const value = e.target.value;
    //     setSelectedOptions((prev) =>
    //         prev.includes(value)
    //             ? prev.filter((option) => option !== value)
    //             : [...prev, value]
    //     );
    //     // Bạn có thể xử lý logic lọc sản phẩm dựa trên selectedOptions ở đây
    // };
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
                                                        // checked={selectedOptions.includes('option1')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Áo Polo
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Áo sơ mi
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
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
                                                        // checked={selectedOptions.includes('option1')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Quần Polo
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Quần sơ mi
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
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
                                                        type="checkbox"
                                                        value="option1"
                                                        // checked={selectedOptions.includes('option1')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Dưới 350.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Trên 750.000
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
                                    <div className="inline-flex items-center bg-slate-100 w-20 justify-center rounded-lg ml-2">
                                        S <X className="ml-1" size={17} strokeWidth={1} />
                                    </div>
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
                                            <form>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option1"
                                                        // checked={selectedOptions.includes('option1')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Mới nhất
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Giá từ thấp đến cao
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        // checked={selectedOptions.includes('option2')}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Giá từ cao đến thấp
                                                </label>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div className="relative mt-4 ml-3.5 md:ml-4 lg:ml-3 ">
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
                                                qưewqew
                                            </div>
                                            <div className="text-center block">
                                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                    399.000đ
                                                </span>
                                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                    .000đ
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-4 ml-3.5 md:ml-4 lg:ml-3 ">
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
                                                qưewqew
                                            </div>
                                            <div className="text-center block">
                                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                    399.000đ
                                                </span>
                                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                    .000đ
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-4 ml-3.5 md:ml-4 lg:ml-3 ">
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
                                                qưewqew
                                            </div>
                                            <div className="text-center block">
                                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                    399.000đ
                                                </span>
                                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                    .000đ
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-4 ml-3.5 md:ml-4 lg:ml-3 ">
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
                                                qưewqew
                                            </div>
                                            <div className="text-center block">
                                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                    399.000đ
                                                </span>
                                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                    .000đ
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

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