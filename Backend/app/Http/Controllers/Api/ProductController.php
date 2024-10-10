<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::query()->where('is_active', '1')
            ->orderBy('created_at', 'desc')
            ->limit('8')->get();
        $products_sale = Product::query()
            ->select('id', 'image', 'name', 'price', 'sub_category_id','price_sale')
            ->where('is_active', '1')
            ->where('is_sale', '1')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        $products_showhome = Product::query()
            ->select('id', 'image', 'name', 'price', 'sub_category_id','price_sale')
            ->where('is_active', '1')
            ->where('is_show_home', '1')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        $products_hot = Product::query()
            ->select('id', 'image', 'name', 'price', 'sub_category_id','price_sale')
            ->where('is_active', '1')
            ->where('is_hot', '1')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        $data = [
            'status' => 'success',
            'products' => $products,
            'products_sale' => $products_sale,
            'products_hot' => $products_hot,
            'products_showhome' => $products_showhome,
        ];
        $discounts = Discount::with('subCategory')->orderBy('created_at', 'desc')->get();
        $sub_category_ids = $discounts->pluck('sub_category_id');
        $products = Product::query()->whereIn('sub_category_id', $sub_category_ids)->get();
        foreach ($products as $product) {
            $discount = $discounts->firstWhere('sub_category_id', $product->sub_category_id);
        
            if ($discount) {
                $now = Carbon::now('Asia/Ho_Chi_Minh');
                $expires_at = Carbon::parse($discount->expires_at);
                foreach ($discounts as $key => $value) {
                    if ($now->lessThan($expires_at)) {
                        $sale = $product->price *$value->discount_percent / 100;
                        $product->discount_id = $discount->id;
                        $product->price_sale = $product->price - $sale;
                    } else {
                        $product->discount_id = null;
                        $product->price_sale = null;
                        $product->is_active = 0;
                    }
                }
            } else {
                $product->discount_id = null;
                $product->price_sale = null;
            }
            $saved = $product->save();
        }

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
    public function search(Request $request)
    {
        $query = $request->input('q', '');

        // Thêm logic tìm kiếm sản phẩm của bạn
        $products = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->orWhereRaw('CAST(price AS CHAR) like ?', ['%' . $query . '%'])
            ->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }

        return response()->json($products);
    }


}
