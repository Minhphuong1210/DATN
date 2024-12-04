<div class="cart-main-wrapper section-padding">
    <div class="container">
        <div class="section-bg-color">
            <div class="row mt-5">
                <div class="col-lg-12">
                    <h5>Thông tin người đặt hàng</h5>
                    <div class="myaccount-table table-responsive text-center">
                        <table class="table table-bordered">
                            <thead class="thead-light">
                                <tr>
                                    <th>Thông tin người đặt hàng</th>
                                    <th>Thông tin người nhận hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <ul>
                                            <li>Tên tài khoản: {{ $donHang->user->name }}</li>
                                            <li>Email: {{ $donHang->user->email }}</li>
                                            <li>Số điện thoại: {{ $donHang->user->phone }}</li>
                                            <li>Địa chỉ: {{ $donHang->user->address }}</li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>Tên tài khoản: {{ $donHang->username }}</li>
                                            <li>Email: {{ $donHang->email }}</li>
                                            <li>Số điện thoại: {{ $donHang->phone }}</li>
                                            <li>Địa chỉ: {{ $donHang->address }}</li>
                                            <li>Trạng thái đơn hàng: {{ $trangThaiDonHang[$donHang->order_status] ?? 'Không xác định' }}</li>
                                            <li>Tiền hàng: {{ number_format($donHang->commodity_money) }}</li>
                                            <li>Tiền ship: {{ number_format($donHang->shipping->cost) }}</li>
                                            <li>Tổng tiền: {{ number_format($donHang->total_amount) }}</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-lg-12">
                    <h5>Sản phẩm của đơn hàng</h5>
                    <div class="myaccount-table table-responsive text-center">
                        <table class="table table-bordered">
                            <thead class="thead-light">
                                <tr>
                                    <th>Hình ảnh sản phẩm</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($donHang->productDetails as $productDetail)
                                    @php
                                        $sanPham = $productDetail->product;
                                    @endphp
                                    <tr>
                                        <td><img src="{{ Storage::url($sanPham->image) }}" alt="" width="50px"></td>
                                        <td>{{ $sanPham->product_code }}</td>
                                        <td>{{ $sanPham->name }}</td>
                                        <td>{{ number_format($sanPham->price) }}</td>
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
