import { ChevronDown, ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCategory } from '../../hook/useCategory';
import { useColor } from '../../hook/Color';
import { Product } from '../../interfaces/Product';
import { useLoading } from '../../context/Loading';
import { toast } from 'react-toastify';
interface PriceRange {
    min: number;
    max: number;
}
const ProductsCate = () => {
    const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
    const [color_id, setColorID] = useState<string | null>(null);
    const [size_id, setSizeID] = useState<string | null>(null);
    const { color, size } = useColor();
    const { productBySubCateId, name } = useCategory();
    const [sortOrder, setSortOrder] = useState<string>("");
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArrange, setIsOpenArrange] = useState(false);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const [selectedPriceRange, setSelectedPriceRange] = useState({
        range1: false, // 150 - 350
        range2: false, // 350 - 550
        range3: false, // 550 trở lên
    });

    const [selectedFilterSize, setSelectedFilterSize] = useState([])
    // Hàm lọc sản phẩm theo giá
    const filterByPrice = (products) => {
        if (
            !selectedPriceRange.range1 &&
            !selectedPriceRange.range2 &&
            !selectedPriceRange.range3

        ) {
            return products; 
        }

        return products.filter((product) => {
           
            const price = product.price_sale ? parseInt(product.price_sale, 10) : parseInt(product.price, 10);

            
            if (isNaN(price)) return false;

            
            if (selectedPriceRange.range1 && price >= 150000 && price <= 350000) {

                return true;
            }
            if (selectedPriceRange.range2 && price >= 350000 && price <= 550000) {

                return true;
            }
            if (selectedPriceRange.range3 && price >= 550000) {

                return true;
            }
            return false;
        });
    };

    // Hàm xử lý thay đổi checkbox
    const handleCheckboxChange = (event) => {
        setSelectedPriceRange({
            ...selectedPriceRange,
            [event.target.name]: event.target.checked,
        });
    };

    // Lọc sản phẩm theo mức giá đã chọn
    const filteredProducts = filterByPrice(productBySubCateId);

    useEffect(() => {
        if (filteredProducts.length === 0) {
            toast.info('Không có sản phẩm phù hợp với tiêu chí lọc!');
        }
    }, [filteredProducts]);
    const handleColor = (color_id: string, isChecked: boolean) => {
        if (isChecked) {
            setColorID(color_id)
        } else {
            setColorID(null);
        }
    }



    const handleSize = (size_id: string, isChecked: boolean) => {
        if (isChecked) {
            setSizeID(size_id)
        } else {
            setSizeID(null);
        }
    }

    // const handleClearFilter = () => {
    //     setPriceRange(null);
    //     fetchProducts();
    // };
    // const handleClearFilterCate = () => {
    //     setCate(null);
    // }
    // const handleClearFilterColor = () => {
    //     setColorID(null);
    // }
    // const handleClearFilterSize = () => {
    //     setSizeID(null);
    // }
    // const handleClearFilterSubcate = () => {
    //     setSubcateID(null);
    // }
    // Hàm lấy sản phẩm sau khi lọc và sắp xếp




    const toggleCollapsePrice = () => {
        setIsOpenPrice(!isOpenPrice);
    };
    const toggleCollapseArrange = () => {
        setIsOpenArrange(!isOpenArrange);
    };
    return (
        <>
            <div className='mx-[200px]'>
                <div className="">
                    <div className=" m-1 bg-white text-gray-400">
                        <a href="/" className="focus:outline-none hover:underline text-gray-500">Trang chủ </a> / <span className="text-gray-600">{name ? name : "Checkout"}</span>
                    </div>
                </div>
                <div className='flex '>
                    {/* BỘ LỌC */}
                    <div className='mr-20'>
                        <div className=' h-[700px]  overflow-y-scroll  scrollable-content'>
                            <div className='text-2xl mt-5'>Bộ lọc</div>
                            <div className="w-64">
                                {/* Header Collapse */}

                                {/* Nội dung Collapse */}


                                <hr className=' bg-black' />


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
                                                        name="range1"
                                                        checked={selectedPriceRange.range1}
                                                        onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Từ 150.000 - 350.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="range2"
                                                        checked={selectedPriceRange.range2}
                                                        onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Từ 350.000 - 550.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="range3"
                                                        checked={selectedPriceRange.range3}
                                                        onChange={handleCheckboxChange}
                                                        className="mr-2"
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
                                        {color.map((item, index) => (
                                            <div key={index} className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        className=" focus:outline-none focus:ring-2  focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full"
                                                        onChange={(e) => handleColor(item.id, e.target.checked)}
                                                        checked={color_id === item.id}
                                                        style={{
                                                            backgroundColor: item.color_code,

                                                        }}

                                                    />
                                                </label>

                                            </div>
                                        )
                                        )}
                                    </div>
                                </div>
                                <div className='mt-4 '>
                                    <h2 className='mb-2'>Kích Thước</h2>
                                    <div className="inline-flex items-center ">
                                        {size.map((item, index) => (
                                            <div key={index} className="flex space-x-2 mr-2">
                                                <label className="relative flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                        onChange={(e) => handleSize(item.id, e.target.checked)} // Gọi handleSize khi thay đổi
                                                        checked={size_id === item.id} // Kiểm tra nếu size_id trùng với item.id thì checkbox được chọn
                                                    />
                                                    <span className="uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                        {item.name}
                                                    </span>
                                                </label>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                                {/* // */}
                            </div>

                        </div>

                    </div>

                    {/* BOX PRODUCTS*/}
                    <div className=''>
                        <div className='sticky top-0 z-40 bg-white'>
                            <div className='flex justify-between'>
                                <div>
                                    <div className="inline-block mb-3 ml-4">Đang dùng bộ lọc:</div>
                                </div>
                                <div className=""> {/* Đẩy phần tử này sang phải */}
                                    <div
                                        className="text-black cursor-pointer flex items-center justify-end w-48"
                                        onClick={toggleCollapseArrange}
                                    >
                                        <h2 className="text-base">Sắp xếp theo</h2>
                                        <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`absolute transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenArrange ? 'max-h-40' : 'max-h-0'}`}
                                    >
                                        <div className="p-4 bg-white border-2 rounded">
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
                                                    className={`mr-2 p-1 ${sortOrder === "highToLow" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
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

                        <div className="grid grid-cols-3">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className="relative mt-4 ml-3.5 md:ml-4 lg:ml-3">
                                    <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                        <div className="group relative mb-4 h-[70vw] w-[45vw] ml-1 right-0 transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:w-[18vw]">
                                            <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${item.image}`}
                                                    alt={item.name}
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
                                                    {item.price_sale !== null ? (
                                                        <>
                                                            <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                                {formatPrice(item.price)}
                                                            </span>
                                                            <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                                {formatPrice(item.price_sale)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                            {formatPrice(item.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}


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

export default ProductsCate