<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    // Phương thức tạo bình luận
    public function store(Request $request, $id)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'comment' => 'required|string|max:255',
            'rating' => 'required|integer|between:1,5',
            'parent_id' => 'nullable|exists:comments,id', // parent_id có thể null, parent_id chính là id comment
        ]);
    
        
        $productId = $id; 
    
        
        $productDetails = ProductDetail::where('product_id', $productId)->pluck('id')->toArray();
    
      
        $userId = auth()->id();
        $hasPurchased = OrderDetail::whereIn('product_detail_id', $productDetails)
            ->whereHas('Order', function($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->exists();
    
        if ($hasPurchased) {
            // Tạo bình luận
            $comment = Comment::create([
                'comment' => $validatedData['comment'],
                'rating' => $validatedData['rating'],
                'user_id' => $userId,
                'product_id' => $productId, // Sử dụng product_id đã lấy
                'parent_id' => $validatedData['parent_id'] ?? null, // Nếu không có parent_id thì là bình luận mới
                'status' => 1,
            ]);
        } else {
            return response()->json(['message' => 'Bạn cần mua sản phẩm này trước khi bình luận.'], 403);
        }
    
        return response()->json([
            'message' => 'Bình luận đã được thêm thành công.',
            'comment' => $comment,
        ], 201);
    }
    

    // Lấy tất cả bình luận kèm replies
    public function index($productId)
    {
        $comments = Comment::where('product_id', $productId)
                            ->whereNull('parent_id') // Chỉ lấy bình luận gốc
                            ->with('replies') // Lấy các bình luận con (replies)
                            ->get();

        return response()->json($comments, 200);
    }
}
