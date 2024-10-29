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
        Schema::create('vnpays', function (Blueprint $table) {
            $table->id();
            $table->string('vnp_Amount'); // giá tiền

            $table->string('vnp_BankCode'); // Ngân hàng
            $table->string('vnp_BankTranNo'); //mã giao dịch ngân hàng
            $table->string('vnp_CardType'); // atm hoặc qr
            $table->string('vnp_OrderInfo'); // thông tin
            $table->string('vnp_PayDate'); // ngày giờ thanh toán
            $table->string('vnp_ResponseCode'); // trạng thái thanh toán
            $table->string('vnp_TmnCode'); 
            $table->string('vnp_TransactionStatus'); 
            $table->string('vnp_TxnRef');
            $table->string('vnp_SecureHash');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vnpays');
    }
};
