<div>
    <!-- Waste no more time arguing what a good man should be, be one. - Marcus Aurelius -->
</div>
@extends('Layout.master')
@section('title')
    Product Color
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-header">
                    <h5 class="card-title mb-0">Input Type</h5>
                </div><!-- end card header -->

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6 ">
                            <h1>Product Color</h1>
                            <form action="{{ route('admins.product_colors.store') }}" method="POST">
                                @csrf
                                <div>
                                    <label for="Name" class="mt-2">Name Color</label>
                                    <input type="text" id="discount_percent" name="name" class="form-control">
                                    @error('name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div>
                                    <label for="Name" class="mt-2">Mã màu</label>
                                    <input type="text" id="discount_percent" name="color_code" class="form-control">
                                    @error('color_code')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                                <button type="submit" class="btn btn-success mt-2">Create</button>
                            </form>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
