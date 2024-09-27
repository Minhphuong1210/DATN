<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubCategoryRequest;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategory = SubCategory::with('category')->get();

        return view('Admin.SubCategory.index',compact('subcategory'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category_id = Category::all();
        return view('Admin.SubCategory.create',compact('category_id'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubCategoryRequest $request)
    {
        $data = $request->except('image');
    
        if($request->hasFile('image')){
            $pathImage = Storage::putFile('Images',$request->file('image'));
            $imageUrl = 'storage/' .$pathImage;
            $data['image'] = $imageUrl;
        }
        SubCategory::query()->create($data);

        return redirect()->route('admins.subcategory.index');
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
        $model = SubCategory::find($id);
        $category_id = Category::all();
        return view('Admin.SubCategory.update',compact('model','category_id'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubCategoryRequest $request, string $id)
    {
        $model = SubCategory::find($id);
        $data = $request->except('image');
    
        if($request->hasFile('image')){
            $pathImage = Storage::putFile('Images',$request->file('image'));
            $imageUrl = 'storage/' .$pathImage;
            $data['image'] = $imageUrl;
            if($model->image && file_exists($model->image)){
                unlink($model->image);
            }
        }else{
            $data['image'] = $model->image;
        }
        $model->update($data);

        return redirect()->route('admins.subcategory.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = SubCategory::find($id);
        if($model->image && file_exists($model->image)){
            unlink($model->image);
        }
        if($model->delete()){
            return back();
        }
    }
    
}
