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
    Route::get('/cart', [CartController::class, 'cart_detail']);

    // API thêm sản phẩm vào giỏ hàng
    Route::post('/cart/add', [CartController::class, 'store']);

    // API cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/cart/{id}/update', [CartController::class, 'update']);

    // API xóa sản phẩm khỏi giỏ hàng
    Route::delete('/cart/{id}/delete', [CartController::class, 'destroy']);
});

Route::resource('/products', ProductController::class);
Route::resource('/categorys', CategoryController::class);
Route::get('/promotion',[ ApiProductController::class,'promotion']);
Route::get('/subcategory', [ApiProductController::class,'subcategory']);
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
Route::prefix('productSizes')
    ->as('productSizes.')
    ->group(function () {
        Route::get('/', [\App\Http\Controllers\ApiProductController::class, 'indexProductSize'])->name('indexProductSize');
        Route::get('/create', [\App\Http\Controllers\ApiProductController::class, 'createProductSize'])->name('createProductSize');
        Route::post('/store', [\App\Http\Controllers\ApiProductController::class, 'storeProductSize'])->name('storeProductSize');
        Route::put('/{id}/update', [\App\Http\Controllers\ApiProductController::class, 'updateProductSize'])->name('updateProductSize');
        Route::delete('/{id}', [\App\Http\Controllers\ApiProductController::class, 'destroyProductSize'])->name('destroyProductSize'); 
    });


Route::get('productDetai/{id}/subcate/{sub_category_id}',[ApiProductController::class,'productdetail']);
Route::get('color',[ApiProductController::class,'color']);
Route::get('size',[ApiProductController::class,'size']);
