<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ProductSizeController;
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
// Route::middleware(['auth', 'auth.admin'])
//     ->prefix('admins')
//     ->as('admins.')
//     ->group(function () {
//         Route::prefix('orders')
//             ->as('orders.')
//             ->group(function () {
//                 Route::get('/', [OrderController::class, 'index'])->name('index');
//                 Route::get('/create', [OrderController::class, 'create'])->name('create');
//                 Route::post('/store', [OrderController::class, 'store'])->name('store');
//                 Route::get('/show/{id}', [OrderController::class, 'show'])->name('show');
//                 Route::get('/{id}/edit', [OrderController::class, 'edit'])->name('edit');
//                 Route::put('/{id}/update', [OrderController::class, 'update'])->name('update');
//                 Route::delete('/{id}/destroy', [OrderController::class, 'destroy'])->name('destroy');
//             }); 
//     });

Route::prefix('admins')
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
    Route::prefix('admins')
    ->as('admins.')
    ->group(function () {
        Route::prefix('discounts')
            ->as('discounts.')
            ->group(function () {
                Route::get('/', [DiscountController::class, 'index'])->name('index');
                Route::get('/create', [DiscountController::class, 'create'])->name('create');
                Route::post('/store', [DiscountController::class, 'store'])->name('store');
                Route::get('/show/{id}', [DiscountController::class, 'show'])->name('show');
                Route::get('/{id}/edit', [DiscountController::class, 'edit'])->name('edit');
                Route::put('/{id}/update', [DiscountController::class, 'update'])->name('update');
                Route::delete('/{id}/destroy', [DiscountController::class, 'destroy'])->name('destroy');
            }); 
    });
    Route::prefix('admins')
    ->as('admins.')
    ->group(function () {
        Route::prefix('product_sizes')
            ->as('product_sizes.')
            ->group(function () {
                Route::get('/', [ProductSizeController::class, 'index'])->name('index');
                Route::get('/create', [ProductSizeController::class, 'create'])->name('create');
                Route::post('/store', [ProductSizeController::class, 'store'])->name('store');
                Route::get('/show/{id}', [ProductSizeController::class, 'show'])->name('show');
                Route::get('/{id}/edit', [ProductSizeController::class, 'edit'])->name('edit');
                Route::put('/{id}/update', [ProductSizeController::class, 'update'])->name('update');
                Route::delete('/{id}/destroy', [ProductSizeController::class, 'destroy'])->name('destroy');
            }); 
    });




