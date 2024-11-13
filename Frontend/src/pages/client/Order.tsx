import React, { useState } from "react";
import axios from "axios";
import { useOder } from "../../hook/useOder";
import CancelMyOrder from "../../modalConfirm/CancelMyoOrder";
import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";

const Order: React.FC = () => {
    const { myOrder, setMyOrder } = useOder();
    console.log(myOrder);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const getStatusColor = (status: string) => {

        switch (status) {
            case "Đang chuẩn bị":
            case "Đã xác nhận":
                return "bg-yellow-300 rounded-full px-2";
            case "Đã giao hàng":
            case "Đang vận chuyển":
            case "Đã nhận hàng":
                return "bg-green-300 rounded-full px-2";
            case "Hủy hàng":
                return "bg-red-300 rounded-full px-2";
            case "Chờ xác nhận":
                return "bg-blue-300 rounded-full px-2";
            default:
                return "bg-gray-300";
        }

    };

    const handleCancelOrder = async (id: string, action: "confirm" | "cancel") => {
        try {
            const payload = action === "confirm"
                ? { da_nhan_hang: "1" }
                : { huy_don_hang: "1" };

            const response = await axios.put(`/api/donhangs/${id}/update`, payload);

            if (response.status === 200) {
                setMyOrder((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === id
                            ? {
                                ...order,
                                orderStatus: action === "confirm" ? "Đã nhận hàng" : "Hủy hàng",
                            }
                            : order
                    )
                );
            }
        } catch (error) {
            console.error("Lỗi khi xử lý đơn hàng:", error);
        }
    };

    const openCancelModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setModalVisible(true);
    };

    const confirmCancelOrder = () => {
        if (selectedOrderId) {
            handleCancelOrder(selectedOrderId, "cancel");
        }
        setModalVisible(false);
    };

    const getStatusButton = (status: string, orderId: string) => {
        if (status === "Đang vận chuyển") {
            return (

                <button
                    className="rounded bg-green-300 px-3 py-2 text-white"
                    onClick={() => handleCancelOrder(orderId, "confirm")}
                >
                    Đã nhận hàng
                </button>

            );
        } else if (status === "Chờ xác nhận" || status === "Đã xác nhận") {
            return (

                <button
                    className="px-4 py-2 bg-red-500 text-white  rounded"
                    onClick={() => openCancelModal(orderId)}
                >
                    Hủy đơn
                </button>

            );
        }
        else if (status === "Đã nhận hàng") {
            return (
                <button
                    className="px-4 py-2 bg-yellow-400 text-black  rounded hover:bg-yellow-300 "
                >
                    Mua lại
                </button>
            )
        }
    };
    const getStatusTop = (status: string) => {
        if (status === "Đã nhận hàng") {
            return (
                <span className="text-sm text-red-600 ">Hoàn thành</span>
            )
        }
    }

    return (
        <div className="mx-[150px] mb-96">
            <div className="sticky top-16 z-30 bg-white py-3">
                <div className="mb-5 text-gray-400">
                    <a href="/" className="text-gray-500 hover:underline focus:outline-none">
                        Trang chủ
                    </a>
                    / <span className="text-gray-600">Đơn hàng của tôi</span>
                </div>
            </div>
            <div className=" grid grid-cols-4">
                <div className="col-span-1 border-2 h-96 text-[14px]">
                    <div className="m-4">
                        <div className="mt-2">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <img
                                    className="w-32 rounded-full"
                                    src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                                    alt="Profile"
                                />
                                <div className="flex items-center gap-2">
                                    <div className="text-xl">Hoàng Hùng</div>
                                    <Link to={"/account"} className="opacity-45 flex gap-2"> <PenLine size={20} />Sửa hồ sơ</Link>
                                </div>
                            </div>
                            <div className="text-lg">Thông tin tài khoản</div>
                            <div className="ml-3 text-[14px]">
                                <div>Số điện thoại: 0987654321</div>
                                <div>Email: hung@gmail.com</div>
                                <div>Địa chỉ: Foresa 3, Đ.Xuân Phương, Nam Từ Liêm, Hà Nội</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="overflow-hidden">

                        <div className=" mx-auto px-4">
                            {/* Search Bar */}
                            <div className="mb-4">
                                <input type="text" placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm" className=" text-[15px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            {/* Order Item */}
                            {myOrder.map((item, index) => (
                                <div className="border border-gray-300 rounded-md p-4 mb-4">
                                    <div className="flex justify-end items-center mb-2">

                                        <div className="flex space-x-2 ">
                                            <span
                                                className={`rounded text-sm text-white ${getStatusColor(item.orderStatus)}`}
                                            >
                                                {item.orderStatus}
                                            </span>
                                            {getStatusTop(item.orderStatus)}

                                        </div>
                                    </div>
                                    <hr className="mb-2" />
                                    <div key={index} className="">
                                        <div className="flex">
                                            <img src={item.image} alt="Product Image" className="w-20 h-20 object-cover mr-4" />
                                            <div className="flex-1">
                                                <p className="text-gray-800">{item.product_name}</p>
                                                <div className="text-sm text-gray-500">Phân loại hàng: Dài 33cm</div>
                                                <div className="text-sm text-gray-500">x1</div>
                                                {/* <span
                                                    className={`rounded text-sm text-white ${getStatusColor(item.orderStatus)}`}
                                                >
                                                    {item.orderStatus}
                                                </span> */}
                                            </div>
                                        </div>
                                        <hr className="my-2" />
                                        <div >
                                            <div className="flex justify-end">
                                                <p className="mr-2">Thành tiền:</p>

                                                <p className="text-xl   text-red-600"> {item.price}đ</p>
                                            </div>
                                            <div className="flex space-x-2 mt-2 justify-end text-[15px]">
                                                {getStatusButton(item.orderStatus, item.id)}
                                                <button className="px-4 py-2  text-gray-700  rounded border-2 hover:bg-gray-100">Liên Hệ Shop</button>
                                                <button className="px-4 py-2  text-gray-700  rounded border-2 hover:bg-gray-100">Đánh Giá Sản Phẩm</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <CancelMyOrder
                isVisible={isModalVisible}
                onConfirm={confirmCancelOrder}
                onCancel={() => setModalVisible(false)}
            />


        </div>
    );
};

export default Order;
