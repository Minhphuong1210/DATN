<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.admin')
@section('title')
    Update Promotion
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Update Promotion </h5>
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
                    <form action="{{ route('admins.promotion.update',$model->id) }}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="">
                            <label for="">Code</label>
                            <input type="text" name="code" class="form-control mt-2"  value="{{$model->code}}">
                            @error('code')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">Discount</label>
                            <input type="text" name="discount" class="form-control mt-2"  value="{{$model->discount}}">
                            @error('discount')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">Discount_type</label>
                            <select name="discount_type" id="" class="form-select"  value="{{$model->discount_type}}" >
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </select>
                            @error('discount_type')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">Minimum_spend</label>
                            <input type="text" name="minimum_spend" class="form-control mt-2"  value="{{$model->minimum_spend}}">
                            @error('minimum_spend')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">Start_date</label>
                            <input type="date" name="start_date" class="form-control mt-2"  value="{{$model->start_date}}">
                            @error('start_date')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">End_date</label>
                            <input type="date" name="end_date" class="form-control mt-2"  value="{{$model->end_date}}">
                            @error('end_date')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">Usage_limit</label>
                            <input type="text" name="usage_limit" class="form-control mt-2"  value="{{$model->usage_limit}}">
                            @error('usage_limit')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mt-2">
                            <label for="">Status</label>
                            <select name="status" id="" class="form-select"  value="{{$model->status}}">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            @error('status')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>

                        <button class="btn btn-primary mt-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
