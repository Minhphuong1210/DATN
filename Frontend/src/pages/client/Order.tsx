import { Divider, Table, TableColumnsType, Popconfirm, message } from 'antd';
import React from 'react';
import { useOder } from '../../hook/useOder';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    status: string;
}

const Order: React.FC = () => {
    const { myOrder, myOrderStatus } = useOder();
    console.log(myOrder, myOrderStatus);
    const columns: TableColumnsType<DataType> = [
        {
            title: 'ORD_ID',
            dataIndex: 'orderId',
            render: (text: string) => <a>{text}</a>,
            key: 'orderId',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            render: (text: string) => <a>{text}</a>,
            key: 'product_name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img width={50} src={image} alt="Product" />,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',

            render: (status: string) => (
                <span className={`px-2 py-1 rounded text-white ${getStatusColor(status)}`}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">



                    <Popconfirm
                        title="Bạn có chắc chắn muốn hủy đơn hàng này không?"
                        onConfirm={() => handleCancelOrder(record.key)}
                        onCancel={() => message.info('Đã hủy hành động')}
                        okText="Có"
                        cancelText="Không"
                    >
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            Hủy đơn hàng
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const handleCancelOrder = (orderId: React.Key) => {
        console.log('Hủy đơn hàng với ID:', orderId);
        message.success(`Đơn hàng ${orderId} đã được hủy`);
    };

    const dataTable = myOrder.map((item: DataType) => ({
        key: item.id,
        ...item,
    }));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đang xử lý':
                return 'bg-yellow-300';
            case 'Đã giao hàng':
                return 'bg-green-300';
            case 'Đã hủy':
                return 'bg-red-300';
            case 'Chờ xác nhận':
                return 'bg-blue-300';
            default:
                return 'bg-gray-300';
        }
    };
    return (
        <div className='mx-[150px] mb-96'>
            <div className="sticky top-16 z-30 py-3 bg-white">
                <div className="mb-5 text-gray-400">
                    <a href="/" className="focus:outline-none hover:underline text-gray-500">
                        Trang chủ
                    </a>
                    / <span className="text-gray-600">Đơn hàng của tôi</span>
                </div>
            </div>
            <div className='grid grid-cols-4 mt-16'>
                <div className='col-span-1 border-2'>
                    <div className='m-4'>
                        <div className=' mt-2  '>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <img
                                    className='rounded-full w-40'
                                    src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=rm10Cw5r5BUQ7kNvgEDkTjm&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AlMZXeReeoxLcOTBF9vF00a&oh=00_AYCA4Sbnfij30_RKqe8Ob3cEK3OvUBcVc4kmGdmd1SGt7g&oe=672A4DBA" alt=""
                                />

                                <div className='text-xl'>Hoàng Hùng</div>
                            </div>
                            <div className='text-lg'>Thông tin tài khoản</div>
                            <div className='ml-3'>
                                <div>Số điện thoại: 0987654321</div>
                                <div>Email: hung@gmail.com</div>
                                <div>Địa chỉ: Foresa 3, Đ.Xuân Phương, Nam Từ Liêm, Hà Nội</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-3'>
                    <Table<DataType>
                        columns={columns}
                        dataSource={dataTable}
                    />
                </div>
            </div>
        </div>
    );
};

export default Order;
