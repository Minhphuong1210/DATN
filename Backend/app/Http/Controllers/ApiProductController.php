<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Promotion;
use App\Models\ProductColor;
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
    public function indexProductSize()
    {
        $productSizes = ProductSize::all();
        return response()->json($productSizes);
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
    public function color(){
        $productColor=ProductColor::all();
        return response()->json([
            'productColor'=>$productColor,
        ]);
    }
    public function size(){
        $productSize = ProductSize::all();
        return response()->json([
            'productSize'=>$productSize,
        ]);

    }


   


}
