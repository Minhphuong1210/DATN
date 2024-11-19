import React from 'react'
import { useForm } from 'react-hook-form';

type Props = {
    onSubmit: (data: any) => void
}

const ContactsForm = ({ onSubmit }: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    return (
        <>
            <h1 className='text-center text-3xl font-semibold pt-10'>Liên hệ với chúng tôi</h1>
            <div className='flex justify-center gap-12 pt-10 py-20'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='border-2 border-slate-200 p-4 w-[700px] rounded-xl shadow-xl'>
                        <h2 className='text-xl font-semibold'>Viết cho chúng tôi</h2>
                        <p>Chúng tôi sẽ trả lời bạn nhanh nhất có thể.</p>
                        <div className='flex gap-4 justify-center pt-5'>
                            <div className="mb-4 w-[300px]">
                                <label className="mb-2 block text-black" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên"
                                    {...register("name", {
                                        required: "Username là bắt buộc",
                                        minLength: {
                                            value: 5,
                                            message: "Username không ít hơn 5 ký tự",
                                        },
                                    })}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {String(errors.name.message)}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4 w-[300px]">
                                <label className="mb-2 block text-black" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập email"
                                    {...register("email", {
                                        required: "Email là bắt buộc",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Email không hợp lệ",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {String(errors.email.message)}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex gap-4 justify-center pt-5'>
                            <div className="mb-4 w-[300px]">
                                <label className="mb-2 block text-black" htmlFor="email">
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    id="phone"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập phone"
                                    {...register("phone", {
                                        required: "Số điện thoại là bắt buộc",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Số điện thoại phải đủ 10 số",
                                        },
                                    })}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {String(errors.phone.message)}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4 w-[300px]">
                                <label className="mb-2 block text-black" htmlFor="message">
                                    Bạn đang suy nghĩ
                                </label>
                                <textarea
                                    id="note"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập nội dung"
                                    rows={4}
                                    {...register("note", {
                                        required: "Nội dung là bắt buộc",
                                        minLength: {
                                            value: 10,
                                            message: "Nội dung phải có ít nhất 10 ký tự",
                                        },
                                    })}
                                />
                                {errors.note && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {String(errors.note.message)}
                                    </p>
                                )}
                            </div>

                        </div>
                        <div className='pt-8 flex justify-center'>
                            <button className='w-[200px] h-[45px]  bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded'>Gửi</button>
                        </div>
                    </div>
                </form>
                <div className='border-2 border-slate-200 p-4 w-[400px] rounded-xl shadow-xl'>
                    <h2 className='text-xl font-semibold'>Văn phòng</h2>
                    <p className='pt-5'> <strong>Hotline:</strong> 1900.8079</p>
                    <p className='pt-3'> <strong>Thời gian mở cửa:</strong> 8:00 - 19h Thứ 2 - Thứ 7</p>
                    <p className='pt-3'><strong>VP Phía Bắc:</strong>Tầng 17 tòa nhà Viwaseen, 48 Phố Tố Hữu, Trung Văn, Nam Từ Liêm, Hà Nội.</p>
                    <p className='pt-3'><strong>VP Phía Nam:</strong>186A Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP.HCM</p>
                </div>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13490.503724367582!2d105.8882687932083!3d20.917429734931797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b1fcdf03cce9%3A0x17d478e57be2f31a!2zVuG6oW4gUGjDumMsIFRoYW5oIFRyw6wsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1729573760962!5m2!1svi!2s" className='w-full h-[350px]' ></iframe>
            </div>
        </>
    )
}

export default ContactsForm