<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductDetail;
use Auth;
use DB;
use Illuminate\Http\Request;
use Log;

class ApiOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // đây là đơn hàng của tôi khi mua hàng rồi
    public function index()
    {

        $donHangs = Auth::user()->Order()->orderBy('id', 'desc')->paginate(5);
        $trangThaiDonHang = Order::TRANG_THAI_DON_HANG;
        $type_cho_xac_nhan = Order::CHO_XAC_NHA;
        $type_dang_van_chuyen = Order::DANG_VAN_CHUYEN;
        // dd($donHangs, $Order, $type_cho_xac_nhan, $type_dang_van_chuyen);
        return response()->json([
            'donHangs' => $donHangs,
            'trangThaiDonHang' => $trangThaiDonHang,
            'type_cho_xac_nhan' => $type_cho_xac_nhan,
            'type_dang_van_chuyen' => $type_dang_van_chuyen,
        ]);
    }
    // đây là hiện gia trang mua hàng 
    public function create()
    {
        $userId = Auth::id();

        $cartDetails = [];
        $subtotal = 0;
        $total = 0;
        $tax = 30000;

        if ($userId) {
            // Khi người dùng đã đăng nhập
            $cart = Cart::where('user_id', $userId)->with('details')->first();
            if ($cart) {
                foreach ($cart->details as $detail) {
                    $itemSubtotal = $detail->price * $detail->quantity;
                    $subtotal += $itemSubtotal;
                    $cartDetails[] = [
                        'product_detail_id' => $detail->product_detail_id,
                        'quantity' => $detail->quantity,
                        'price' => $detail->price,
                        'subtotal' => $itemSubtotal,
                    ];
                }
            } else {
                return response()->json(['error' => 'Chưa có sản phẩm trong giỏ hàng'], 404);
            }
        } else {
            // Khi người dùng chưa đăng nhập, lấy giỏ hàng từ session
            $cart = session()->get('cart', []);
            foreach ($cart as $detail) {
                $itemSubtotal = $detail['price'] * $detail['quantity'];
                $subtotal += $itemSubtotal;
                $cartDetails[] = [
                    'product_detail_id' => $detail['product_detail_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                    'subtotal' => $itemSubtotal,
                ];
            }
        }
        // kiểm tra tính đồng bộ khi người dùng đăng nhập vào 
        $total = $subtotal + $tax;

        return response()->json([
            'cart' => $cartDetails,
            'tax' => $tax,
            'subtotal' => $subtotal,
            'total' => $total,
        ]);
    }

    // đây là khi kích vào nút mua hàng 
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
        
               
                DB::commit();
                return response()->json([
                    'success' => 'Mua hàng thành công'
                ], 201); // Created
        
            } catch (\Exception $exception) {
                // Rollback giao dịch nếu có lỗi
                DB::rollBack();
        
                // Ghi lỗi vào log (tuỳ chọn)
                Log::error('Order creation failed: ' . $exception->getMessage());
        
                // Trả về phản hồi lỗi
                return response()->json([
                    'error' => 'Có lỗi khi tạo đơn hàng, vui lòng thử lại sau: ' . $exception->getMessage()
                ], 500); // Internal Server Error
            }
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    function generateUniqueOrderCode()
    {
        do {
            $code_order = 'ORD_' . Auth::id() . '_' . now()->timestamp;
        } while (Order::where('order_code', $code_order)->exists());
        return $code_order;
    }
}
