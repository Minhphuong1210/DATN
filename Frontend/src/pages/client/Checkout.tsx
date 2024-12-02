import React, { useEffect, useRef, useState } from 'react'
import '../../css/Checkout.css'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import ShippingForm from '../../components/client/checkout/ShippingForm';
import PaymentForm from '../../components/client/checkout/PaymentForm';
import Confirmation from '../../components/client/checkout/Confirmation';
import CostShipping from '../../components/client/checkout/CostShpping';
import { useOder } from '../../hook/useOder';
import { useShipping } from '../../hook/useShipping';
import { validateShippingInfo } from '../../validation/validateInfoOder';
import ConfirmModal from '../../modalConfirm/ConfirmOder';
import { ChevronLeft, ChevronRight, PackageX } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Order } from '../../interfaces/oder';
import { usePromotion } from '../../hook/usePromotion';

const steps = ['Thông tin giao hàng', 'Xác nhận đơn hàng ', 'Phương thức thanh toán'];
const Checkout = () => {
    const { promotionsUser } = usePromotion()


    const [activeStep, setActiveStep] = useState<number>(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep !== null ? JSON.parse(savedStep) : 0;
    });
    const { oders, total, handleSubmitOrder, isThankPayment } = useOder();
    const [shippingCost, setShippingCost] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const totalPayment = (total?.subtotal || 0) + (shippingCost || 0);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = oders.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(oders.length / productsPerPage);
    const location = useLocation();
    const responseCodeRef = useRef<string | null>(null);
    const responseCodeRefMomo = useRef<string | null>(null);
    const [vnpResponseCode, setVnpResponseCode] = useState<string | null>(null);
    const [MomoResponseCode, setMomoResponseCode] = useState<string | null>(null);
    const [message, setMessage] = useState();
    const [isConfirmOrder, setIsConfirmOrder] = useState(false);
    const [PricePromotion, setPricePromotion] = useState<string | null>(null);
    const [price_after_discountPromotion, settotal_price_after_discount] = useState<string | null>(null);
    const tongthanhtoan = totalPayment - (PricePromotion ? parseFloat(PricePromotion) : 0);
    const [shippingInfo, setShippingInfo] = useState({
        username: '',
        address: '',
        email: '',
        phone: '',
        note: '',
        shippingMethod: '',
    });
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const checkResponseCode = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('vnp_ResponseCode');
            if (code && code !== responseCodeRef.current) {
                responseCodeRef.current = code;
                setVnpResponseCode(code);
                if (code === '00') {
                    setActiveStep(1); // Chuyển đến bước 3 nếu thanh toán thành công
                    // setConfirmVisible(true)
                } else {
                    toast.error('Thanh toán không thành công');
                }
            }
        };
        checkResponseCode();
    }, [location]);
    const shippingInfoo = JSON.parse(localStorage.getItem("shippingInfo")) || {
        username: "",
        phone: "",
        address: "",
        email: "",
        note: "",
        shippingMethod: "",
    };

    // thanh toán
    const Apply = async () => {
        try {
            console.log(totalPayment);
            const response = await axios.post('/api/applyPromotion', { code: apply, totalPayment: totalPayment })
            console.log(response);
            setPricePromotion(response.data.discount_amount);
            settotal_price_after_discount(response.data.total_price_after_discount);

            if (response.data.message) {
                toast.success(response.data.message)

            } else {
                toast.error(response.data.error);
            }
            if (response.data.promotion_id !== undefined && response.data.promotion_id !== null) {
                localStorage.setItem('promotion_id', response.data.promotion_id);
            } else {
                // Nếu không có giá trị, có thể xóa hoặc không lưu vào localStorage
                localStorage.removeItem('promotion_id');
            }
        } catch (error) {
            if (error.response) {
                // Đảm bảo có phản hồi từ server
                console.error('Error response:', error.response);
                toast.error(error.response.data.message || 'Đã xảy ra lỗi khi áp dụng khuyến mãi');
            }
        }
    }


    const promotion_id = localStorage.getItem('promotion_id')
    console.log(promotion_id);


    //chheck Thanh toán thanh công
    const isChecked = useRef(false); // Dùng useRef để theo dõi lần gọi API
    // console.log(promotion_id);
    const checkResponseCode = async () => {

        if (!shippingInfo || !total || shippingCost === undefined) {
            console.error("Data is missing:", { shippingInfo, total, shippingCost });
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const paymentData = {
            vnp_Amount: urlParams.get("vnp_Amount") || "",
            vnp_BankCode: urlParams.get("vnp_BankCode") || "",
            vnp_BankTranNo: urlParams.get("vnp_BankTranNo") || "",
            vnp_CardType: urlParams.get("vnp_CardType") || "",
            vnp_OrderInfo: urlParams.get("vnp_OrderInfo") || "",
            vnp_PayDate: urlParams.get("vnp_PayDate"),
            vnp_ResponseCode: urlParams.get("vnp_ResponseCode") || "",
            vnp_TmnCode: urlParams.get("vnp_TmnCode"),
            vnp_TransactionNo: urlParams.get("vnp_TransactionNo") || "",
            vnp_TransactionStatus: urlParams.get("vnp_TransactionStatus") || "",
            vnp_TxnRef: urlParams.get("vnp_TxnRef") || "",
            vnp_SecureHash: urlParams.get("vnp_SecureHash") || "",
        };
        const txnRef = paymentData.vnp_TxnRef;
        const vnp_ResponseCode = paymentData.vnp_ResponseCode;
        // Kiểm tra xem đã gọi API chưa và mã phản hồi có hợp lệ không
        if (txnRef && vnp_ResponseCode === "00" && !isChecked.current) {
            isChecked.current = true; // Đánh dấu đã gọi API
            try {
                const { data } = await axios.put(`/api/updatevnpay/${txnRef}`, {
                    paymentData: paymentData,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                // call tếp api
                setMessage(data.message);
                toast.success(data.message);
                const orderData: Order = {
                    username: shippingInfoo.username,
                    phone: shippingInfoo.phone,
                    address: shippingInfoo.address,
                    email: shippingInfoo.email,
                    note: shippingInfoo.note,
                    commodity_money: (total?.subtotal || 0) + (shippingCost || 0),
                    total_amount: (total?.subtotal || 0),
                    shipping_id: shippingInfoo.shippingMethod,
                    vnp_TxnReff: paymentData.vnp_TxnRef,
                    promotion_id: promotion_id
                };
                // console.log(orderData);
                await axios.post('/api/donhangs/store', orderData)
                // Xử lý kết quả từ API thứ hai
                toast.success("Đặt hàng thành công thành công!");
                setIsConfirmOrder(true);
                localStorage.removeItem('activeStep');
                localStorage.removeItem('shippingInfo');
                localStorage.removeItem('promotion_id');
            } catch (error) {
                toast.error("Thanh toán thất bại!");
            }
        }
    };
    useEffect(() => {
        if (shippingInfo.username && total && shippingCost !== undefined) {
            checkResponseCode();
        }
    }, [shippingInfo, total, shippingCost]);



    useEffect(() => {
        const checkResponseCodeMomo = () => {
            const queryString = location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get('resultCode');
            if (code && code !== responseCodeRef.current) {
                responseCodeRef.current = code;
                setMomoResponseCode(code);
                if (code === '0') {
                    toast.success('Thanh toán thành công');
                    setActiveStep(1); // Chuyển đến bước 3 nếu thanh toán thành công

                } else {
                    toast.error('Thanh toán không thành công');
                }
            }
        };
        checkResponseCodeMomo();
    }, [location]);

    const [apply, setApply] = useState()


    const handleChange = (e: any) => {
        setApply(e.target.value)

    }

    useEffect(() => {
        const savedShippingInfo = localStorage.getItem('shippingInfo');
        if (savedShippingInfo) {
            setShippingInfo(JSON.parse(savedShippingInfo));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeStep', JSON.stringify(activeStep));
    }, [activeStep]);

    const handleNext = async () => {
        // Kiểm tra điều kiện cho activeStep = 0
        if (activeStep === 0) {
            const errorMessage = validateShippingInfo(shippingInfo);
            if (errorMessage) {
                setError(errorMessage);
                return;
            } else {
                setError(null);
                // Lưu thông tin vào localStorage
                localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            }
        }
        // Nếu activeStep = 1 và vnpResponseCode = '00', bỏ qua bước 2 và chuyển đến bước 3
        if (activeStep === 1 && vnpResponseCode === '00' && MomoResponseCode === '00') {
            setActiveStep(3); // Bỏ qua bước 2, chuyển thẳng đến bước 3
            return;
        }
        // Nếu activeStep chưa phải là bước cuối cùng, tăng activeStep bình thường
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1); // Tăng bước bình thường
        }
    };

    const savedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    const handleBack = () => {
        // Nếu mã phản hồi tồn tại và là '00' và đang ở bước 3, quay lại trực tiếp bước 1
        if (activeStep === 3 && vnpResponseCode === '00') {
            setActiveStep(1); // Trở về bước 1, bỏ qua bước 2
        }
        // Nếu mã phản hồi không tồn tại hoặc khác '00', quay lại từng bước theo thứ tự thông thường
        else if (activeStep > 0) {
            setActiveStep((prevStep) => prevStep - 1); // Giảm activeStep theo thứ tự thông thường
        }
    };


    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const { shippings } = useShipping();

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (
                    <ShippingForm
                        shippingInfo={shippingInfo}
                        handleShippingChange={handleShippingChange}
                        // handleShippingMethodChange={handleShippingMethodChange}
                        error={error ?? ''}
                    />
                );
            case 1:
                return (

                    <Confirmation
                        shippingInfo={shippingInfo}
                        // paymentMethod={paymentMethod}
                        shippings={shippings}
                    />
                );
            case 2:
                return (
                    <PaymentForm
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        totalPayment={tongthanhtoan}
                        handleNext={handleNext}
                        shippingInfoo={shippingInfoo}
                        shippingInfo={shippingInfo}
                        total={total}
                        shippingCost={shippingCost}
                        handleSubmitOrder={handleSubmitOrder}
                        setIsConfirmOrder={setIsConfirmOrder}
                    />
                );

            default:
                return 'Unknown step';
        }
    };
    return (
        <>


            <div className="min-w-screen min-h-screen bg-gray-50 py-5 md:mx-[150px] lg:mx-[150px]">
                <div className="px-5">
                    <div className="mb-2">

                    </div>
                    <div className="mb-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Checkout.</h1>
                    </div>
                    <div className="mb-5 text-gray-400">
                        <a href="/" className="focus:outline-none hover:underline text-gray-500">Home</a> / <a href="cart" className="focus:outline-none hover:underline text-gray-500">Cart</a> / <span className="text-gray-600">Checkout</span>
                    </div>
                </div>
                <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">

                    {oders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                            <div className="mt-6 flex flex-col items-center">
                                <PackageX size={200} strokeWidth="0.1" className="opacity-50" />
                                <span className="text-gray-500">Không có sản phẩm nào trong giỏ hàng.</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="-mx-3 md:flex items-start">
                                <div className="px-3 md:w-7/12 lg:pr-10">
                                    {currentProducts.map((oder, index) => (
                                        <div key={index} className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                            <div className="w-full flex items-center">
                                                <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                                    <img src={oder.ImageProduct} />
                                                </div>
                                                <div className="flex-grow pl-3">
                                                    <h6 className="font-semibold uppercase text-gray-600">{oder.NameProduct}</h6>
                                                    <p className="text-gray-400">x {oder.quantity}, Size: {oder.sizeName}, Màu: {oder.colorName}</p>

                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-600 text-xl">{oder.price}</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-center mt-4 ">
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="mx-2 p-1 border-2 text-gray-700 rounded-md hover:bg-yellow-300"
                                        >
                                            <ChevronLeft strokeWidth={0.5} />
                                        </button>
                                        <span className="p-2 opacity-60">{` ${currentPage} / ${totalPages}`}</span>
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="mx-2 p-1  border-2 text-gray-700 rounded-md hover:bg-yellow-300"
                                        >
                                            <ChevronRight strokeWidth={0.5} />
                                        </button>
                                    </div>
                                    <div className="mb-6 pb-6 border-b border-gray-200">
                                        <div className=" flex items-start justify-end mt-5">
                                            <div className="flex-grow px-2 lg:max-w-xs">
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Mã giảm giá</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"

                                                        label="Mã giảm giá"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value=''>Chọn mã giảm giá</MenuItem>
                                                        {promotionsUser.map((item) => (
                                                            <MenuItem value={item.code}>{item.code}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                            </div>
                                            <div className="px-2 mb-2">
                                                <button className=" w-full max-w-xs mx-auto border border-transparent bg-yellow-400 hover:bg-yellow-300  text-black rounded-md px-5 py-[14px] " onClick={Apply}>Áp Dụng</button>
                                            </div>
                                        </div>
                                    </div>
                                    {total && (
                                        <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                            <div className="w-full flex mb-3 items-center">
                                                <div className="flex-grow">
                                                    <span className="text-gray-600">Tổng tiền sản phẩm</span>
                                                </div>
                                                <div className="pl-3">
                                                    <span className="font-semibold">{total.subtotal}</span>
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center">
                                                <div className="flex-grow">
                                                    <span className="text-gray-600">Phí vận chuyển </span>
                                                </div>
                                                <div className="pl-3">
                                                    <span className="font-semibold">
                                                        <CostShipping
                                                            shippingInfo={shippingInfo}
                                                            shippings={shippings}
                                                            onCostChange={setShippingCost}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center">
                                                <div className="flex-grow">
                                                    <span className="text-gray-600">Tiền Khuyến mại</span>
                                                </div>
                                                <div className="pl-3">
                                                    <span className="font-semibold">
                                                        {PricePromotion}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                        <div className="w-full flex items-center">
                                            <div className="flex-grow">
                                                <span className="text-gray-600">Tổng thanh toán</span>
                                            </div>
                                            <div className="pl-3">

                                                <span className="font-semibold">{tongthanhtoan.toFixed(2)}</span> <span className="font-semibold text-gray-400 text-sm">VND</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="px-3 md:w-5/12">
                                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">

                                        <div>
                                            <Stepper activeStep={activeStep}>
                                                {steps.map((label, index) => (
                                                    <Step key={index}>
                                                        <StepLabel>{label}</StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>

                                            <div>
                                                {activeStep === steps.length ? (
                                                    <Typography>

                                                        <Confirmation
                                                            shippingInfo={shippingInfo}
                                                            // paymentMethod={paymentMethod}
                                                            shippings={shippings}
                                                        />

                                                    </Typography>
                                                ) : (
                                                    <div>
                                                        {getStepContent(activeStep)}

                                                        <div style={{ marginTop: '20px' }}>
                                                            <button className='mr-6 opacity-70'
                                                                disabled={activeStep === 0}
                                                                onClick={handleBack}
                                                            >
                                                                Quay lại
                                                            </button>

                                                            {activeStep !== 2 || (activeStep === 2 && vnpResponseCode === '00') ? (
                                                                <button
                                                                    onClick={handleNext}
                                                                    className="max-w-xs mx-auto border border-transparent bg-yellow-400 hover:bg-yellow-300 rounded-md px-5 py-2"
                                                                >
                                                                    {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
                                                                </button>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <ConfirmModal
                                            isVisible={isConfirmOrder || isThankPayment}

                                            onCancel={() => setIsConfirmOrder(false)}
                                            savedShippingInfo={savedShippingInfo}
                                            shippingInfo={shippingInfo}
                                            totalPayment={totalPayment}
                                            shippingCost={shippingCost}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Checkout