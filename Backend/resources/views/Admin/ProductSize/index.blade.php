<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.admin')
@section('title')
ProductSize
@endsection
@section('content')
<h1>Product Size</h1>
    <a href="{{ route('admins.product_sizes.create') }}" class="btn btn-success">Create New Product Size</a>

    @if(session('success'))
        <div class="alert alert-success"> {{ session('success') }}</div>
    @endif
    
    

    <table class="table table-striped mt-2"> 
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th> 
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productSize as $productSizes)
                <tr>
                    <td>{{ $productSizes->id }}</td>
                    <td>{{ $productSizes->name }}</td> 
                    <td>
                        <a href="{{ route('admins.product_sizes.edit', $productSizes->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('admins.product_sizes.destroy', $productSizes->id) }}" method="POST" style="display:inline-block;">
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
