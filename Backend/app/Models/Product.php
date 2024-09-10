<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'price',
        'discount_id',
        'image',
        'description',
        'content',
        'view',
        'is_sale',
        'is_hot',
        'is_show_home',
        'is_active',
        'product_code',
        'sub_category_id'
    ];
}
