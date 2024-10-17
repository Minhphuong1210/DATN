<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Product;
use App\Models\ProductDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::query()
        ->where('is_active', '1')
        ->with('discount') // Eager load the related discount
        ->orderBy('created_at', 'desc')
        ->limit(8)
        ->get();

    $products_sale = Product::query()
        ->select('id', 'image', 'name', 'price', 'sub_category_id', 'price_sale', 'discount_id')
        ->where('is_active', '1')
        ->where('is_sale', '1')
        ->with('discount') // Eager load the related discount
        ->orderBy('created_at', 'desc')
        ->limit(8)
        ->get();

    $products_showhome = Product::query()
        ->select('id', 'image', 'name', 'price', 'sub_category_id', 'price_sale', 'discount_id')
        ->where('is_active', '1')
        ->where('is_show_home', '1')
        ->with('discount') // Eager load the related discount
        ->orderBy('created_at', 'desc')
        ->limit(8)
        ->get();

    $products_hot = Product::query()
        ->select('id', 'image', 'name', 'price', 'sub_category_id', 'price_sale', 'discount_id')
        ->where('is_active', '1')
        ->where('is_hot', '1')
        ->with('discount') // Eager load the related discount
        ->orderBy('created_at', 'desc')
        ->limit(8)
        ->get();

    // Format the data for the API response
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
        $query = $request->input('q');

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
    public function getProductsByCategory($name)
    {
        // Tìm category theo name
        $category = Category::where('name', $name)->first();
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        // Lấy tất cả các sản phẩm thông qua các sub-category của category này
        $products = $category->products()->get();
    
        // Kiểm tra nếu không có sản phẩm nào trong danh mục
        if ($products->isEmpty()) {
            return response()->json(['message' => 'Không có sản phẩm nào trong danh mục này'], 404);
        }
    
        // Trả về danh sách sản phẩm nếu có
        return response()->json($products);
    }
    
    // public function filter(Request $request)
    // {
    //     // Nhận tham số từ request (tên màu sắc và kích thước)
    //     $colorName = $request->input('color_name');
    //     $sizeName = $request->input('size_name');
    //     // Tạo query ban đầu
    //     $query = ProductDetail::query();

    //     // Lọc theo tên màu sắc nếu có
    //     if ($colorName) {
    //         $query->whereHas('color', function ($q) use ($colorName) {
    //             $q->where('name', 'like', '%' . $colorName . '%');
    //         });
    //     }

    //     // Lọc theo tên kích thước nếu có
    //     if ($sizeName) {
    //         $query->whereHas('size', function ($q) use ($sizeName) {
    //             $q->where('name', 'like', '%' . $sizeName . '%');
    //         });
    //     }

    //     // Lấy các sản phẩm với thông tin sản phẩm, màu sắc và kích thước
    //     $products = $query->with(['product', 'color', 'size'])->get();

    //     // Kiểm tra xem có sản phẩm nào không
    //     if ($products->isEmpty()) {
    //         return response()->json([
    //             'message' => 'Không tìm thấy sản phẩm nào phù hợp với màu sắc và kích thước bạn đã chọn.'
    //         ], 404);
    //     }

    //     // Trả về kết quả
    //     return response()->json($products);
    // }
    
    


}
