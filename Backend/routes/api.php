<?php
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiOrderController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\ApiProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    // API để lấy giỏ hàng
    Route::get('/cart', [CartController::class, 'cart_detail'])->name('api.cart.detail');

    // API thêm sản phẩm vào giỏ hàng
    Route::post('/cart', [CartController::class, 'store'])->name('api.cart.store');

    // API cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/cart/{id}', [CartController::class, 'update'])->name('api.cart.update');

    // API xóa sản phẩm khỏi giỏ hàng
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('api.cart.destroy');
});

Route::resource('/products', ProductController::class);
Route::resource('/categorys', CategoryController::class);
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

