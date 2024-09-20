<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discounts = Discount::with('category')->get();
        return view('Admin.Discount.index', compact('discounts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return view('Admin.Discount.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd ($request->all());
        $request->validate([
            'category_id' => 'required|integer',
            'discount_percent' => 'required|numeric|min:0|max:100',
            'is_active' => 'required|boolean',
        ]);

        Discount::create($request->all());
        return redirect()->route('admins.discounts.index')->with('success','Discount add successfully');

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
        $discount = Discount::findOrFail($id);
        $categories = Category::all(); // Lấy tất cả các danh mục
        return view('Admin.Discount.edit', compact('discount', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'category_id' => 'integer',
            'discount_percent' => 'numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $discount = Discount::findOrFail($id);
        $discount->update($request->all());
        return redirect()->route('admins.discounts.index')->with('success', 'Discount updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $discount = Discount::findOrFail($id);
        $discount->delete();
        return redirect()->route('admins.discounts.index')->with('success', 'Discount deleted successfully.');
    }
}
