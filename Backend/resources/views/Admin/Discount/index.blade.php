<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.admin')
@section('title')
Discounts
@endsection
@section('content')
<h1>Discounts</h1>
    <a href="{{ route('admins.discounts.create') }}" class="btn btn-success">Create New Discount</a>

    @if(session('success'))
        <div class="alert alert-success"> {{ session('success') }}</div>
    @endif
    
    

    <table class="table table-striped mt-2"> 
        <thead>
            <tr>
                <th>ID</th>
                <th>Category</th> 
                <th>Discount Percent</th>
                <th>Date Time</th>
                <th>Is Active</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($discounts as $discount)
                <tr>
                    <td>{{ $discount->id }}</td>
                    <td>{{ $discount->subCategory ? $discount->subCategory->name : 'N/A' }}</td> <!-- Hiển thị tên category -->
                    <td>{{ $discount->discount_percent }}</td>
                    <td>{{ $discount->expires_at }}</td>
                    {{-- <td>{{}}</td> --}}
                    <td>{{ $discount->is_active ? 'Yes' : 'No' }}</td>
                    <td>
                        <a href="{{ route('admins.discounts.edit', $discount->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('admins.discounts.destroy', $discount->id) }}" method="POST" style="display:inline-block;">
                            @csrf
                            @method('DELETE') <!-- Sử dụng phương thức DELETE -->
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this discount?');">
                                Delete
                            </button>
                        </form>
                        
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
