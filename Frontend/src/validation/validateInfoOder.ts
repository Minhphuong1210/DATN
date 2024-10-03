
export const validateShippingInfo = (shippingInfo: {
    username: string;
    address: string;
    email: string;
    phone: string;
    shippingMethod: string;
}): string | null => {
    const { username, address, email, phone, shippingMethod } = shippingInfo;

    // Kiểm tra các trường thông tin bắt buộc
    if (!username || !address || !email || !phone || !shippingMethod) {
        return "Vui lòng điền tất cả thông tin bắt buộc.";
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Email không hợp lệ.";
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,15}$/; // Định dạng số điện thoại từ 10 đến 15 chữ số
    if (!phoneRegex.test(phone)) {
        return "Số điện thoại không hợp lệ.";
    }

    return null; // Không có lỗi
};
