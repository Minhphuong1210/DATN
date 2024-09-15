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
        $cart = Cart::all();
        $cartDetail = CartDetail::all();

        $productDetail = ProductDetail::all();

        $color = ProductColor::all();
        $size = ProductSize::all();
        return view('giohang', compact('cart', 'productDetail', 'color', 'size'));
    }
    public function showFormLogin()
    {
        return view('login');
    }


    public function login(Request $request)
    {
        // dd($request->all());
        $user = $request->only('email', 'password');


        if (Auth::attempt($user)) {
            $check_khoa = Auth::user();
            return redirect()->route('product');
        }
        ;
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
        $price=$request->price;
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
                            'price' => $price,
                        ]);
                    }
                }
            } else {
                // Nếu người dùng chưa đăng nhập, xử lý giỏ hàng trong session
                $productDetail = ProductDetail::where('product_id', $product_id)
                    ->where('size_id', $size_id)
                    ->where('color_id', $color_id)
                    ->first();

                if (!$productDetail) {
                    return redirect()->back()->with('error', 'Chưa có sản phẩm này');
                }

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

                session()->put('cart', $cart);
            }


            // In ra giỏ hàng để kiểm tra
            return redirect()->route('product');
        }
    }






    /**
     * Display the specified resource.
     */
    public function cart_detail()
    {
        // Lấy tất cả các giỏ hàng

        if (Auth::check()) {
            $user_id = Auth::user()->id;
            $carts = Cart::query()->where('user_id', $user_id)->first();
        
            if ($carts) {
                $cart_id = $carts->id;
                $cart_detail = CartDetail::query()->where('cart_id', $cart_id)->get();
                $products_details = [];
                
                foreach ($cart_detail as $cart_details) {
                    $product_detail_id = $cart_details->product_detail_id;
                    $Product_detail = ProductDetail::query()->where('id', $product_detail_id)->first();
        
                    if ($Product_detail) {
                        // Kết hợp dữ liệu từ cả CartDetail và ProductDetail
                        $products_details[] = [
                            'product_detail' => $Product_detail,   
                            'quantity' => $cart_details->quantity, 
                            'total_price' => $cart_details->price * $cart_details->quantity,
                            'cart_id'=>$cart_details->id,
                        ];
                    }
                }
        // dd($products_details);
                // Trả về view cùng với tất cả dữ liệu giỏ hàng
                return view('giohang', compact('products_details'));
            }
        } else {
            return redirect()->route('login'); // Chuyển hướng nếu chưa đăng nhập
        }
        
        // Truyền dữ liệu đến view
        return view('giohang', compact('cart_detail'));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        // $cart_detail = CartDetail::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cart_delete = CartDetail::query()->findOrFail($id);
        // dd($cart_delete['quantity']);
       if($request->isMethod('PUT')){
        $cart_delete['quantity']  = $request->quantity;
        $cart_delete->save();
        return redirect()->back();
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart_delete = CartDetail::query()->where('id', $id)->delete();
        return redirect()->back()->with('success','thành công');
    }
}
