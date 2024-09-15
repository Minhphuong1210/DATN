<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\Controller;
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
Route::get('login',[OrderController::class ,'showFormLogin'])->name('login');
Route::post('/postLogin',[OrderController::class ,'login'])->name('postLogin');

Route::middleware(['auth', 'auth.admin'])
    ->prefix('admins')
    ->as('admins.')
    ->group(function () {
        Route::prefix('orders')
            ->as('orders.')
            ->group(function () {
                Route::get('/', [OrderController::class, 'index'])->name('index');
                Route::get('/create', [OrderController::class, 'create'])->name('create');
                Route::post('/store', [OrderController::class, 'store'])->name('store');
                Route::get('/show/{id}', [OrderController::class, 'show'])->name('show');
                Route::get('/{id}/edit', [OrderController::class, 'edit'])->name('edit');
                Route::put('/{id}/update', [OrderController::class, 'update'])->name('update');
                Route::delete('/{id}/destroy', [OrderController::class, 'destroy'])->name('destroy');
            });
       
       
       
    });



