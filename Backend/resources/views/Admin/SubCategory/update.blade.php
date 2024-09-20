<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.admin')
@section('title')
    Edit
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0"> SubCategory </h5>
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
                    <form action="{{ route('admins.subcategory.update',$model) }}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="">
                            <label for="">Name</label>
                            <input type="text" name="name" class="form-control mt-2" placeholder="Vui lòng nhập tên" value="{{$model->name}}">
                        </div>
                        <div class="mt-2">
                            <label for="">Image</label>
                            <input type="file" name="image" class="form-control mt-2" value="{{$model->image}}">
                        </div>
                        <div class="mt-2">
                            <label for="">Status</label>
                            <input type="text" name="status" class="form-control mt-2" placeholder="Vui lòng nhập trạng thái" value="{{$model->status}}">
                        </div>
                        <div class="mt-2">
                            <label for="">Category_id</label>
                            <select name="category_id" id="" class="form-select mt-2" value="{{$model->category_id}}">
                    
                                @foreach($category_id as $item)
                                <option value="{{$item->id}}">{{$item->name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <button class="btn btn-primary mt-2">Edit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
