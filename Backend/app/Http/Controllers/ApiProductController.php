<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Promotion;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class ApiProductController extends Controller
{
    public function productDetail(string $id, string $sub_category_id)
    {
        $product = Product::findOrFail($id);
        $subCategory = SubCategory::findOrFail($sub_category_id);
        $productSubCategory = $subCategory->product; 
        $product->view = $product->view + 1; 
        $product->save();
        return response()->json([
            'Product' => $product,
            'ProductSubCategory' => $productSubCategory,
        ], 200);
    }
    public function promotion()
    {
        $promotion = Promotion::all(); // Hoặc sử dụng pagination nếu dữ liệu nhiều
        $data = [
            'status' => 'success',
            'data' => $promotion,
        ];
        return response()->json($data);
    }
    public function subcategory()
    {
        $category = SubCategory::all(); // Hoặc sử dụng pagination nếu dữ liệu nhiều
        $data = [
            'status' => 'success',
            'data' => $category,
        ];
        return response()->json($data);
    }
}
