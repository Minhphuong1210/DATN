import React, { useEffect } from "react";
import { useCart } from "../../hook/Cart";
import { Cart_detail } from "../../interfaces/Cart";
import axios from "axios";

type Props = {};

const Cart = (props: Props) => {
    const { productCart } = useCart();
    console.log(productCart);

    return (
        <>
            <div className="mt-16 flex w-[90%] max-w-[1535px] flex-col self-center pl-40 text-2xl max-md:mt-10 max-md:max-w-full">
                <h1 className="self-start text-xl font-bold text-black max-md:ml-1.5">
                    GIỎ HÀNG
                </h1>
                <div className="mt-16 flex w-full max-w-[1413px] flex-wrap justify-between gap-10 text-lg text-black max-md:mt-10 max-md:max-w-full">
                    <div className="text-lg font-bold">Sản phẩm</div>
                    <div className="flex gap-24 pr-[70px] max-md:max-w-full">
                        <div className="text-lg">Số lượng</div>
                        <div className="px-8 text-lg">Giá gốc</div>
                        <div className="text-lg">Tổng tiền</div>
                    </div>
                </div>
                <hr className="mt-2.5 w-full shrink-0 border border-solid border-black max-md:mr-1.5" />
                <div className="flex flex-col gap-5 pt-3">
                    {productCart &&
                        productCart.length > 0 &&
                        productCart.map((item, index) => {
                            return (
                                <div key={index} className="pt-10 gap-5 block text-base">
                                    <div className="flex gap-5">
                                        <div className="pt-5 "><img src={item.ImageProduct} alt="Hình ảnh" /></div>
                                        <div className="block ">
                                            <div className="truncate w-[150px]">{item.NameProduct}</div>
                                            <div>{item.colorName}</div>
                                            <div>{item.sizeName}</div>
                                        </div>
                                        <div className="flex w-full gap-[160px] pl-[480px] pt-2">
                                            <div>{item.quantity}</div>
                                            <div>{item.PriceProduct}</div>
                                            <div>{item.total_price}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <hr className="mt-8 w-full shrink-0 border border-solid border-black" />
                <div className="flex gap-5 justify-between items-start self-end mt-11 mr-10 max-w-full w-[300px] max-md:mt-10 max-md:mr-2.5 text-lg">
                    <div className="flex flex-col">
                        <div className="text-black font-bold">Tổng sản phẩm</div>
                        <div className="text-yellow-500 font-bold text-xl">Tổng tiền</div>
                    </div>
                    <div className="flex flex-col">
                        <div>{productCart && productCart.length > 0 && productCart.reduce((sum, item) => sum + item.quantity, 0)}</div>
                        <div>{productCart && productCart.length > 0 && productCart.reduce((sum, item) => sum + item.total_price, 0)}</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-5 justify-between self-center mt-20 w-full font-semibold max-w-[1515px] max-md:mt-10 max-md:max-w-full">
                    <button className="self-start px-16 py-3 text-lg text-black bg-white rounded border border-black border-solid max-md:px-5">
                        Tiếp tục mua hàng
                    </button>
                    <button className="px-16 py-3 text-lg text-white bg-black rounded max-md:px-5">
                        <a href="/checkout">Đặt hàng</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
