<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function applyPromotion(Request $request)
    {
        $code = $request->input('code');
        $totalPrice = $request->input('total_price');
        // $totalPrice = 200;
    
        // Tìm mã khuyến mãi
        $promotion = Promotion::where('code', $code)
                              ->where('status', 'active')
                              ->where('start_date', '<=', now())
                              ->where('end_date', '>=', now())
                              ->first();
        if (!$promotion) {
            return response()->json(['message' => 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn'], 400);
        }
    
        // Kiểm tra số lần sử dụng còn lại (nếu có giới hạn)
        if ($promotion->usage_limit !== null && $promotion->usage_limit <= 0) {
            return response()->json(['message' => 'Mã khuyến mãi đã hết lượt sử dụng'], 400);
        }
    
        // Kiểm tra số tiền tối thiểu để áp dụng mã
        if ($promotion->minimum_spend > $totalPrice) {
            return response()->json(['message' => 'Bạn cần mua thêm sản phẩm để áp dụng mã khuyến mãi này'], 400);
        }
    
        // Tính toán giá trị giảm giá
        if ($promotion->discount_type == 'percentage') {
            $discountAmount = $totalPrice * ($promotion->discount / 100);
        } else {
            $discountAmount = $promotion->discount;
        }
    
        // Áp dụng mã khuyến mãi
        $newTotal = $totalPrice - $discountAmount;
    
        // Giảm số lượng sử dụng (nếu có giới hạn)
        if ($promotion->usage_limit !== null) {
            $promotion->decrement('usage_limit');
        }
    
        return response()->json([
            'message' => 'Mã khuyến mãi đã được áp dụng',
            'total_price_after_discount' => $newTotal,
            'discount_amount' => $discountAmount
        ]);
    }
    

}
