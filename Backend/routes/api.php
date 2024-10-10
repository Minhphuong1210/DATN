<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiOrderController;
use App\Http\Controllers\Api\CategoryController;

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\ApiProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PaymentController;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    // API để lấy giỏ hàng
    Route::get('/cart', [CartController::class, 'cart_detail']);

    // API thêm sản phẩm vào giỏ hàng
    Route::post('/cart/add', [CartController::class, 'store']);

    // API cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/cart/{id}/update', [CartController::class, 'update']);

    // API xóa sản phẩm khỏi giỏ hàng
    Route::delete('/cart/{id}/delete', [CartController::class, 'destroy']);
});
// lấy sản phẩm product
Route::resource('/products', ProductController::class);
Route::resource('/categorys', CategoryController::class);

// Các API khác (không yêu cầu xác thực)
Route::get('/promotion', [ApiProductController::class, 'promotion']); // Lấy thông tin khuyến mãi
Route::get('/subcategory', [ApiProductController::class, 'subcategory']); // Lấy danh mục con
Route::get('/banner', [ApiProductController::class, 'Banner']); // Lấy thông tin banner
Route::get('/productDetai/{id}/subcate/{sub_category_id}', [ApiProductController::class, 'productdetail']); // Chi tiết sản phẩm theo danh mục con
Route::get('/color', [ApiProductController::class, 'color']); // Lấy thông tin màu sản phẩm
Route::get('/size', [ApiProductController::class, 'size']); // Lấy thông tin kích thước sản phẩm
Route::get('/Shipping', [ApiProductController::class, 'Shipping']); // Lấy thông tin vận chuyển

// Đăng ký, đăng nhập
Route::post('login', [ApiAuthController::class, 'login']);
Route::post('register', [ApiAuthController::class, 'register']);

// Form liên hệ
Route::post('contas', [ApiProductController::class, 'contasUs']);
// Tìm sản phẩm
Route::get('/search', [ProductController::class, 'search']);