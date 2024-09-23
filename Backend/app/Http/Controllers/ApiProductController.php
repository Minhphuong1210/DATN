<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductSize;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class ApiProductController extends Controller
{
    public function productDetail(string $id, string $sub_category_id)
    {
        $product = Product::findOrFail($id);
        $subCategory = SubCategory::findOrFail($sub_category_id);
        $productSize = ProductSize::all();
        $productColor=ProductColor::all();
        $productSubCategory = $subCategory->product;
        $product->view = $product->view + 1;
        $product->save();
        return response()->json([
            'productSize'=>$productSize,
            'productColor'=>$productColor,
            'Product' => $product,
            'ProductSubCategory' => $productSubCategory,
        ], 200);
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
