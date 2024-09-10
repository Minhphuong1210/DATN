<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Whishlist extends Model
{
    use HasFactory;
    protected $table = 'wishlists';
    protected $fillable = ['like', 'user_id', 'product_id'];
}
