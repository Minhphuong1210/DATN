<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductDetail;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
   public function Dashboard(){
      $totalmoney = Order::sum('total_amount');
      $totalBoughtProduct = OrderDetail::sum('quantity');
      $totalProduct = ProductDetail::sum('quantity');
      // dd($totalProduct);
    return view('dashboard',compact('totalmoney','totalBoughtProduct','totalProduct'));
   }
}
