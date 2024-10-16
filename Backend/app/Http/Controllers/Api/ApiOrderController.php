<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OrderConfirm;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\SubCategory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Log;
use Mail;

class ApiOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // đây là đơn hàng của tôi khi mua hàng rồi
    public function index()
    {
        $trangThaiDonHang = Order::TRANG_THAI_DON_HANG;
    $donHangs = Auth::user()->order()->orderBy('id', 'desc')->paginate(5);

    $arrayDonHang = $donHangs->map(function($donHang) use ($trangThaiDonHang) {
        return [
            'code_order' => $donHang->code_order,
            'username' => $donHang->username,
            'phone' => $donHang->phone,
            'address' => $donHang->address,
            'email' => $donHang->email,
            'note' => $donHang->note,
            'total_amount' => $donHang->total_amount,
            'id' => $donHang->id,
            'orderStatus' => $trangThaiDonHang[$donHang->order_status]
        ];
    });

    $arrayChitietDonHang = $donHangs->flatMap(function($donHang) {
        return $donHang->orderDetail->map(function($detail) {
            return [
                'image' => $detail->productDetail->product->image,
                'product_name' => $detail->productDetail->product->name ,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'order_id' => $detail->id
            ];
        });
    });

    $typeChoXacNhan = Order::CHO_XAC_NHA;
    $typeDangVanChuyen = Order::DANG_VAN_CHUYEN;

    return response()->json([
        'arrayDonHang' => $arrayDonHang,
        'chitietDonHang' => $arrayChitietDonHang,
        'trangThaiDonHang' => $trangThaiDonHang,
        'typeChoXacNhan' => $typeChoXacNhan,
        'typeDangVanChuyen' => $typeDangVanChuyen,
    ]);
    }
    // đây là hiện gia trang mua hàng
    public function create()
    {
        $userId = Auth::id();
        $subtotal = 0;
        $total = 0;
        $tax = 30000;
        $cartDetailsFormatted = [];

        if ($userId) {
            // Khi người dùng đã đăng nhập
            $cart = Cart::where('user_id', $userId)->with('cartDetails')->first();

            // Kiểm tra nếu có giỏ hàng trong session
            $sessionCart = session()->get('cart', []);

            if (!$cart && !empty($sessionCart)) {
                // Tạo giỏ hàng mới từ session nếu người dùng đăng nhập nhưng chưa có giỏ hàng
                $cart = Cart::create([
                    'user_id' => $userId,
                    'status' => 'pending',
                ]);

                // Chuyển sản phẩm từ session vào giỏ hàng cơ sở dữ liệu
                foreach ($sessionCart as $sessionDetail) {
                    $productDetail = ProductDetail::find($sessionDetail['product_detail_id']);
                    if ($productDetail) {
                        $cart->cartDetails()->create([
                            'product_detail_id' => $sessionDetail['product_detail_id'],
                            'quantity' => $sessionDetail['quantity'],
                            'price' => $sessionDetail['price'],
                        ]);
                    }
                }

                // Xóa giỏ hàng trong session sau khi đã đồng bộ
                session()->forget('cart');
            }

            if ($cart) {
                foreach ($cart->cartDetails as $detail) {
                    $productDetail = ProductDetail::find($detail->product_detail_id);

                    // Chỉ tiếp tục nếu tìm thấy chi tiết sản phẩm
                    if (!$productDetail) {
                        continue;
                    }

                    // Tính toán subtotal cho sản phẩm
                    $itemSubtotal = $detail->price * $detail->quantity;
                    $subtotal += $itemSubtotal;

                    // Gọi dữ liệu từ productDetail
                    $colorName = $productDetail->productColor->name ?? 'N/A';
                    $sizeName = $productDetail->productSize->name ?? 'N/A';
                    $NameProduct = $productDetail->product->name;
                    $ImageProduct = $productDetail->product->image;
                    $PriceProduct = $productDetail->product->price;

                    // Thêm vào mảng đã định nghĩa với đầy đủ thông tin sản phẩm
                    $cartDetailsFormatted[] = [
                        'product_detail_id' => $detail->product_detail_id,
                        'colorName' => $colorName,
                        'sizeName' => $sizeName,
                        'NameProduct' => $NameProduct,
                        'PriceProduct' => $PriceProduct,
                        'detail_id' => $detail->id,
                        'ImageProduct' => $ImageProduct,
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
                $cartDetailsFormatted[] = [
                    'product_detail_id' => $detail['product_detail_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                    'subtotal' => $itemSubtotal,
                ];
            }
        }

        // Tính tổng
        $total = $subtotal + $tax;

        return response()->json([
            'cart' => $cartDetailsFormatted,
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

//    đây là trang sản phẩm khi người dùng click vào nút cập nhật đơn hàng
    public function update(Request $request, string $id)
    {
        $donHang = Order::query()->findOrFail($id);
        DB::beginTransaction();
        try {
            if ($request->has('huy_don_hang')) {
                $donHang->update(['trang_thai_don_hang' => Order::HUY_HANG]);
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Đơn hàng đã được hủy thành công.'
                ], 200);
            } else if ($request->has('da_nhan_hang')) {
                $donHang->update(['trang_thai_don_hang' => Order::DA_NHAN_HANG]);
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Đơn hàng đã được đánh dấu là đã nhận.'
                ], 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi khi cập nhật đơn hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
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
        } while (Order::where('code_order', $code_order)->exists());
        return $code_order;
    }
}
