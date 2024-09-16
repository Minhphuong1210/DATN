<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $listDonHang = Order::query()->orderByDesc('id')->get();
        // dd($listDonHang);
        $trangThaiDonHang = Order::TRANG_THAI_DON_HANG;
        foreach ($trangThaiDonHang as $key => $value) {
            $key_trang_thai = $key;
            $value_trang_thai = $value;
        }
        return view('Admin.Orders.index', compact('listDonHang', 'trangThaiDonHang', 'key_trang_thai', 'value_trang_thai'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
