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
                                            <th scope="row">{{ $item->code_order }}</th>


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
    </script>
@endsection
