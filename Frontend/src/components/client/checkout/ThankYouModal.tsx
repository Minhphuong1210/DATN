import { CircleCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';


interface ThankYouModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isVisible, onClose }) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setShowModal(true);
        }
    }, [isVisible]);

    if (!isVisible) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className={`bg-white p-6 rounded shadow-lg text-center transform transition-transform duration-500 ease-in-out ${showModal ? 'translate-y-0' : '-translate-y-full'}`}>

                <div className='flex justify-center'><CircleCheck color='#4ace40' size={100} strokeWidth='1' /></div>

                <p>Đơn hàng của bạn đã được hoàn tất!</p>
                <p>Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Đóng
                </button>

            </div>
        </div>
    );
};

export default ThankYouModal;
