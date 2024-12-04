<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.master')
@section('title')
    danh sách đơn hàng
@endsection
@section('content')
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title align-content-center mb-0">Danh sách đơn hàng </h5>

                </div><!-- end card header -->

                <div class="card-body">
                    <div class="card-body">
                        @if (session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif
                        @if (session('error'))
                            <div class="alert alert-danger">
                                {{ session('error') }}
                            </div>
                        @endif
                        <div class="table-responsive">
                            <table class="table table-striped mb-0">

                                <thead>
                                    <tr>
                                        <th scope="col">Mã sản phẩm</th>
                                        <th scope="col">Ngày đặt</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Tổng tiền</th>
                                        <th>Thay đổi trạng thái đơn hàng </th>
                                        <th>Trạng thái thanh toán</th>
                                        <th scope="col">Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($listDonHang as $item)
                                        <tr>
                                            <td>
                                                <a href="javascript:void(0);"
                                                    onclick="loadOrderDetails({{ $item->id }})">
                                                    {{ $item->code_order }}
                                                </a>
                                            </td>




                                            <td>{{ $item->created_at->format('d-m-y') }}</td>
                                            <td>{{ $trangThaiDonHang[$item->order_status] ?? 'Không xác định' }}</td>
                                            <td>{{ number_format($item->total_amount) }}</td>
                                            <td>
                                                <form action="{{ route('admins.orders.update', $item->id) }}"
                                                    method="post">
                                                    @csrf
                                                    @method('PUT')
                                                    <select name="order_status" class="form-select w-50"
                                                        onchange="confirmSubmit(this)"
                                                        data-default-value="{{ $item->order_status }}">
                                                        @foreach ($trangThaiDonHang as $key => $value)
                                                            <option value="{{ $key }}"
                                                                {{ $item->order_status == $key ? 'selected' : '' }}
                                                                {{ $key == 'huy_hang' ? 'disabled' : '' }}>
                                                                {{ $value }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </form>

                                            </td>

                                            <td>
                                                @if ($item->order_payment == 'cho_xac_nha')
                                                    <form action="{{ route('admins.orders.updatePayment', $item->id) }}"
                                                        method="post"
                                                        onsubmit="return confirm('Bạn có chắc chắn đã nhận?');">
                                                        @csrf
                                                        @method('PUT')
                                                        thanh toán onl
                                                        <button type="submit" class="btn btn-light" name="order_payment"
                                                            value="da_thanh_toan">đã nhận</button>
                                                    </form>
                                                @elseif ($item->order_payment == 'da_thanh_toan')
                                                    <p>Đã thanh toán</p>
                                                @else
                                                    <p>thanh toán khi nhận hàng</p>
                                                @endif

                                            </td>
                                            <td>
                                                <a href="{{ route('admins.orders.show', $item->id) }}">
                                                    <i class="mdi mdi-eye"></i>
                                                </a>

                                                @if ($item->trang_thai_don_hang == 'huy_hang')
                                                    <form action="{{ route('admins.orders.destroy', $item->id) }}"
                                                        method="post" class="d-inline "
                                                        onsubmit="return confirm('bạn có muốn xóa không ?')">
                                                        @csrf
                                                        @method('delete')
                                                        <button type="submit" class="border-0 bg-white"><i
                                                                class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1"></i></button>
                                                    </form>
                                                @endif
                                            </td>


                                        </tr>
                                    @endforeach

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script-libs')
    <script>
        function confirmSubmit(selectElement) {
            if (confirm("bạn có chắc muốn thay đổi trạng thái đơn hàng ")) {
                selectElement.closest('form').submit();
            } else {
                // Revert to original value if the user cancels
                selectElement.value = selectElement.getAttribute('data-default-value');
            }
        }


      
        function loadOrderDetails(orderId) {
    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();

    const url = `/admins/orders/show/${orderId}`; // Đường dẫn phù hợp với định nghĩa route

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Lỗi: Không thể tải dữ liệu (Mã lỗi: ${response.status})`);
            }
            return response.json(); // Chuyển đổi response thành JSON
        })
        .then(result => {
            const data = result.data; // Lấy dữ liệu từ thuộc tính "data"

            if (!data) {
                throw new Error("Dữ liệu không hợp lệ.");
            }

            // Hiển thị thông tin đơn hàng
            document.getElementById('orderDetailsContent').innerHTML = `
                <h5 class="text-primary">Chi tiết đơn hàng</h5>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <tbody>
                            <tr><th>Mã đơn hàng</th><td>${data.code_order}</td></tr>
                            <tr><th>Tên người dùng</th><td>${data.username}</td></tr>
                            <tr><th>Số điện thoại</th><td>${data.phone}</td></tr>
                            <tr><th>Email</th><td>${data.email}</td></tr>
                            <tr><th>Địa chỉ</th><td>${data.address}</td></tr>
                            <tr><th>Trạng thái đơn hàng</th><td>${data.order_status}</td></tr>
                            <tr><th>Trạng thái thanh toán</th><td>${data.order_payment}</td></tr>
                            <tr><th>Tiền hàng</th><td>${data.commodity_money.toLocaleString()} VNĐ</td></tr>
                            <tr><th>Tiền vận chuyển</th><td>${data.cost.toLocaleString()} VNĐ</td></tr>
                            <tr><th>Tổng tiền</th><td>${data.total_amount.toLocaleString()} VNĐ</td></tr>
                        </tbody>
                    </table>
                </div>
                <h6>Sản phẩm trong đơn hàng:</h6>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            Array.isArray(data.products) && data.products.length > 0
                                ? data.products.map(product => `
                                    <tr>
                                        <td>${product.product_detail_id}</td>
                                        <td>${product.price.toLocaleString()} VNĐ</td>
                                        <td>${product.quantity}</td>
                                        <td>${product.total_amount.toLocaleString()} VNĐ</td>
                                    </tr>
                                  `).join('')
                                : '<tr><td colspan="4" class="text-center">Không có sản phẩm nào trong đơn hàng.</td></tr>'
                        }
                    </tbody>
                </table>
            `;
        })
        .catch(error => {
            document.getElementById('orderDetailsContent').innerHTML =
                `<p class="text-danger">Lỗi: ${error.message}</p>`;
        });
}

    </script>
@endsection
<!-- Modal Chi tiết Đơn hàng -->
<div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderDetailsModalLabel">Chi tiết đơn hàng</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="orderDetailsContent">
                <!-- Nội dung chi tiết đơn hàng sẽ được tải vào đây bằng AJAX -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
