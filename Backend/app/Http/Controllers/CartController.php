<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\OrderDetail;
use Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductSize;
use App\Models\ProductDetail;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function DetalProduct(string $id)
    {
        $productDetail = ProductDetail::findOrFail($id);
        // dd($product);
        $color = ProductColor::all();
        $size = ProductSize::all();
        return view('Detail', compact('productDetail', 'color', 'size'));
    }
    public function Product()
    {
        $product = Product::all();
        // dd($product);
        $color = ProductColor::all();
        $size = ProductSize::all();
        return view('cart', compact('product', 'color', 'size'));
    }
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // session()->put('cart', []);
        $product_id = $request->id;
        $size_id = $request->sizes_id;
        $color_id = $request->color_id;
        $quantity = $request->quantity;

        if ($request->isMethod('POST')) {
            $param = $request->except('_token');

            if (Auth::check()) {
                $param['user_id'] = Auth::id();
                $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
                $productDetail = ProductDetail::query()
                    ->where('product_id', $product_id)
                    ->where('size_id', $size_id)
                    ->where('color_id', $color_id)
                    ->first();
                $cart_id = $cart->id;
                if ($productDetail) {
                    $productDetail_id = $productDetail->id;
                    $CartDetail = CartDetail::where('cart_id', $cart_id)
                        ->where('product_detail_id', $productDetail_id)
                        ->first();

                    if ($CartDetail) {
                        $CartDetail->update([
                            'quantity' => $CartDetail->quantity + $quantity,
                        ]);
                    } else {
                        CartDetail::create([
                            'cart_id' => $cart_id,
                            'product_detail_id' => $productDetail_id,
                            'quantity' => $quantity,
                            'price' => $request->price,
                        ]);
                    }
                }
            } else {
                // Nếu người dùng chưa đăng nhập, xử lý giỏ hàng trong session
                // $productDetail = ProductDetail::where('product_id', $product_id)
                //     ->where('size_id', $size_id)
                //     ->where('color_id', $color_id)
                //     ->first();

                // if (!$productDetail) {
                //     return redirect()->back()->with('error', 'Chưa có sản phẩm này');
                // }

                $sub_category_id = $request->sub_category_id;
                $ProductColor = ProductColor::query()->where('id', $color_id)->first();
                $ProductSize = ProductSize::query()->where('id', $size_id)->first();

                $colorName = $ProductColor ? $ProductColor->name : 'Không xác định';
                $sizeName = $ProductSize ? $ProductSize->name : 'Không xác định';
                $cart_key = "{$product_id}_{$color_id}_{$size_id}";
                $cart = session()->get('cart', []);

                if (isset($cart[$cart_key])) {
                    // Nếu sản phẩm đã có trong giỏ hàng, cộng dồn số lượng
                    $cart[$cart_key]['quantity'] += $quantity;
                } else {
                    // Nếu chưa, thêm mới vào giỏ hàng
                    $cart[$cart_key] = [
                        'name' => $productDetail->product->name ?? 'Tên sản phẩm không xác định',
                        'product_id' => $product_id,
                        'color_id' => $color_id,
                        'size_id' => $size_id,
                        'price' => $productDetail->product->price ?? 0,
                        'user_id' => $request->input('user_id'),
                        'quantity' => $quantity,
                        'category_id' => $sub_category_id,
                        'image' => $productDetail->product->image ?? 'Hình ảnh không xác định',
                        'size_name' => $sizeName,
                        'color_name' => $colorName,
                    ];
                }

                // Lưu lại giỏ hàng vào session
                dd($cart);
                session()->put('cart', $cart);
            }


            // In ra giỏ hàng để kiểm tra
            return redirect()->route('product');
        }
    }






    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
