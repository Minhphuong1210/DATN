<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;
    protected $table = 'product_details';
    protected $fillable = ['size_id', 'color_id', 'product_id', 'quantity'];
  
    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function productColor(){
        return $this->belongsTo(ProductColor::class);
    }
    public function productSize(){
        return $this->belongsTo(ProductSize::class);

    }
}

