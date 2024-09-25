<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SubCategoryController;

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
//         Route::prefix('category')
//             ->as('category.')
//             ->group(function () {
//                 Route::get('/', [CategoryController::class, 'index'])->name('index');
//                 Route::get('/create', [CategoryController::class, 'create'])->name('create');
//                 Route::post('/store', [CategoryController::class, 'store'])->name('store');
//                 Route::get('/{id}/edit', [CategoryController::class, 'edit'])->name('edit');
//                 Route::put('/{id}/update', [CategoryController::class, 'update'])->name('update');
//                 Route::delete('/{id}/destroy', [CategoryController::class, 'destroy'])->name('destroy');
//             });
//     });


    // Phuong bảo bỏ nhóm 
    // Route::prefix('admins')
    // ->as('admins.')
    // ->group(function () {
    //     Route::prefix('orders')
    //         ->as('orders.')
    //         ->group(function () {
    //             Route::get('/', [OrderController::class, 'index'])->name('index');
    //             Route::get('/create', [OrderController::class, 'create'])->name('create');
    //             Route::post('/store', [OrderController::class, 'store'])->name('store');
    //             Route::get('/show/{id}', [OrderController::class, 'show'])->name('show');
    //             Route::get('/{id}/edit', [OrderController::class, 'edit'])->name('edit');
    //             Route::put('/{id}/update', [OrderController::class, 'update'])->name('update');
    //             Route::delete('/{id}/destroy', [OrderController::class, 'destroy'])->name('destroy');
    //         });
            
    //     Route::prefix('category')
    //         ->as('category.')
    //         ->group(function () {
    //             Route::get('/', [CategoryController::class, 'index'])->name('index');
    //             Route::get('/create', [CategoryController::class, 'create'])->name('create');
    //             Route::post('/store', [CategoryController::class, 'store'])->name('store');
    //             Route::get('/{id}/edit', [CategoryController::class, 'edit'])->name('edit');
    //             Route::put('/{id}/update', [CategoryController::class, 'update'])->name('update');
    //             Route::delete('/{id}/destroy', [CategoryController::class, 'destroy'])->name('destroy');
    //         });
    // });




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
Route::get('/showLogin',[AuthController::class,'showLogin'])->name('showLogin');

Route::post('/login',[AuthController::class,'login'])->name('login');
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
        Route::prefix('category')
            ->as('category.')
            ->group(function () {
                Route::get('/', [CategoryController::class, 'index'])->name('index');
                Route::get('/create', [CategoryController::class, 'create'])->name('create');
                Route::post('/store', [CategoryController::class, 'store'])->name('store');
                Route::get('/{id}/edit', [CategoryController::class, 'edit'])->name('edit');
                Route::put('/{id}/update', [CategoryController::class, 'update'])->name('update');
                Route::delete('/{id}/destroy', [CategoryController::class, 'destroy'])->name('destroy');
            });

            
            Route::prefix('subcategory')
            ->as('subcategory.')
            ->group(function () {
                Route::get('/', [SubCategoryController::class, 'index'])->name('index');
                Route::get('/create', [SubCategoryController::class, 'create'])->name('create');
                Route::post('/store', [SubCategoryController::class, 'store'])->name('store');
                Route::get('/show/{id}', [SubCategoryController::class, 'show'])->name('show');
                Route::get('/{id}/edit', [SubCategoryController::class, 'edit'])->name('edit');
                Route::put('/{id}/update', [SubCategoryController::class, 'update'])->name('update');
                Route::delete('/{id}/destroy', [SubCategoryController::class, 'destroy'])->name('destroy');
            }); 

        Route::prefix('banner')
        ->as('banner.')
        ->group(function () {
            Route::get('/', [BannerController::class, 'index'])->name('index');
            Route::get('/create', [BannerController::class, 'create'])->name('create');
            Route::post('/store', [BannerController::class, 'store'])->name('store');
            Route::get('/{id}/edit', [BannerController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [BannerController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [BannerController::class, 'destroy'])->name('destroy');
        });
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
           Route::prefix('subcategory')
            ->as('subcategory.')
            ->group(function () {
                Route::get('/', [SubCategoryController::class, 'index'])->name('index');
                Route::get('/create', [SubCategoryController::class, 'create'])->name('create');
                Route::post('/store', [SubCategoryController::class, 'store'])->name('store');
                Route::get('/show/{id}', [SubCategoryController::class, 'show'])->name('show');
                Route::get('/{id}/edit', [SubCategoryController::class, 'edit'])->name('edit');
                Route::put('/{id}/update', [SubCategoryController::class, 'update'])->name('update');
                Route::delete('/{id}/destroy', [SubCategoryController::class, 'destroy'])->name('destroy');
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


