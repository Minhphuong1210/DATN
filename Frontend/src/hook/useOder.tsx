import axios from "axios";
import { useEffect, useState } from "react";
import { OderProducts, OderTotal, Order } from "../interfaces/oder";
import { useLoading } from "../context/Loading";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
// import ConfirmModal from "../components/ConfirmModal"; // Đảm bảo đường dẫn đúng tới component modal
interface DataType {
    id: string;
    order_id: string;
    product_name: string;
    image: string;
    quantity: number;
    price: number;
    orderStatus: string;
}
export const useOder = () => {
    const [oders, serOders] = useState<OderProducts[]>([]);
    const [total, serTotal] = useState<OderTotal>();
    const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
    const [isOfBtn, setIsOffBtn] = useState(false);
    const { loading, setLoading } = useLoading();
    const [isConfirmVisible, setConfirmVisible] = useState(false); // State cho modal confirm
    const [shippingInfo, setShippingInfo] = useState<any>(null); // State cho thông tin vận chuyển
    const [apply, setApply] = useState()
    const [myOrder, setMyOrder] = useState<DataType[]>([]);
    const location = useLocation(); // Lấy đối tượng location
    const queryParams = new URLSearchParams(location.search); // Tạo URLSearchParams từ location.search
    // const vnpAmount = queryParams.get('vnp_Amount');

    const paymentInfo = {
        vnp_Amount: queryParams.get('vnp_Amount'),
        vnp_BankCode: queryParams.get('vnp_BankCode'),
        vnp_BankTranNo: queryParams.get('vnp_BankTranNo'),
        vnp_CardType: queryParams.get('vnp_CardType'),
        vnp_OrderInfo: queryParams.get('vnp_OrderInfo'),
        vnp_PayDate: queryParams.get('vnp_PayDate'),
        vnp_ResponseCode: queryParams.get('vnp_ResponseCode'),
        vnp_TmnCode: queryParams.get('vnp_TmnCode'),
        vnp_TransactionNo: queryParams.get('vnp_TransactionNo'),
        vnp_TransactionStatus: queryParams.get('vnp_TransactionStatus'),
        vnp_TxnRef: queryParams.get('vnp_TxnRef')
    };
    // console.log(paymentInfo);
    const getAllOder = async () => {
        try {
            setLoading(true);
            const resposive = await axios.get('/api/donhangs/create');
            console.log(resposive.data.cart);
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

            const urlParams = new URLSearchParams(window.location.search);
            const paymentData = {
                vnp_Amount: urlParams.get("vnp_Amount"),
                vnp_BankCode: urlParams.get("vnp_BankCode"),
                vnp_BankTranNo: urlParams.get("vnp_BankTranNo"),
                vnp_CardType: urlParams.get("vnp_CardType"),
                vnp_OrderInfo: urlParams.get("vnp_OrderInfo"),
                vnp_PayDate: urlParams.get("vnp_PayDate"),
                vnp_ResponseCode: urlParams.get("vnp_ResponseCode"),
                vnp_TmnCode: urlParams.get("vnp_TmnCode"),
                vnp_TransactionNo: urlParams.get("vnp_TransactionNo"),
                vnp_TransactionStatus: urlParams.get("vnp_TransactionStatus"),
                vnp_TxnRef: urlParams.get("vnp_TxnRef"),
                vnp_SecureHash: urlParams.get("vnp_SecureHash"),
            };

            console.log("Order Data:", orderData);
            console.log("Payment Data:", paymentData);

            setLoading(true);

            const requestData = {
                orderData,
                paymentData,
            };

            console.log("Order Data:", orderData);
            setLoading(true);
            await axios.post('/api/donhangs/store', requestData);

            toast.success("Đặt hàng thành công");
            setIsOrderSuccessful(true);
            localStorage.removeItem('activeStep');
            localStorage.removeItem('shippingInfo');
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
    const applyDiscount = async (value: any) => {
        try {
            await axios.post('/api/applyPromotion', value)
        } catch (error) {
            console.log(error);

        }
    }
    const getMyOrder = async () => {
        try {
            const response = await axios.get('/api/donhangs')
            setMyOrder(response.data.chitietDonHang)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyOrder();
    }, []);
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
        setConfirmVisible, // Cho phép đóng modal confirm
        apply,
        applyDiscount,
        myOrder,
        setMyOrder,getMyOrder

    };
};
