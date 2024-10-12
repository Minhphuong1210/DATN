<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiOrderController;
use App\Http\Controllers\api\ApiWishlistController;
use App\Http\Controllers\Api\CategoryController;

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\ApiProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ProductController;


use App\Http\Controllers\Api\PaymentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Group route liên quan đến tài khoản
Route::prefix('user')->middleware('auth:sanctum')->group(function () {
    Route::get('show/{id}', [ApiAuthController::class, 'show']); // Lấy thông tin người dùng
    Route::put('update/{id}', [ApiAuthController::class, 'update']); // Cập nhật thông tin người dùng
    Route::post('logout', [ApiAuthController::class, 'logout']); // Đăng xuất
});
Route::post('/payment/momo', [PaymentController::class,'payment_momo']);
Route::get('forgot_password',[ApiAuthController::class, 'forgot_password']);
Route::post('check_forgot_password',[ApiAuthController::class, 'check_forgot_password']);
// từ đây có thể xử lí thường
Route::get('reset_password/{token}',[ApiAuthController::class, 'reset_password'])->name('account.reset_password');
Route::post('reset_password/{token}',[ApiAuthController::class, 'check_reset_password']);
// Group route liên quan đến giỏ hàng 
Route::prefix('cart')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [CartController::class, 'cart_detail']); // Xem giỏ hàng
    Route::post('/add', [CartController::class, 'store']); // Thêm sản phẩm vào giỏ
    Route::put('/{id}/update', [CartController::class, 'update']); // Cập nhật số lượng sản phẩm trong giỏ
    Route::delete('/{id}/delete', [CartController::class, 'destroy']); // Xóa sản phẩm khỏi giỏ
});

// Group route liên quan đến đơn hàng 
Route::middleware('auth:sanctum')->prefix('donhangs')->as('donhangs.')->group(function () {
    Route::get('/', [ApiOrderController::class, 'index'])->name('index'); // Danh sách đơn hàng
    Route::get('/create', [ApiOrderController::class, 'create'])->name('create'); // Tạo đơn hàng
    Route::post('/store', [ApiOrderController::class, 'store'])->name('store'); // Lưu đơn hàng
    Route::get('/show/{id}', [ApiOrderController::class, 'show'])->name('show'); // Xem chi tiết đơn hàng
    Route::put('/{id}/update', [ApiOrderController::class, 'update'])->name('update'); // Cập nhật đơn hàng
});

// Route liên quan đến sản phẩm và danh mục (không cần xác thực)
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('wishlist/add', [ApiWishlistController::class, 'addProductToWishlist']);
    Route::delete('wishlist/remove/{productId}', [ApiWishlistController::class, 'removeProductFromWishlist']);
    Route::get('wishlist', [ApiWishlistController::class, 'getWishlist']);
});
Route::post('applyPromotion',[PromotionController::class,'applyPromotion']);
