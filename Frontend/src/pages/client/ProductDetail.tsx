import React, { ChangeEvent, useState } from "react";
import yourImage from "../../public/images/AoPolo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

type Size = "S" | "M" | "L" | "XL" | "2XL" | "Chọn size";
type Color = " Đỏ" | "Trắng" | "Đen" | "Chọn màu";
const ProductDetail: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState<Size>("Chọn size");
    const [selectColor, setSelectColor] = useState<Color>("Chọn màu");

    // Hàm xử lý thay đổi khi radio button được chọn
    const handleChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(event.target.value as Size);
    };
    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectColor(event.target.value as Color);
    };
    return (
        <div className="mx-2 mt-4 overflow-hidden">
            <div>
                <div className="mb-3 flex justify-center">
                    <img src={yourImage} alt="" />
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
                        <div className="mb-2 flex justify-between text-sm">
                            <span>Kích thước: {selectedSize}</span>
                            <span>Giúp bạn chọn size</span>
                            <span>Bảng size</span>
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
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            S
                                        </span>
                                    </label>
                                </div>
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="M"
                                            checked={selectedSize === "M"}
                                            onChange={handleChangeSize}
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
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
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
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
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
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
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            2XL
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 mt-3 text-sm">
                            <span>Màu Sắc:{selectColor} </span>
                            <div className="flex space-x-2">
                                <div className="inline-flex items-center">
                                    <label className="relative flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="example"
                                            value="Đỏ"
                                            checked={selectColor === "Đỏ"}
                                            onChange={handleChangeColor}
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
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
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
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
                                            className="peer h-11 w-11 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-200 hover:shadow-md"
                                        />
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                            Đen
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
