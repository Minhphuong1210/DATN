<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::query()->where('is_active','1')->limit('8')->get(); // Hoặc sử dụng pagination nếu dữ liệu nhiều
        $products_sale = Product::query()->where('is_active','1')->where('is_sale','1')->limit('8')->get(); // Hoặc sử dụng pagination nếu dữ liệu nhiều
        $products_hot = Product::query()->where('is_active','1')->where('is_hot','1')->limit('8')->get(); // Hoặc sử dụng pagination nếu dữ liệu nhiều
        $products_showhome = Product::query()->where('is_active','1')->where('is_show_home','1')->limit('8')->get(); // Hoặc sử dụng pagination nếu dữ liệu nhiều
        $data = [
            'status' => 'success',
            'products' => $products,
            'products_sale'=> $products_sale,
            'products_hot'=> $products_hot,
            'products_showhome'=> $products_showhome,
        ];
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
}
