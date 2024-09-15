<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');

}); 
Route::get('/product',[CartController::class,'Product'])->name('product');
Route::get('/DetalProduct/{id}',[CartController::class,'DetalProduct'])->name('detalProduct');
Route::post('/cart_add', [CartController::class, 'store'])->name('cart_add');
Route::get('/cart', [CartController::class, 'index']);
Route::get('/showFormLogin',[CartController::class,'showFormLogin'])->name('showFormLogin');
Route::post('/login',[CartController::class,'login'])->name('login');
Route::get('/cart_detail',[CartController::class,'cart_detail'])->name('cart_detail');
Route::delete('/destroy/{id}',[CartController::class,'destroy'])->name('destroy');
Route::put('/update/{id}',[CartController::class,'update'])->name('update');

});




