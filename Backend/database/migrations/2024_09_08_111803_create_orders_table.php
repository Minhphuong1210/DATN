<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code_order')->unique();
            $table->unsignedBigInteger('user_id');
            $table->string('username');
            $table->string('phone');
            $table->string('address');
            $table->string('email');
            $table->text('note')->nullable();
            $table->string('order_status')->nullable();
            $table->string('order_payment')->nullable();
            $table->double('commodity_money', 8, 2)->nullable();
            $table->double('total_amount', 8, 2);
            $table->unsignedBigInteger('shipping_id')->nullable();
            $table->unsignedBigInteger('promotion_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('shipping_id')->references('id')->on('shippings')->onDelete('set null');
            $table->foreign('promotion_id')->references('id')->on('promotions')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
