<div>
    <!-- Smile, breathe, and go slowly. - Thich Nhat Hanh -->
</div>
@extends('Layout.admin')
@section('title')
    danh sách đơn hàng
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Danh sách sản phẩm</h5>
                <a href="{{ route('admins.product.create') }}" class="btn btn-success">Thêm sản phẩm</a>
            </div><!-- end card header -->

            <div class="card-body">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif
                <div class="table-responsive">
                    <table class="table table-striped mb-0">

                        <thead>
                            <tr>
                                <th scope="col">Product_code </th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                {{-- <th scope="col">Danh mục </th> --}}
                                <th scope="col">Price</th>
                                <th scope="col">Giá khuyến mãi </th>
                                <th scope="col">Description</th>
                                <th scope="col">Content</th>
                                <th scope="col">Is_sale</th>
                                <th scope="col">Is_hot</th>
                                <th scope="col">Is_show_home</th>
                                <th scope="col">Is_active</th>
                                <th scope="col">Sub_category_id </th>
                                <th scope="col">Hành động</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($Product as $index => $item)
                                <tr>
                                    <th scope="row">{{ $item->product_code }}</th>
                                    <td><img src="{{ Storage::url($item->image) }}" alt="" width="150px"></td>
                                    <td>{{ $item->name }}</td>

                                    <td>{{ number_format($item->price) }}</td>
                                    <td>{{ number_format($item->price) }}</td>
                                    <td>{{ $item->description }}</td>
                                    <td>{{ Str::words($item->content, 100) }}</td>
                                    @php
                                        $statusFields = [
                                            'is_sale' => 'Sale',
                                            'is_hot' => 'Hot',
                                            'is_show_home' => 'Show Home',
                                            'is_active' => 'Active',
                                        ];
                                    @endphp

                                    @foreach ($statusFields as $field => $label)
                                        <td>
                                            {!! $item->$field
                                                ? '<span class="badge rounded-pill text-bg-primary">Hiện</span>'
                                                : '<span class="badge rounded-pill text-bg-danger">Ẩn</span>' !!}
                                        </td>
                                    @endforeach
                                    <td>
                                        {{$item->SubCate->name}}
                                    </td>
                                    <td>
                                        <a href="{{ route('admins.product.edit', $item->id) }}"><i
                                                class="mdi mdi-pencil text-muted fs-18 rounded-2 border p-1 me-1"></i></a>
                                        <form action="{{ route('admins.product.destroy', $item->id) }}" method="post"
                                            class="d-inline " onsubmit="return confirm('bạn có muốn xóa không ?')">
                                            @csrf
                                            @method('delete')
                                            <button type="submit" class="border-0 bg-white"><i
                                                    class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1"></i></button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
