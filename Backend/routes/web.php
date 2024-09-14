<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

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
// Route::get('/Product',[CartController::class,'Product'])->name('Product');
// Route::get('/DetalProduct/{id}',[CartController::class,'DetalProduct'])->name('DetalProduct');
// Route::post('/cart_add',[CartController::class,'store'])->name('cart_add');
// // Route::get('/order',[OrderController::class,'create'])->name('order.create');
// Route::get('/order_add',[OrderController::class,'create'])->name('order.create');
// Route::post('/order_add',[OrderController::class,'store'])->name('order_store');
// Route::get('login',[OrderController::class ,'login'])->name('login');
// Route::post('/postLogin',[OrderController::class ,'postLogin'])->name('postLogin');



