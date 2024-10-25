import React from "react";
import { useOder } from "../../hook/useOder";
import axios from "axios";

const Order: React.FC = () => {
    const { myOrder, setMyOrder } = useOder();
    console.log(myOrder);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Đang chuẩn bị":
                return "bg-yellow-300 py-2";
            case "Đã giao hàng":
                return "bg-green-300";
            case "Hủy hàng":
                return "bg-red-300";
            case "Chờ xác nhận":
                return "bg-blue-300  py-2 px-2";
            case "Đang vận chuyển":
                return "bg-green-300  py-2 px-2";
            default:
                return "bg-gray-300";
        }
    };


    const handleCancelOrder = async (orderId: string, action: "confirm" | "cancel") => {
        try {
            // Tạo payload dựa trên hành động
            const payload = action === "confirm"
                ? { da_nhan_hang: "1" }
                : { huy_don_hang: "1" };

            const response = await axios.put(`/api/donhangs/${orderId}/update`, payload);

            if (response.status === 200) {
                // Cập nhật trạng thái đơn hàng trong state
                setMyOrder((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_id === orderId
                            ? {
                                ...order,
                                orderStatus: action === "confirm" ? "Nhận" : "Hủy hàng",
                            }
                            : order
                    )
                );
            }
        } catch (error) {
            console.error("Lỗi khi xử lý đơn hàng:", error);
        }
    };


    const getStatusButton = (status: string, orderId: string) => {
        if (status === "Đang vận chuyển") {
            return (
                <td className="px-6 py-4">
                    <button
                        className="rounded bg-green-300 px-3 py-2 text-white"
                        onClick={() => handleCancelOrder(orderId, "confirm")}
                    >
                        Đã nhận hàng
                    </button>
                </td>
            );
        } else {
            return (
                <td className="px-6 py-4">
                    <button
                        className="rounded bg-red-500 px-3 py-2 text-white"
                        onClick={() => handleCancelOrder(orderId, "cancel")}
                    >
                        Hủy đơn
                    </button>
                </td>
            );
        }
    };


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
            <div className="mt-16 grid grid-cols-4">
                <div className="col-span-1 border-2">
                    <div className="m-4">
                        <div className="mt-2">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <img
                                    className="w-40 rounded-full"
                                    src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=rm10Cw5r5BUQ7kNvgEDkTjm&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AlMZXeReeoxLcOTBF9vF00a&oh=00_AYCA4Sbnfij30_RKqe8Ob3cEK3OvUBcVc4kmGdmd1SGt7g&oe=672A4DBA"
                                    alt=""
                                />
                                <div className="text-xl">Hoàng Hùng</div>
                            </div>
                            <div className="text-lg">Thông tin tài khoản</div>
                            <div className="ml-3">
                                <div>Số điện thoại: 0987654321</div>
                                <div>Email: hung@gmail.com</div>
                                <div>Địa chỉ: Foresa 3, Đ.Xuân Phương, Nam Từ Liêm, Hà Nội</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="overflow-hidden">
                        <table className="min-w-full border border-gray-200 bg-white">
                            <thead>
                                <tr className="w-full border-b border-gray-200 bg-gray-100">
                                    <th className="w-1/6 px-6 py-4 text-left font-semibold text-gray-600">
                                        Ảnh
                                    </th>
                                    <th className="w-1/5 px-6 py-4 text-left font-semibold text-gray-600">
                                        Tên sản phẩm
                                    </th>
                                    <th className="w-1/6 px-6 py-4 text-left font-semibold text-gray-600">
                                        Giá
                                    </th>
                                    <th className="w-1/6 px-6 py-4 text-left font-semibold text-gray-600">
                                        Số lượng
                                    </th>
                                    <th className="w-1/6 px-6 py-4 text-left font-semibold text-gray-600">
                                        Trạng thái
                                    </th>
                                    <th className="w-1/6 px-6 py-4 text-left font-semibold text-gray-600">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrder.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="w-1/6 px-6 py-4">
                                            <img className="w-10" src={item.image} alt="" />
                                        </td>
                                        <td className="w-1/6 px-6 py-4">{item.product_name}</td>
                                        <td className="w-1/6 px-6 py-4">{item.price}</td>
                                        <td className="w-1/6 px-6 py-4">{item.quantity}</td>
                                        <td className={`w-1/6 px-2`}>
                                            <span
                                                className={`rounded text-white ${getStatusColor(item.orderStatus)}`}
                                            >
                                                {item.orderStatus}
                                            </span>
                                        </td>
                                        {getStatusButton(item.orderStatus, item.order_id)} {/* Truyền item.id */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
