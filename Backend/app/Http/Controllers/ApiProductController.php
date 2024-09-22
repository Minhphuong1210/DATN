<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SubCategory;
use App\Models\ProductSize;
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
    public function indexProductSize()
    {
        $productSizes = ProductSize::all();
        return response()->json($productSizes);
    }

    // Tạo kích thước sản phẩm (trả về form tạo)
    public function createProductSize()
    {
    
    }

    // Lưu kích thước sản phẩm
    public function storeProductSize(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $productSize = ProductSize::create($request->all());
        return response()->json($productSize, 201);
    }

    // Cập nhật kích thước sản phẩm
    public function updateProductSize(Request $request, $id)
    {
        $productSize = ProductSize::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $productSize->update($request->all());
        return response()->json($productSize);
    }

    // Xóa kích thước sản phẩm
    public function destroyProductSize($id)
    {
        $productSize = ProductSize::findOrFail($id);
        $productSize->delete();

        return response()->json(['message' => 'Kích thước sản phẩm đã được xóa thành công.'], 204);
    }
}
