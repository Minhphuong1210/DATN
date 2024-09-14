<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

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
// Route::get('/product',[CartController::class,'Product'])->name('product');
// Route::get('/DetalProduct/{id}',[CartController::class,'DetalProduct'])->name('detalProduct');
// Route::post('/cart_add', [CartController::class, 'store'])->name('cart_add');
