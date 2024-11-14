
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
Route::middleware('auth:sanctum')->group(function () {
    // API để lấy giỏ hàng
    Route::get('/cart', [CartController::class, 'cart_detail']);
    // API thêm sản phẩm vào giỏ hàng
    Route::post('/cart/add', [CartController::class, 'store']);


    // API thêm sản phẩm vào giỏ hàng
    Route::post('/cart/add', [CartController::class, 'store']);


    // API cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/cart/{id}/update', [CartController::class, 'update']);



    // API cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/cart/{id}/update', [CartController::class, 'update']);


    // API xóa sản phẩm khỏi giỏ hàng
    Route::delete('/cart/{id}/delete', [CartController::class, 'destroy']);
    //Sản phẩm gần đây
 Route::post('/products/viewed', [ProductController::class, 'addRecentlyViewed']);
 Route::get('/products/recently-viewed', [ProductController::class, 'getRecentlyViewed']);


});
// lấy sản phẩm product
Route::resource('/products', ProductController::class);
// lấy sản phẩm category
Route::resource('/categorys', CategoryController::class);
// lấy sản phẩm promotion
Route::get('/promotion',[ ApiProductController::class,'promotion']);
// Payment
Route::post('/payment/momo', [PaymentController::class, 'payment_momo']);

Route::get('/subcategory', [ApiProductController::class,'subcategory']);
// banner
Route::get('/banner', [ApiProductController::class,'Banner']);
// Tìm sản phẩm theo danh mục
Route::get('/category/{name}/products', [ProductController::class, 'getProductsByCategory']);
// Lọc sản phẩm theo color và size
Route::get('/filter-products', [ProductController::class, 'filter']);
// Lọc sản phẩm theo giá min và max
Route::get('/products/filter-by-price', [ProductController::class, 'filterByPrice']);

 
Route::post('login',[ApiAuthController::class,'login']);
Route::post('register',[ApiAuthController::class,'register']);
Route::post('logout',[ApiAuthController::class,'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')
    ->prefix('donhangs')
    ->as('donhangs.')
    ->group(function () {
        Route::get('/', [ApiOrderController::class, 'index'])->name('index');
        Route::get('/create', [ApiOrderController::class, 'create'])->name('create');
        Route::post('/store', [ApiOrderController::class, 'store'])->name('store');
        Route::get('/show/{id}', [ApiOrderController::class, 'show'])->name('show');
        Route::put('/{id}/update', [ApiOrderController::class, 'update'])->name('update');

});

Route::get('productDetai/{id}/subcate/{sub_category_id}',[ApiProductController::class,'productdetail']);
Route::get('color',[ApiProductController::class,'color']);
Route::get('size',[ApiProductController::class,'size']);
Route::get('Shipping',[ApiProductController::class,'Shipping']);
Route::get('/discount', [ApiProductController::class, 'discount']);
Route::post('applyPromotion',[PromotionController::class,'applyPromotion']);

// Form liên hệ
Route::post('contas', [ApiProductController::class, 'contasUs']);

// Tìm sản phẩm
Route::get('/search', [ProductController::class, 'search']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('wishlist/add', [ApiWishlistController::class, 'addProductToWishlist']);
    Route::delete('wishlist/remove/{productId}', [ApiWishlistController::class, 'removeProductFromWishlist']);
    Route::get('wishlist', [ApiWishlistController::class, 'getWishlist']);
});
Route::post('/comment/{id}',[CommentController::class,'store'])->middleware('auth:sanctum');

Route::put('/userEdit/{id}',[ApiAuthController::class,'update'])->middleware('auth:sanctum');



// thanh toán onl bằng vn_pay
Route::post('/vnpay/payment',[PaymentController::class,'vn_pay'])->name('vn_pay');
Route::put('vnpay/store/{vnp_TxnRef}',[PaymentController::class,'vnPayUpdate']);



