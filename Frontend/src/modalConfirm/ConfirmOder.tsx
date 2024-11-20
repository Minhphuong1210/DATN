import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import yourImage from "../public/images/logofix.png";
import { Link } from 'react-router-dom';

interface ConfirmModalProps {
    isVisible: boolean;
    onCancel: () => void;
}

const ThankPayMent: React.FC<ConfirmModalProps> = ({ isVisible, onCancel, shippingInfo, totalPayment, shippingCost, handleSubmitOrder, savedShippingInfo }) => {
    if (!isVisible) return null;
    // const back = () => {
    //     onCancel();
    //     window.history.pushState({}, document.title, window.location.pathname);
    //     window.location.reload();
    // }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex  items-center justify-center z-50  ">
            <div className="flex flex-col items-center justify-center h-[600px] w-[900px]  bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Main Content */}
                <div className="bg-white p-6  w-2/3 sm:w-1/2 lg:w-2/3 text-center">
                    <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 text-3xl" />
                    </div>

                    <h2 className="text-2xl font-bold text-blue-800 mb-2">Đặt hàng thành công!</h2>
                    <p className="text-lg text-gray-700 mb-6">Cảm ơn bạn đã đặt hàng, bộ phận chăm sóc khách hàng sẽ liên hệ với bạn trong vòng 24h để xác nhận, hãy để ý điện thoại bạn nhé!</p>

                    <div className="flex justify-center gap-4">
                        <Link to={"/"} className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200">
                            Quay về trang chủ
                        </Link>
                        <Link to={"/allproducts"} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-200">
                            Xem sản phẩm khác
                        </Link>
                    </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 flex gap-4 text-gray-500">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="text-xl" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={['fab', 'youtube']} className="text-xl" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={['fab', 'tiktok']} className="text-xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={['fab', 'instagram']} className="text-xl" />
                    </a>
                </div>
            </div>
        </div >
    );
};

export default ThankPayMent;
