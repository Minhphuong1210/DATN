<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ForgotpasswordMail;
use App\Models\password_reset_token;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
        
        // Kiểm tra người dùng và mật khẩu
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập không chính xác'],
            ]);
        }
    
        // Kiểm tra trạng thái tài khoản
        // if ($user->is_active == 0) {
        //     return response()->json([
        //         'message' => 'Tài khoản đã bị khóa'
        //     ], 403); // Sử dụng mã lỗi 403 cho Forbidden
        // }
    
        // Đăng nhập người dùng
        Auth::login($user);
    
        // Tạo token
        $token = $user->createToken('Access Token')->plainTextToken;
    
        return response()->json([
            'token' => $token,
            'user' => $user,
            'message' => 'Đăng nhập thành công',
        ]);
    }
    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json([
            'message' => 'dang xuat thanh cong',
            'user' => $user,
        ]);
    }

    public function register(Request $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('Access Token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user,
            'message' => 'Đăng ký thành công',
        ]);
    }

    public function show(string $id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user, 200);
        }

        return response()->json(['error' => 'User not found'], 404);
    }
    public function update(Request $request, string $id)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|email|unique:users,email,' . $id . ',id',
        // ]);

        $user = User::findOrFail($id);

        $param = $request->only(['name', 'email', 'password', 'address', 'phone']);

        if (isset($param['password'])) {
            $param['password'] = Hash::make($param['password']);
        }

        $updated = $user->update($param);

        if ($updated) {
            return response()->json([
                'user' => $user,
                'success' => "Cập nhật thành công",
            ], 200);
        } else {
            return response()->json(['error' => 'Cập nhật thất bại'], 500);
        }
    }

    public function forgot_password()
    {
        // ý tưởng là trả về 1 trang bên front
        return response()->json([
            'message' => 'truy cập vào trang quên mật khẩu'
        ]);
    }
    public function check_forgot_password(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users',
        ]);
        $user = User::where('email', $request->email)->first();
        $token = Str::random(40);
        $tokenData = [
            'email' => $request->email,
            'token' => $token
        ];
        if (password_reset_token::create($tokenData)) {
            Mail::to($request->email)->send(new ForgotpasswordMail($user, $token));
            return response()->json([
                'message' => 'đã kiểm tra thành công vui lòng kiểm tra email'
            ]);
        }
        return response()->json([
            'message' => 'vui lòng kiểm tra lại email'
        ]);
    }
    public function reset_password($token)
    {
        // cái này có thể viết bên model
        $tokenData = password_reset_token::CheckToken($token);
        // // cách 1 cách 2 sang model
        // $user = User::where('email', $tokenData->email)->firstOrFail();
        // $user = $tokenData->user;
        //
        return response()->json([
            'message' => 'đã trả về trang'
        ]);
    }
    public function check_reset_password($token)
    {
        $tokenData = password_reset_token::CheckToken($token);
        $user = $tokenData->user;
        $data = [
            'password' => bcrypt(request('password'))
        ];
        $check = $user->update($data);
        if($check){
            return response()->json([
                'message' => 'đã cập nhật mật khẩu'
            ]);
        }else{
            return response()->json([
                'message' => 'chưa cập nhật mật khẩu'
            ]);
        }
    }

}
