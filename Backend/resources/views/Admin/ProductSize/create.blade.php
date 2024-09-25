<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.admin')
@section('title')
Product Size
@endsection
@section('content')
    <h1>Product Size</h1>
    <form action="{{ route('admins.product_sizes.store') }}" method="POST">
        @csrf
        <div>
            <label for="Name" class="mt-2">Name Size</label>
            <input type="text" id="discount_percent" name="name" class="form-control"
            >
            @error('name')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>
        <button type="submit" class="btn btn-success mt-2">Create</button>
    </form>
@endsection
