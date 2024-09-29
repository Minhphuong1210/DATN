<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\ProductColor;
use App\Models\SubCategory;
use App\Models\ProductSize;
use App\Models\Shipping;
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
        $promotion = Promotion::all(); 
        $data = [
            'status' => 'success',
            'data' => $promotion,
        ];
        return response()->json($data);
    }
    public function subcategory()
    {
        $category = SubCategory::all(); 
        $data = [
            'status' => 'success',
            'data' => $category,
        ];
        return response()->json($data);
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


    public function Shipping()
    {
        $Shipping = Shipping::all(); 
        $data = [
            'status' => 'success',
            'data' => $Shipping,
        ];
        return response()->json($data);
    }

    public function Banner(){
        $banner = Banner::all();
        $data = [
            'status' => 'success',
            'data' => $banner,
        ];
        return response()->json($data);
    }

}
