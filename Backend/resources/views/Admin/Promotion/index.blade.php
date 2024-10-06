<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.master')
@section('title')
    List Promotion
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">List Promotion </h5>
                <a href="{{ route('admins.promotion.create') }}" class="btn btn-primary">Add</a>
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
                                    <th scope="col">Code</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Discount_type</th>
                                    <th scope="col">Minimum_spend</th>
                                    <th scope="col">Start_date</th>
                                    <th scope="col">End_date</th>
                                    <th scope="col">Usage_limit</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>


                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($promotion as $item)
                                    <tr>
                                        <td>{{ $item->id }}</td>
                                        <td>{{ $item->code }}</td>
                                        <td>{{ $item->discount }}</td>
                                        <td>{{ $item->discount_type }}</td>
                                        <td>{{ $item->minimum_spend }}</td>
                                        <td>{{ $item->start_date }}</td>
                                        <td>{{ $item->end_date }}</td>
                                        <td>{{ $item->usage_limit }}</td>
                                        <td>{{ $item->status }}</td>
                                        <td>
                                            <div class="d-flex ">
                                                <form action="{{ route('admins.promotion.destroy', $item) }}"
                                                    method="post">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-danger"
                                                        onclick="return confirm('Bạn có chắc chắn xóa không?') ">Delete</button>
                                                </form>
                                                <a href="{{ route('admins.promotion.edit', $item) }}"
                                                    class="btn btn-success ms-2 ">Edit</a>
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
