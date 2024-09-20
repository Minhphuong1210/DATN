<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.admin')
@section('title')
    List SubCategory
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">List SubCategory </h5>
                <a href="{{route('admins.subcategory.create')}}" class="btn btn-primary">Add</a>
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
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Category_id</th>
                                    <th scope="col">Action</th>


                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($subcategory as $item)
                                    <tr>
                                        <td>{{ $item->id }}</td>
                                        <td>{{ $item->name }}</td>
                                        <td>
                                            <img src="{{asset($item->image)}}" alt="" height="100px" width="100px">
                                        </td>
                                        <td>{{ $item->status }}</td>
                                        <td>{{ $item->category ? $item->category->name : 'N/A' }}</td>
                                        
                                        <td>

                                            <div class="d-flex ">
                                               <form action="{{route('admins.subcategory.destroy',$item)}}" method="post">
                                                @csrf
                                                @method('DELETE')
                                                <button class="btn btn-danger" onclick="return confirm('Bạn có chắc chắn xóa không?') ">Delete</button>
                                               </form>
                                                <a href="{{route('admins.subcategory.edit',$item)}}" class="btn btn-success ms-2 ">Edit</a>
                                            </div>

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
