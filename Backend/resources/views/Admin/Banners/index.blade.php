<div>
    <!-- Breathing in, I calm body and mind. Breathing out, I smile. - Thich Nhat Hanh -->
</div>
@extends('Layout.admin')
@section('title')
    danh mục Banner
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Danh sách Banner</h5>
                <a href="{{ route('admins.banner.create') }}" class="btn btn-success">Thêm Banner</a>
            </div>

            <div class="card-body">
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
                                    <th scope="col">#</th>
                                    <th scope="col">Hình ảnh</th>
                                    <th scope="col">Tiêu đề</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($banner as $item)
                                    <tr>
                                        <th scope="row">{{ $item->id }}</th>
                                        <td><img src="{{ Storage::url($item->image) }}" alt="" width="150px">
                                        </td>
                                        <td>{{ $item->title }}</td>
                                        
                                        <td>
                                            <a href="{{ route('admins.banner.edit', $item->id) }}"><i
                                                    class="mdi mdi-pencil text-muted fs-18 rounded-2 border p-1 me-1"></i></a>
                                            <form action="{{ route('admins.banner.destroy', $item->id) }}" method="post"
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
    </div>
@endsection

@section('js')
@endsection
