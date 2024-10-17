<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.master')
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
@section('script-libs')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <!--datatable js-->
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

    <script src="{{ asset('assets/js/pages/datatables.init.js') }}"></script>
@endsection