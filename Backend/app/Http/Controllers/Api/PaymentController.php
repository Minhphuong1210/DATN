<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Tăng thời gian chờ lên 30 giây
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function payment_momo(Request $request)
    {
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = "Thanh toán qua ATM MoMo";
        $amount = $request->amount; // Bạn có thể lấy giá trị này từ request nếu cần thiết
        $orderId = time() . "";
        $redirectUrl = "http://localhost:5173/checkout";
        $ipnUrl = "http://localhost:5173/checkout";
        $extraData = "";

        $requestId = time() . "";
        $requestType = "payWithATM";
        
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );

        $result = $this->execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true);

        // Kiểm tra nếu có lỗi trong phản hồi từ MoMo
        if (isset($jsonResult['errorCode']) && $jsonResult['errorCode'] != 0) {
            return response()->json([
                'error' => true,
                'message' => $jsonResult['localMessage'] ?? 'Có lỗi xảy ra',
                'errorCode' => $jsonResult['errorCode']
            ], 400);
        }
// Trả về JSON response với URL thanh toán nếu thành công
        if (isset($jsonResult['payUrl'])) {
            return response()->json([
                'error' => 'Đã tìm thấy trang thanh toán',
                'payUrl' => $jsonResult['payUrl']
            ]);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Không tìm thấy URL thanh toán'
            ], 400);
        }
    }
}