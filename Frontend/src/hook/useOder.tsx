import axios from "axios";
import { useEffect, useState } from "react";
import { OderProducts, OderTotal, Order } from "../interfaces/oder";
import { useLoading } from "../context/Loading";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal"; // Đảm bảo đường dẫn đúng tới component modal

export const useOder = () => {
    const [oders, serOders] = useState<OderProducts[]>([]);
    const [total, serTotal] = useState<OderTotal>();
    const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
    const [isOfBtn, setIsOffBtn] = useState(false);
    const { loading, setLoading } = useLoading();
    const [isConfirmVisible, setConfirmVisible] = useState(false); // State cho modal confirm
    const [shippingInfo, setShippingInfo] = useState<any>(null); // State cho thông tin vận chuyển

    const getAllOder = async () => {
        try {
            setLoading(true);
            const resposive = await axios.get('/api/donhangs/create');
            serOders(resposive.data.cart);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllOder();
    }, []);

    const getTotal = async () => {
        try {
            setLoading(true);
            const resposive = await axios.get('/api/donhangs/create');
            serTotal(resposive.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTotal();
    }, []);

    const handleSubmitOrder = async (info: any, total: any, shippingCost: number) => {
        setShippingInfo({ info, total, shippingCost }); // Lưu thông tin cần thiết
        setConfirmVisible(true); // Hiển thị modal confirm
    };

    const confirmOrder = async () => {
        if (!shippingInfo) return;

        try {
            const { info, total, shippingCost } = shippingInfo; // Lấy thông tin từ state
            const orderData: Order = {
                username: info.username,
                phone: info.phone,
                address: info.address,
                email: info.email,
                note: info.note,
                commodity_money: total?.subtotal || 0,
                total_amount: (total?.subtotal ?? 0) + shippingCost,
                shipping_id: info.shippingMethod,
            };

            setLoading(true);
            await axios.post('/api/donhangs/store', orderData);
            toast.success("Đặt hàng thành công");
            setIsOrderSuccessful(true);
            setIsOffBtn(true);
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Error submitting order");
        } finally {
            setLoading(false);
            setConfirmVisible(false); // Ẩn modal confirm sau khi hoàn thành
        }
    };

    const handleCloseModal = () => {
        setIsOrderSuccessful(false);
    };

    return {
        oders,
        total,
        isOrderSuccessful,
        isOfBtn,
        handleSubmitOrder,
        handleCloseModal,
        loading,
        isConfirmVisible,
        confirmOrder,
        setConfirmVisible // Cho phép đóng modal confirm
    };
};
