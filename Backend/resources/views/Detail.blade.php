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
    <form action="{{ route('cart_add') }}" method="post">
        @csrf
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <input type="hidden" name="id" value="{{$productDetail->id}}">
            <div class="card-body">
                {{-- <h5 class="card-title">{{ $productDetail->name }}</h5> --}}
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                    <select class="form-select" aria-label="Default select example" name="color_id">
                    @foreach ($color as $colors)
                    <option value="{{ $colors->id }}">{{ $colors->name }}</option>
                    @endforeach
                </select>
                <select class="form-select" aria-label="Default select example" name="sizes_id">
                    @foreach ($size as $sizes)
                    <option value="{{ $sizes->id }}">{{ $sizes->name }}</option>
                    @endforeach
                  </select>
            </div>
            <input type="text" name="quantity" id="">
            giá
            <input type="text" name="price" value="{{ $productDetail->product->price }}">
        </div>
        <button type="submit">Thêm</button>
    </form>
</body>

</html>
