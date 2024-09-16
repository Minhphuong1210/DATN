import React, { ChangeEvent, useState } from "react";
import yourImage from "../../public/images/AoPolo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Eye, Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
    {
        id: '1',
        name: 'Áo Thun',
        price: 200000,
        variants: {
            sizes: ['S', 'M', 'L'],
            colors: ['Đỏ', 'Xanh', 'Đen'],
        },
    }

];
type Size = "S" | "M" | "L" | "XL" | "2XL" | "Chọn size";
type Color = "Đỏ" | "Trắng" | "Đen" | "Chọn màu";
const ProductDetail: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState<Size>("Chọn size");
    const [selectColor, setSelectColor] = useState<Color>("Chọn màu");
    const [quantity, setQuantity] = useState(1);
    const [showDescription, setShowDescription] = useState(true);
    const [showComment, setShowComment] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Tăng giảm sô lượng
    const incurement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const dercrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(event.target.value as Size);
    };
    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectColor(event.target.value as Color);
    };

    // Mô tả & Comment
    const showOnlyDescription = () => {
        setShowDescription(true);
        setShowComment(false);
    };
    const showOnlyComment = () => {
        setShowComment(true);
        setShowDescription(false);
    };



    const itemsPerPage = 4; // Số lượng sản phẩm hiển thị trên màn hình
    const productsPerPage = 4; // Số lượng sản phẩm chuyển qua mỗi lần bấm nút

    const handleNext = () => {
        // Chuyển sang 4 sản phẩm tiếp theo
        if (currentIndex + productsPerPage < products.length) {
            setCurrentIndex(currentIndex + productsPerPage);
        } else {
            setCurrentIndex(products.length - itemsPerPage); // Nếu vượt quá, chỉ hiển thị 2 sản phẩm cuối
        }
    };

    const handlePrevious = () => {
        // Quay lại 4 sản phẩm trước
        if (currentIndex - productsPerPage >= 0) {
            setCurrentIndex(currentIndex - productsPerPage);
        } else {
            setCurrentIndex(0); // Không quay lại quá đầu danh sách
        }
    };
    return (
        <div className="mx-2 mt-4 overflow-hidden md:mx-7 lg:mx-[150px] lg:mt-14">
            <div className=" lg:flex justify-center lg:space-x-56">
                <div className=" flex ">

                    <div className="mb-3  ">
                        <div className="mr-2 p-1 hover:bg-slate-300">
                            <img className="h-16 w-12 lg:h-32 lg:w-24 object-fill" src={yourImage} alt="" />
                        </div>
                        <div className="mr-2 p-1 hover:bg-slate-300">
                            <img className="h-16 w-12  lg:h-32 lg:w-24 object-fill " src={yourImage} alt="" />
                        </div>
                        <div className="mr-2 p-1  hover:bg-slate-300">
                            <img className="h-16 w-12 lg:h-32 lg:w-24 object-fill " src={yourImage} alt="" />
                        </div>
                        <div className="mr-2 p-1 hover:bg-slate-300">
                            <img className="h-16 w-12 lg:h-32 lg:w-24 object-fill " src={yourImage} alt="" />
                        </div>
                    </div>
                    <div className="mb-3 flex justify-center">
                        <img src={yourImage} alt="" />
                    </div>
                </div>
                <div>
                    <div className="text-[16px]">
                        Áo Polo Trắng Recycle Phối họa Tiết Cổ Thân Thiện Với Da 8APCT407TRK
                    </div>
                    <div className="flex items-center">
                        <span>4.0</span>
                        <span className="ml-2 mr-2 flex text-[14px]">
                            <FontAwesomeIcon icon={faStarSolid} />
                            <FontAwesomeIcon icon={faStarSolid} />
                            <FontAwesomeIcon icon={faStarSolid} />
                            <FontAwesomeIcon icon={faStarSolid} />
                            <FontAwesomeIcon icon={faStarRegular} />
                        </span>
                        <span className="text-xs">| Đã bán: 1490</span>
                    </div>
                    <div className="text-xs">
                        Tình trạng:
                        <span className="text-sm font-bold text-green-500">Còn hàng</span>
                    </div>
                    <div className="text-lg font-bold">399.000đ</div>
                    <form action="">
                        <div className="mb-2 flex justify-between text-sm md:block">
                            <span className="md:mr-11">Kích thước: {selectedSize}</span>
                            <span className="hover:text-yellow-400 md:mr-11">
                                <a href="">Giúp bạn chọn size</a>
                            </span>
                            <span className="hover:text-yellow-400">
                                <a href="">Bảng size</a>
                            </span>
                        </div>
                        <div>
                            <div className="flex space-x-2">
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="S"
                                            checked={selectedSize === "S"}
                                            onChange={handleChangeSize}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            S
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            value="M"
                                            checked={selectedSize === "M"}
                                            onChange={handleChangeSize}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            M
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="L"
                                            checked={selectedSize === "L"}
                                            onChange={handleChangeSize}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            L
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="XL"
                                            checked={selectedSize === "XL"}
                                            onChange={handleChangeSize}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            XL
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="2XL"
                                            checked={selectedSize === "2XL"}
                                            onChange={handleChangeSize}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            2XL
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 mt-3 text-sm">
                            <span>Màu Sắc:{selectColor} </span>
                            <div className="mt-2 flex space-x-2">
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="Đỏ"
                                            checked={selectColor === "Đỏ"}
                                            onChange={handleChangeColor}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            Đỏ
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="Trắng"
                                            checked={selectColor === "Trắng"}
                                            onChange={handleChangeColor}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm font-thin text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            Trắng
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="Đen"
                                            checked={selectColor === "Đen"}
                                            onChange={handleChangeColor}
                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            Đen
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="mt-5">Mô tả:</div>
                    <div className="m-2">
                        <p className="text-sm">Chất liệuChất liệu: 100% Polyester</p>

                        <p className="text-sm">
                            Xử lý hoàn thiện vải: Quick-Dry + Wicking + Stretch
                        </p>

                        <p className="text-sm">
                            {" "}
                            Công nghệ Chafe-Free hạn chế tối đa ma sát trong quá trình vận
                            động{" "}
                        </p>
                    </div>
                    <div className="mt-7 flex ">
                        <button
                            className="rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300"
                            onClick={dercrement}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            readOnly
                            className="w-16 appearance-none border-b border-t border-gray-300 text-center"
                            style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                            }}
                        />
                        <button
                            className="mr-4 rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300"
                            onClick={incurement}
                        >
                            +
                        </button>
                        <button className="rounded-sm bg-yellow-400 px-10 py-3">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
            <hr className="mt-7" />
            <div>
                <div className="mb-5 mt-10 flex justify-center space-x-4 lg:space-x-10 lg:text-xl">
                    <h1
                        className={`hovermenuNav hover:text-yellow-500 ${showDescription ? "text-yellow-500" : "text-gray-800"
                            } hover:bg-blue-700}`}
                    >
                        <button onClick={showOnlyDescription}>Mô tả chi tiết</button>
                    </h1>
                    <h1
                        className={`hovermenuNav hover:text-yellow-500 ${showComment ? "text-yellow-500" : "text-gray-800"
                            } hover:bg-blue-700}`}
                    >
                        <button onClick={showOnlyComment}>Đánh giá</button>
                    </h1>
                </div>
                {showDescription && (
                    <p className="mb-8 text-sm lg:text-lg opacity-85  lg:mx-20 lg:mt-8">
                        Áo Singlet chạy bộ Fast & Free ba lỗ Coolmate chất liệu Polyester
                        mang tới trải nghiệm thoáng khí, siêu nhẹ và hạn chế tối đa ma sát
                        khi vận động. Một sản phẩm thời trang yêu thích dành cho các chàng
                        trai trong mùa hè này.
                    </p>
                )}

                {showComment && (
                    <div className="mb-10 border-2 lg:mt-8">
                        <div className="flex flex-col items-center justify-center p-5 ">
                            <div>ĐÁNH GIÁ SẢN PHẨM</div>
                            <span>5.0</span>
                            <span className="ml-2 mr-2 flex text-[14px]">
                                <FontAwesomeIcon icon={faStarSolid} />
                                <FontAwesomeIcon icon={faStarSolid} />
                                <FontAwesomeIcon icon={faStarSolid} />
                                <FontAwesomeIcon icon={faStarSolid} />
                                <FontAwesomeIcon icon={faStarRegular} />
                                <span className="text-xs">| 1900 đánh giá</span>
                            </span>
                        </div>
                        <div className="ml-2 lg:mx-20 h-[500px] overflow-y-scroll">
                            <div className="mb-3 ">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <User
                                            size={25}
                                            strokeWidth={1.5}
                                            className="rounded-full bg-slate-300 p-1"
                                        />
                                    </div>
                                    <div>
                                        <div>Hoàng Hùng</div>
                                        <span className="flex text-[10px]">
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarRegular} />
                                        </span>
                                    </div>
                                </div>
                                <span className="ml-8 text-xs opacity-70">
                                    Phân loại: S, Đỏ
                                </span>
                                <div className="ml-8 mb-1">
                                    Giao hàng nhanh ok , đúng như hình ảnh trên hình , giá thành hợp lý .
                                    Bông tẩy trang dùng được ko bị mủn , nói chung là được
                                </div>
                                <div className="ml-8 flex">
                                    <img className="mr-3 h-[100px] w-[75px]" src={yourImage} alt="" />
                                    <img className="h-[100px] w-[75px]" src={yourImage} alt="" />
                                </div>
                                <div className="ml-8 text-sm opacity-70 mt-1">
                                    Ngày đăng: 2021-08-14
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <User
                                            size={25}
                                            strokeWidth={1.5}
                                            className="rounded-full bg-slate-300 p-1"
                                        />
                                    </div>
                                    <div>
                                        <div>Hoàng Hùng</div>
                                        <span className="flex text-[10px]">
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarRegular} />
                                        </span>
                                    </div>
                                </div>
                                <span className="ml-8 text-xs opacity-70">
                                    Phân loại: S, Đỏ
                                </span>
                                <div className="ml-8 mb-1">
                                    Giao hàng nhanh ok , đúng như hình ảnh trên hình , giá thành hợp lý .
                                    Bông tẩy trang dùng được ko bị mủn , nói chung là được
                                </div>
                                <div className="ml-8 flex">
                                    <img className="mr-3 h-[100px] w-[75px]" src={yourImage} alt="" />
                                    <img className="h-[100px] w-[75px]" src={yourImage} alt="" />
                                </div>
                                <div className="ml-8 text-sm opacity-70 mt-1">
                                    Ngày đăng: 2021-08-14
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <User
                                            size={25}
                                            strokeWidth={1.5}
                                            className="rounded-full bg-slate-300 p-1"
                                        />
                                    </div>
                                    <div>
                                        <div>Hoàng Hùng</div>
                                        <span className="flex text-[10px]">
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarSolid} />
                                            <FontAwesomeIcon icon={faStarRegular} />
                                        </span>
                                    </div>
                                </div>
                                <span className="ml-8 text-xs opacity-70">
                                    Phân loại: S, Đỏ
                                </span>
                                <div className="ml-8 mb-1">
                                    Giao hàng nhanh ok , đúng như hình ảnh trên hình , giá thành hợp lý .
                                    Bông tẩy trang dùng được ko bị mủn , nói chung là được
                                </div>
                                <div className="ml-8 flex">
                                    <img className="mr-3 h-[100px] w-[75px]" src={yourImage} alt="" />
                                    <img className="h-[100px] w-[75px]" src={yourImage} alt="" />
                                </div>
                                <div className="ml-8 text-sm opacity-70 mt-1">
                                    Ngày đăng: 2021-08-14
                                </div>
                            </div>
                            <hr className="mr-2 mt-3" />

                        </div>
                        <div className=" lg:flex justify-center">
                            <form className="mb-6 text-sm ml-2 lg:mx-20">
                                <textarea

                                    placeholder="Viết đánh giá của bạn về sản phẩm"
                                    className="mt-4 w-80 h-36 rounded-md border-2 p-2 outline-none"
                                />
                                <button className="rounded-sm border-2 bg-yellow-500 px-5 py-2 hover:bg-yellow-300">
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <hr className="mb-8" />

            <h1 className="mb-5 text-center text-lg">CÓ THỂ BẠN SẼ THÍCH</h1>
            <div className=" overflow-hidden">
                <div
                    className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)` }}
                >
                    {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
                        <div className="w-52 group relative" key={product.id}>
                            <div className="mb-3 h-52 w-52 overflow-hidden bg-slate-200 p-2 ">
                                <img
                                    src={yourImage}
                                    alt=""
                                    className="h-full w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-125"
                                />
                            </div>
                            <div className="relative ">
                                <div className="absolute bottom-[25px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                        <Eye color="currentColor" strokeWidth="1.5" size={20} />
                                    </div>
                                    <div className="rounded-full  bg-white p-2 hover:bg-black hover:text-white">
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
                                    {product.name}
                                </div>
                                <div className="">
                                    <span className="mr-1 text-sm text-gray-500 line-through hover:text-yellow-500">
                                        399.000đ
                                    </span>
                                    <span className="hover:text-yellow-500">199.000đ</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    +
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
                    onClick={handleNext}
                    disabled={currentIndex + productsPerPage >= products.length}
                >
                    -
                </button>
            </div>

        </div>
    );
};

export default ProductDetail;
