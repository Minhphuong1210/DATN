import React, { useState } from 'react'
import '../../css/Checkout.css'
import { Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import ShippingForm from '../../components/client/checkout/ShippingForm';
import PaymentForm from '../../components/client/checkout/PaymentForm';
import Confirmation from '../../components/client/checkout/Confirmation';
import ThankYouModal from '../../components/client/checkout/ThankYouModal';

const steps = ['Thông tin giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng'];


const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
    // State lưu trữ thông tin giao hàng và phương thức vận chuyển
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        tel: '',
        note: '',
        shippingMethod: '',
    });
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('');
    const handleCloseModal = () => {
        setIsOrderSuccessful(false);
    };
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
        setIsOrderSuccessful(true);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo({
            ...shippingInfo,
            [name]: value,
        });
    };

    const handleShippingMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingMethod(e.target.value);

    };

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (
                    <ShippingForm
                        shippingInfo={shippingInfo}
                        handleShippingChange={handleShippingChange}
                        handleShippingMethodChange={handleShippingMethodChange}
                    />
                );
            case 1:
                return (
                    <PaymentForm
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                );
            case 2:
                return (
                    <Confirmation
                        shippingInfo={shippingInfo}
                        paymentMethod={paymentMethod}


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
                    <div className="w-full">
                        <div className="-mx-3 md:flex items-start">
                            <div className="px-3 md:w-7/12 lg:pr-10">
                                <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <div className="w-full flex items-center">
                                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                            <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-semibold uppercase text-gray-600">Ray Ban Sunglasses.</h6>
                                            <p className="text-gray-400">x 1, Size: S, Màu: Đỏ</p>

                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-600 text-xl">$210</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200">
                                    <div className="-mx-2 flex items-end justify-end">
                                        <div className="flex-grow px-2 lg:max-w-xs">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Mã khuyến mại</label>
                                            <div>
                                                <TextField
                                                    label="Nhập mã khuyến mãi"
                                                    name="fullName"
                                                    value={shippingInfo.fullName}
                                                    onChange={handleShippingChange}
                                                    fullWidth
                                                    margin="normal"
                                                />                                            </div>
                                        </div>
                                        <div className="px-2 mb-2">
                                            <button className=" w-full max-w-xs mx-auto border border-transparent bg-blue-600 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-[15px] font-semibold">Áp Dụng</button>
                                        </div>
                                    </div>

                <div className='pt-10 text-xl font-bold'>Thanh Toán</div>
                <div className='flex gap-20'>
                    <div className='border border-separate w-[650px] flex justify-center'>
                        <div className='pt-3 '>
                            <div className='flex justify-between text-xl '>1.Địa chỉ nhận hàng</div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Họ và tên</label>
                                <input type="text" className=' w-[600px] h-[35px] bg-slate-50 border border-black border-solid rounded ' placeholder='Nguyen Van A' />
                            </div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Số điện thoại</label>
                                <input type="text" className=' w-[600px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='012345678' />
                            </div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Tỉnh/Thành phố</label>
                                <input type="text" className=' w-[600px] h-[35px] bg-slate-50 border border-black border-solid rounded ' placeholder='Ha Noi' />
                            </div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Quận/Huyện</label>
                                <input type="text" className=' w-[600px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Thanh Trì' />
                            </div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Phường/Xã</label>
                                <input type="text" className=' w-[600px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Vạn Phúc' />
                            </div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Địa chỉ đường</label>
                                <input type="text" className=' w-[600px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Xóm 4' />
                            </div>
                            <div className='flex flex-col pt-2 '>
                                <label className='text-lg'>Ghi chú</label>
                                <textarea name="" id="" className=' w-[600px] h-[135px] bg-slate-50 border border-black border-solid rounded' placeholder='Ghi chú'></textarea>
                            </div>
                            <hr className='shrink-0 mt-8 w-[600px]  border border-black border-solid' />
                            <div className='flex justify-between text-xl pt-10'>2.Vận chuyển</div>
                            <div className='pt-3 flex flex-col'>
                                <div className='flex flex-row gap-5'>
                                    <input type="radio" name='vanchuyen' className='ml-2 w-5' />
                                    <label htmlFor="" className='text-lg'>Giao hàng nhanh</label>
                                </div>
                                <div className='flex flex-row gap-5'>
                                    <input type="radio" name='vanchuyen' className='ml-2 w-5' />
                                    <label htmlFor="" className='text-lg'>Giao tiết kiệm</label>

                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                    <div className="w-full flex mb-3 items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Tổng tiền sản phẩm</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">$190.91</span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Phí vận chuyển (GHTK)</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">$19.09</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Tổng thanh toán</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold text-gray-400 text-sm">AUD</span> <span className="font-semibold">$210.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 md:w-5/12">
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    {/* <div className="w-full flex mb-3 items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Contact</span>
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <span>Scott Windon</span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Billing Address</span>
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <span>123 George Street, Sydney, NSW 2000 Australia</span>
                                        </div>
                                    </div> */}
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
                                                        paymentMethod={paymentMethod}
                                                    />
                                                    <ThankYouModal isVisible={isOrderSuccessful} onClose={handleCloseModal} />
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
                                                        <button onClick={handleNext} className=" max-w-xs mx-auto border border-transparent bg-blue-600 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 " >
                                                            {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout