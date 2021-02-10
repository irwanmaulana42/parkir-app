<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        try {
            $checkUser = User::where('username', $request->post('username'))->count();
            if($checkUser > 0){
                return response()->json(['code' => 204, 'message' => 'Username has already been taken']);
            }
            User::create([
                'name' => $request->post('name'),
                'username' => $request->post('username'),
                'password' => Hash::make($request->post('password'))
            ]);
            return response()->json(['code' => 200, 'message' => 'CREATED']);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['code' => 409, 'message' => 'User Registration Failed']);
        }
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        $credentials = $request->only(['username', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['code' => 404,'message' => 'Not Found'], 200);
        }
        $checkLogin = User::where('username', $request->post('username'))->where('confirmed', 1)->count();
        if($checkLogin > 0){
            return $this->respondWithToken($token);
        }else{
            return response()->json(['code' => 204, 'message' => 'Users Not Confirmed'], 200);
        }
    }

    public function verify(){
        return response()->json([
            'code' => 200,
            'message' => 'Authorized'
        ]);
    }
}
