<div>
    <!-- It is quality rather than quantity that matters. - Lucius Annaeus Seneca -->
</div>
@extends('Layout.master')
@section('title')
ProductColor
@endsection
@section('content')
<h1>Product Size</h1>
    <a href="{{ route('admins.product_colors.create') }}" class="btn btn-success">Create New Product Color</a>

    @if(session('success'))
        <div class="alert alert-success"> {{ session('success') }}</div>
    @endif
    
    

    <table class="table table-striped mt-2"> 
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th> 
                <th >Color Code</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productcolor as $productcolors)
                <tr>
                    <td>{{ $productcolors->id }}</td>
                    <td>{{ $productcolors->name }}</td> 
                    <td style="background-color: {{ $productcolors->color_code }}; width:200px" ></td> 

                    <td>
                        <a href="{{ route('admins.product_colors.edit', $productcolors->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('admins.product_colors.destroy', $productcolors->id) }}" method="POST" style="display:inline-block;">
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