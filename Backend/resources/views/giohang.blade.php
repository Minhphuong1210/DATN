<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>id</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products_details as $product_detail)
                <tr>

                    <td>{{ $product_detail['product_detail']->product->name }}</td>
                    <td>{{ number_format($product_detail['product_detail']->product->price, 0, ',', '.') }} VND</td>
                    <td>{{ $product_detail['quantity'] }}</td>
                    <td>{{ $product_detail['product_detail']->id }}</td>

                    <td>{{ number_format($product_detail['total_price'], 0, ',', '.') }} VND</td>
                    <td>
                        <!-- Hành động ví dụ: xóa sản phẩm khỏi giỏ hàng -->
                        <form action="{{ route('update', $product_detail['cart_id'])}}" method="POST">
                            @csrf
                            @method('PUT')
                            <button type="submit" class="btn btn-danger">-</button>
                            <input type="text" name="quantity" value="{{$product_detail['quantity'] }}">
                            <button type="submit" class="btn btn-danger">+</button>
                        </form>
                    </td>
                    <td>
                        <!-- Hành động ví dụ: xóa sản phẩm khỏi giỏ hàng -->
                        <form action="{{ route('destroy', $product_detail['cart_id'])}}" method="POST">
                            @csrf
                            @method('delete')
                            <button type="submit" class="btn btn-danger">Xóa</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
