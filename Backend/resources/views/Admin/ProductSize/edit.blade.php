@extends('Layout.admin')

@section('title')
Product Size
@endsection

@section('content')
    <h1>Edit Product Size</h1>
    <form action="{{ route('admins.product_sizes.update', $productSizess->id) }}" method="POST">
        @csrf
        @method('PUT') <!-- Phương thức cập nhật -->
        
        <div>
            <label for="name" class="mt-2">Name Size</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $productSizess->name) }}">
            @error('name')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="btn btn-success mt-2">Update</button> <!-- Đổi từ Create sang Update -->
    </form>
@endsection
