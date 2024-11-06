<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OrderConfirm;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Momo;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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
            //luu thong tin 
            $paymentData = [
                'partnerCode' => $partnerCode,
                'orderId' => $orderId,
                'requestId' => $requestId,
                'amount' => $amount,
                'orderInfo' => $orderInfo,
                'orderType' => $requestType,
                'transId' => $jsonResult['transId'] ?? null,
                'resultCode' => $jsonResult['resultCode'] ?? 0,
                'message' => $jsonResult['localMessage'] ?? '',
                'payType' => $jsonResult['payType'] ?? 'MoMo',
                'responseTime' => now(),
                'extraData' => $extraData,
                'signature' => $signature
            ];
    
            $paymentRecord = Momo::create($paymentData);
    
            return response()->json([
                'message' => 'Thanh toán thành công',
                'data' => $paymentRecord,
                'payUrl' => $jsonResult['payUrl']
            ]);
        } else {
            return response()->json([
                'error' => true,
    'message' => 'Không tìm thấy URL thanh toán'
            ], 400);
        }
    }

    public function vn_pay(Request $request){
        $data=$request->all();
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:5173/checkout";
        $vnp_TmnCode = "LG8QMIJN";//Mã website tại VNPAY 
        $vnp_HashSecret = "UJU18IW0GAGF7Z0XFXP621M5WZOS1TTW"; //Chuỗi bí mật

        $vnp_TxnRef = rand(00,9999);  // $_POST['order_id']; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này 
        // cái này phải thay đổi liên tục  
        $vnp_OrderInfo = "thanh toán hóa đơn";
        $vnp_OrderType = "thanh toán online";
        $vnp_Amount = $data['amount'] * 100;
        $vnp_Locale = "VN";
        $vnp_BankCode = "NCB";
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
       
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }
//var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00'
            ,
            'message' => 'success'
            ,
            'data' => $vnp_Url
        );
        if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }

        
        // vui lòng tham khảo thêm tại code demo
        // return response()->json([
        //     'message' => 'thành công',
        //     'vnp_Url' => $vnp_Url
        // ]);
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
            //luu thong tin 
            $paymentData = [
                'partnerCode' => $partnerCode,
                'orderId' => $orderId,
                'requestId' => $requestId,
                'amount' => $amount,
                'orderInfo' => $orderInfo,
                'orderType' => $requestType,
                'transId' => $jsonResult['transId'] ?? null,
                'resultCode' => $jsonResult['resultCode'] ?? 0,
                'message' => $jsonResult['localMessage'] ?? '',
                'payType' => $jsonResult['payType'] ?? 'MoMo',
                'responseTime' => now(),
                'extraData' => $extraData,
                'signature' => $signature
            ];
    
            $paymentRecord = Momo::create($paymentData);
        
return response()->json([
                'message' => 'Thanh toán thành công',
                'data' => $paymentRecord,
                'payUrl' => $jsonResult['payUrl']
            ]);
        } else {
            return response()->json([
                'error' => true,
    'message' => 'Không tìm thấy URL thanh toán'
            ], 400);
        }
    
    }
    public function vn_pay(Request $request){
        $data=$request->all();
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:5173/checkout";
        $vnp_TmnCode = "LG8QMIJN";//Mã website tại VNPAY 
        $vnp_HashSecret = "UJU18IW0GAGF7Z0XFXP621M5WZOS1TTW"; //Chuỗi bí mật

        $vnp_TxnRef = rand(00,9999);  // $_POST['order_id']; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này 
        // cái này phải thay đổi liên tục  
        $vnp_OrderInfo = "thanh toán hóa đơn";
        $vnp_OrderType = "thanh toán online";
        $vnp_Amount = $data['amount'] * 100;
        $vnp_Locale = "VN";
        $vnp_BankCode = "NCB";
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
       
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00'
            ,
            'message' => 'success'
            ,
            'data' => $vnp_Url
        );
if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }

        
        // vui lòng tham khảo thêm tại code demo
        // return response()->json([
        //     'message' => 'thành công',
        //     'vnp_Url' => $vnp_Url
        // ]);
    }

public function store(Request $request)
    {
        if ($request->isMethod('post')) {

            DB::beginTransaction();

            try {
                $user_id = Auth::id();
                if (!$user_id) {
                    return response()->json([
                        'error' => 'Người dùng chưa đăng nhập'
                    ], 401);
                }
                $params = $request->except('_token');
                $params['user_id'] = $user_id;
                $params['code_order'] = $this->generateUniqueOrderCode();
                $order = Order::create($params);
                $order_id = $order->id;
                $cart = Cart::where('user_id', $user_id)->first();
                if (!$cart) {
                    return response()->json([
                        'error' => 'Không có sản phẩm cần mua'
                    ], 404);
                }
                $cartDetails = CartDetail::where('cart_id', $cart->id)->get();
                if ($cartDetails->isEmpty()) {
                    return response()->json([
                        'error' => 'Giỏ hàng của bạn hiện đang trống'
                    ], 404);
                }

                foreach ($cartDetails as $item) {
                    $total = $item->price * $item->quantity;
                    OrderDetail::create([
                        'order_id' => $order_id,
                        'product_detail_id' => $item->product_detail_id,
                        'total' => $total,
                        'total_amount' => $total,
                        'quantity' => $item->quantity,
                        'price' => $item->price
                    ]);

                    $detail = ProductDetail::query()->where('id', $item->product_detail_id)->first();

                    if ($detail) {
                        $detail->quantity -= $item->quantity;
                        $detail->save();
                    }
                }
                CartDetail::where('cart_id', $cart->id)->delete();
                $cart->delete();
                DB::commit();
                Mail::to($order->email)->queue(new OrderConfirm($order));
                return response()->json([
                    'success' => 'Mua hàng thành công'
                ], 201); // Created

            } catch (\Exception $exception) {
                // Rollback giao dịch nếu có lỗi
                DB::rollBack();

                // Trả về phản hồi lỗi
                return response()->json([
                    'error' => 'Có lỗi khi tạo đơn hàng, vui lòng thử lại sau: ' . $exception->getMessage()
                ], 500); // Internal Server Error
            }
        }

    }
}