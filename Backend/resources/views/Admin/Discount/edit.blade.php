@extends('Layout.admin')
@section('title')
    Edit Discount
@endsection
@section('content')
    <h1>Edit Discount</h1>
    <form action="{{ route('admins.discounts.update', $discount->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div>
            <label for="category_id" class="mt-2">Category</label>
            <select id="category_id" name="category_id" class="form-control">
                <option value="" disabled>Select a category</option>
                @foreach ($categories as $category)
                    <option value="{{ $category->id }}" {{ $category->id == $discount->category_id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
            @error('category_id')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>

        <div>
            <label for="discount_percent" class="mt-2">Discount Percent</label>
            <input type="number" id="discount_percent" name="discount_percent" step="0.01" class="form-control"
                   value="{{ $discount->discount_percent }}">
            @error('discount_percent')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>

        <div>
            <label for="is_active">Is Active</label>
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" class="mt-3" id="is_active" name="is_active" value="1" {{ $discount->is_active ? 'checked' : '' }}>
        </div>

        <button type="submit" class="btn btn-primary mt-2">Update</button>
    </form>
@endsection