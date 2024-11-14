import React, { useEffect, useRef, useState } from 'react'
import '../../css/Checkout.css'
import { Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import ShippingForm from '../../components/client/checkout/ShippingForm';
import PaymentForm from '../../components/client/checkout/PaymentForm';
import Confirmation from '../../components/client/checkout/Confirmation';
import ThankYouModal from '../../components/client/checkout/ThankYouModal';
import CostShipping from '../../components/client/checkout/CostShpping';
import { useOder } from '../../hook/useOder';
import { useShipping } from '../../hook/useShipping';
import { validateShippingInfo } from '../../validation/validateInfoOder';
import ConfirmModal from '../../modalConfirm/ConfirmOder';
import { ChevronLeft, ChevronRight, PackageX } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import MessagePayment from '../../components/client/checkout/MessagePayment';
const steps = ['Thông tin giao hàng', 'Xác nhận đơn hàng ', 'Phương thức thanh toán', "Xác nhận"];
const Checkout = () => {
    const [activeStep, setActiveStep] = useState<number>(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep !== null ? JSON.parse(savedStep) : 0;
    });
    const { oders, total, isOrderSuccessful, handleSubmitOrder, handleCloseModal, isOfBtn, isConfirmVisible, confirmOrder, setConfirmVisible } = useOder();

    const [shippingCost, setShippingCost] = useState<number>(0);
    // const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('');
    const totalPayment = (total?.subtotal || 0) + (shippingCost || 0);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = oders.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(oders.length / productsPerPage);
    const location = useLocation();
    const responseCodeRef = useRef<string | null>(null);
    const responseCodeRefMomo = useRef<string | null>(null);
    const [vnpResponseCode, setVnpResponseCode] = useState<string | null>(null);
    const [MomoResponseCode, setMomoResponseCode] = useState<string | null>(null);
    useEffect(() => {
        const checkResponseCode = () => {
            const queryString = location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get('vnp_ResponseCode');
            if (code && code !== responseCodeRef.current) {
                responseCodeRef.current = code;
                setVnpResponseCode(code);
                if (code === '00') {
                    toast.success('Thanh toán thành công');
                    setActiveStep(3); // Chuyển đến bước 3 nếu thanh toán thành công
                } else {
                    toast.error('Thanh toán không thành công');
                }
            }
        };
        checkResponseCode();
    }, [location]);
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
                    setActiveStep(3); // Chuyển đến bước 3 nếu thanh toán thành công
                } else {
                    toast.error('Thanh toán không thành công');
                }
            }
        };
        checkResponseCodeMomo();
    }, [location]);
    interface appLy {
        code: string
        total_price: number
    }
    const [apply, setApply] = useState()


    const handleChange = (e: any) => {
        setApply(e.target.value)

    }
    const Apply = async () => {
        try {
            await axios.post('/api/applyPromotion', { code: apply, totalPayment: totalPayment })
            toast.success('Áp dụng thành công')
        } catch (error) {
            toast.error('Phiếu khuyến mại hết hạn')
        }
    }
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
        if (activeStep === 1 && vnpResponseCode === '00') {
            setActiveStep(3); // Bỏ qua bước 2, chuyển thẳng đến bước 3
            return;
        }

        // Nếu activeStep chưa phải là bước cuối cùng, tăng activeStep bình thường
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1); // Tăng bước bình thường
        }

        // Kiểm tra điều kiện cho bước cuối cùng
        if (activeStep === steps.length - 1) {
            const savedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
            handleSubmitOrder(savedShippingInfo || shippingInfo, total, shippingCost);
        }
    };



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

    const handleShippingMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingMethod(e.target.value);
    };

    const { shippings } = useShipping();

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (
                    <ShippingForm
                        shippingInfo={shippingInfo}
                        handleShippingChange={handleShippingChange}
                        handleShippingMethodChange={handleShippingMethodChange}
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
                        totalPayment={totalPayment}
                    />
                );
            case 3:
                return (
                    <MessagePayment


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
                        {/* <a href="#" className="focus:outline-none hover:underline text-gray-500 text-sm"><i className="mdi mdi-arrow-left text-gray-400" />Back</a> */}
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
                                        <div className="-mx-2 flex items-end justify-end">
                                            <div className="flex-grow px-2 lg:max-w-xs">
                                                <div>
                                                    <TextField
                                                        label="Nhập mã khuyến mãi"
                                                        fullWidth
                                                        margin="normal"
                                                        value={apply}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-2 mb-2">
                                                <button className=" w-full max-w-xs mx-auto border border-transparent bg-yellow-400 hover:bg-yellow-300  text-black rounded-md px-5 py-[15px] font-semibold" onClick={Apply}>Áp Dụng</button>
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
                                        </div>
                                    )}
                                    <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                        <div className="w-full flex items-center">
                                            <div className="flex-grow">
                                                <span className="text-gray-600">Tổng thanh toán</span>
                                            </div>
                                            <div className="pl-3">

                                                <span className="font-semibold">{totalPayment.toFixed(2)}</span> <span className="font-semibold text-gray-400 text-sm">VND</span>
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
                                            isVisible={isConfirmVisible}
                                            onConfirm={confirmOrder}
                                            onCancel={() => setConfirmVisible(false)}
                                        />
                                        <ThankYouModal isVisible={isOrderSuccessful} onClose={handleCloseModal} />
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