<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Product =Product::all();
        // dd($Product);
        return view('Admin.Product.index',compact('Product'));
    }

  
    
   
}
