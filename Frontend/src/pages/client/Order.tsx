import React, { useState } from "react";
import axios from "axios";
import { useOder } from "../../hook/useOder";
import CancelMyOrder from "../../modalConfirm/CancelMyoOrder";
import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import Comment from "../../components/client/Comment/Comment";
interface OrderItem {
    id: string;
    image: string;
    orderStatus: string;
    price: number;
    product_name: string;
    quantity: number;
}


const Order: React.FC = () => {
    const { myOrder, setMyOrder, getMyOrder } = useOder();
    console.log(myOrder);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalComment, setModalComment] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

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
            const payload = action === "confirm" ? { da_nhan_hang: "1" } : { huy_don_hang: "1" };
            const response = await axios.put(`/api/donhangs/${id}/update`, payload);

            if (response.status === 200) {
                // Update order status in myOrder state
                setMyOrder((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === id
                            ? { ...order, orderStatus: action === "confirm" ? "Đã nhận hàng" : "Hủy hàng" }
                            : order
                    )
                );
            }
        } catch (error) {
            console.error("Lỗi khi xử lý đơn hàng:", error);
        }
    };

    // mở comfirm HỦY HÀNG 
    const openCancelModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setModalVisible(true);
    };
    const confirmCancelOrder = async () => {
        if (selectedOrderId) {
            await handleCancelOrder(selectedOrderId, "cancel");
            // Optionally fetch myOrder data again or call an API to refresh
            await getMyOrder();  // if you have a fetch function
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


    //Mở comment
    const openComment = (id) => {
        setSelectedProductId(id);
        setModalComment(true);
    };
    // Nhóm các đơn hàng theo id
    const groupedOrders = myOrder.reduce<Record<string, OrderItem[]>>((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = [];
        }
        acc[item.id].push(item);
        return acc;
    }, {});
    return (
        <div className="col-span-4">
            <div className="overflow-hidden">

                <div className=" mx-auto px-4">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <input type="text" placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm" className=" text-[15px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Order Item */}
                    {Object.keys(groupedOrders).map((id) => (
                        <div key={id} className="border border-gray-300 rounded-md p-4 mb-4">
                            <div className="flex justify-end items-center mb-2">
                                <div className="flex space-x-2">
                                    <span className={`rounded text-sm text-white ${getStatusColor(groupedOrders[Number(id)][0].orderStatus)}`}>
                                        {groupedOrders[Number(id)][0].orderStatus}
                                    </span>
                                    {getStatusTop(groupedOrders[Number(id)][0].orderStatus)}
                                </div>
                            </div>
                            <hr className="mb-2" />

                            {/* Hiển thị sản phẩm theo từng nhóm id */}
                            {groupedOrders[Number(id)].map((item, index) => (
                                <div key={index} className="flex mb-2">
                                    <img src={item.image} alt="Product Image" className="w-20 h-20 object-cover mr-4" />
                                    <div className="flex-1">
                                        <p className="text-gray-800">{item.product_name}</p>
                                        <div className="text-sm text-gray-500">Phân loại hàng: Dài 33cm</div>

                                        <div>
                                            {item.id_product}
                                        </div>
                                        <div className="text-sm text-gray-500">x{item.quantity}</div>
                                    </div>
                                    <button onClick={() => openComment(item.id_product)} className="px-4 py-2 text-gray-700 rounded border-2 hover:bg-gray-100">
                                        Đánh Giá Sản Phẩm
                                    </button>
                                </div>

                            ))}

                            <hr className="my-2" />
                            <div>
                                <div className="flex justify-end">
                                    <p className="mr-2">Thành tiền:</p>
                                    <p className="text-xl text-red-600">
                                        {/* Tổng giá tiền của các sản phẩm trong nhóm */}
                                        {groupedOrders[Number(id)].reduce((total, item) => total + item.price, 0)}đ
                                    </p>
                                </div>
                                <div className="flex space-x-2 mt-2 justify-end text-[15px]">
                                    {getStatusButton(groupedOrders[Number(id)][0].orderStatus, (id))}
                                    <button className="px-4 py-2 text-gray-700 rounded border-2 hover:bg-gray-100">
                                        Liên Hệ Shop
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <CancelMyOrder
                    isVisible={isModalVisible}
                    onConfirm={confirmCancelOrder}
                    onCancel={() => setModalVisible(false)}
                />
                <Comment
                    isVisible={isModalComment}
                    onConfirm={confirmCancelOrder}
                    onCancel={() => setModalComment(false)}
                    productId={selectedProductId}
                />
            </div>
        </div>
    );
};

export default Order;
