<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CartController;
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
    // API để lấy chi tiết sản phẩm
    Route::get('/products/{id}', [CartController::class, 'DetalProduct'])->name('api.product.detail');

    // API để lấy danh sách sản phẩm
    Route::get('/products', [CartController::class, 'Product'])->name('api.products');

    // API để lấy giỏ hàng
    Route::get('/cart', [CartController::class, 'cart_detail'])->name('api.cart.detail');

    // API thêm sản phẩm vào giỏ hàng
    Route::post('/cart', [CartController::class, 'store'])->name('api.cart.store');

    // API cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/cart/{id}', [CartController::class, 'update'])->name('api.cart.update');

    // API xóa sản phẩm khỏi giỏ hàng
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('api.cart.destroy');
});
