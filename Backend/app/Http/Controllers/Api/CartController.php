<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;              
use App\Models\CartDetail;        
use App\Models\Product;           
use App\Models\ProductColor;      
use App\Models\ProductSize;       
use App\Models\ProductDetail;     
use Illuminate\Http\Request;      
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Session; 


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //Lấy chi tiết sản phẩm
    public function detailProduct(string $id)
    {
        try {
            $productDetail = ProductDetail::find($id);
            $color = ProductColor::all();
            $size = ProductSize::all();
            return response()->json([
                'productDetail' => $productDetail,
                'color' => $color,
                'size' => $size,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    //Lấy tất cả sản phẩm
    public function Product()
    {
        $product = Product::all();
        $color = ProductColor::all();
        $size = ProductSize::all();
        return response()->json([
            'product' => $product,
            'color' => $color,
            'size' => $size,
        ], 200);
    }

    /**
     * Display the specified resource.
     */

    //Them san pham vao gio hang
    public function store(Request $request)
    {
        $product_id = $request->id;
        $size_id = $request->sizes_id;
        $color_id = $request->color_id;
        $quantity = $request->quantity;
        $price = $request->price;

        if (Auth::check()) {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
            $productDetail = ProductDetail::where('product_id', $product_id)
                ->where('size_id', $size_id)
                ->where('color_id', $color_id)
                ->first();

            if ($productDetail) {
                $productDetail_id = $productDetail->id;
                $cartDetail = CartDetail::where('cart_id', $cart->id)
                    ->where('product_detail_id', $productDetail_id)
                    ->first();

                if ($cartDetail) {
                    $cartDetail->update([
                        'quantity' => $cartDetail->quantity + $quantity,
                    ]);
                } else {
                    CartDetail::create([
                        'cart_id' => $cart->id,
                        'product_detail_id' => $productDetail_id,
                        'quantity' => $quantity,
                        'price' => $price,
                    ]);
                }

                return response()->json(['message' => 'Product added to cart successfully'], 200);
            } else {
                return response()->json(['error' => 'Product not found'], 404);
            }
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    // Xem gio hang
    public function cart_detail()
    {
        if (Auth::check()) {
            $user_id = Auth::user()->id;
            $cart = Cart::where('user_id', $user_id)->first();

            if ($cart) {
                $cartDetails = CartDetail::where('cart_id', $cart->id)->get();
                $productsDetails = [];

                foreach ($cartDetails as $detail) {
                    $productDetail = ProductDetail::find($detail->product_detail_id);

                    if ($productDetail) {
                        $productsDetails[] = [
                            'product_detail' => $productDetail,
                            'quantity' => $detail->quantity,
                            'total_price' => $detail->price * $detail->quantity,
                        ];
                    }
                }

                return response()->json(['cart' => $productsDetails], 200);
            }

            return response()->json(['message' => 'Cart is empty'], 404);
        }

        return response()->json(['error' => 'User not authenticated'], 401);
    }


    /**
     * Remove the specified resource from storage.
     */
    //Cap nhat gio hang 
    public function update(Request $request, string $id)
    {
        $cartDetail = CartDetail::findOrFail($id);

        if ($request->isMethod('PUT')) {
            $cartDetail->quantity = $request->quantity;
            $cartDetail->save();

            return response()->json(['message' => 'Cart updated successfully'], 200);
        }

        return response()->json(['error' => 'Invalid method'], 405);
    }
    // Xoa gio hang
    public function destroy(string $id)
    {
        $cartDetail = CartDetail::findOrFail($id);
        $cartDetail->delete();

        return response()->json(['message' => 'Product removed from cart successfully'], 200);
    }


}