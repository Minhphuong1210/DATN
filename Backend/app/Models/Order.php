<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'code_order',
        'user_id',
        'username',
        'phone',
        'address',
        'email',
        'note',
        'order_status',
        'order_payment',
        'commodity_money',
        'total_amount',
        'shipping_id',
        'promotion_id'
    ];
}
