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

    /**
     * Display the specified resource.
     */

    //Them san pham vao gio hang
    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'size_id' => 'required',
            'color_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',
        ]);
        $product_id = $request->id;
        $size_id = $request->size_id;
        $color_id = $request->color_id;
        $quantity = $request->quantity;
        $price = $request->price;

        if (!$product_id) {
            return response()->json([
                'error' => 'Không tìm thấy sản phẩm',
            ], 404);
        }
        if (!$size_id) {
            return response()->json([
                'error' => 'Không tìm thấy kích cỡ sản phẩm',
            ], 404);
        }
        if (!$color_id) {
            return response()->json([
                'error' => 'Không tìm thấy màu sắc sản phẩm',
            ], 404);
        }
        if (!$quantity) {
            return response()->json([
                'error' => 'Không tìm thấy số lượng sản phẩm',
            ], 404);
        }
        if (!$price) {
            return response()->json([
                'error' => 'Không tìm thấy giá sản phẩm',
            ], 404);
        }
        if (Auth::check()) {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
            
          
            $productDetail = ProductDetail::where('product_id', $product_id)
                ->where('size_id', $size_id)
                ->where('color_id', $color_id)
                ->first();
        
         
            if (!$productDetail) {
                return response()->json(['error' => 'Không có sản phẩm'], 200);
            }
        
            $stock = $productDetail->quantity;
            if ($stock == 0) {
                return response()->json(['error' => 'Sản phẩm đã hết hàng']);
            }
        
            if ($quantity > $stock) {
                return response()->json(['error' => 'Số lượng vượt quá giới hạn']);
            }
        
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
        
            return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng'], 200);
        } else {
            return response()->json(['error' => 'Người dùng chưa đăng nhập'], 401);
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
            if (!$user_id) {
                return response()->json([
                    'message' => 'Tài Khoản không tồn tại',
                ], 404);
            }
            $cart = Cart::where('user_id', $user_id)->first();

            if ($cart) {
                $cartDetails = CartDetail::where('cart_id', $cart->id)->get();
                $productsDetails = [];

                foreach ($cartDetails as $detail) {
                    $productDetail = ProductDetail::find($detail->product_detail_id);
                    $colorName = $productDetail->productColor->name;
                    $sizeName = $productDetail->productSize->name;
                    $NameProduct = $productDetail->product->name;
                    $ImageProduct = $productDetail->product->image;
                    $imageUrl = 'http://127.0.0.1:8000/storage/' . $ImageProduct;
                    if ($productDetail->product->price_sale) {

                        $PriceProduct = $productDetail->product->price_sale;
                    } else {
                        $PriceProduct = $productDetail->product->price;
                    }
                    $id = $detail->id;
                    if ($productDetail) {
                        $productsDetails[] = [
                            'colorName' => $colorName,
                            'sizeName' => $sizeName,
                            'NameProduct' => $NameProduct,
                            'PriceProduct' => $PriceProduct,
                            'id' => $id,
                            'ImageProduct' => $ImageProduct,
                            'product_detail' => $productDetail,
                            'quantity' => $detail->quantity,
                            'total_price' => $detail->price * $detail->quantity,
                            'imageUrl' => $imageUrl,
                        ];
                    }
                }

                return response()->json(['cart' => $productsDetails], 200);
            }

            return response()->json(['message' => 'Không có sản phẩm trong giỏ hàng'], 200);
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
        $cartDetail = CartDetail::find($id);
        if ($cartDetail) {
            $cartDetail->delete();
            return response()->json(['message' => 'Xóa thành công'], 200);
        } else {
            return response()->json(['message' => 'Giỏ hàng không có sản phẩm này'], 200);
        }
    }


}
