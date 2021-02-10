<?php

namespace App\Http\Controllers;

use App\Label;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Traits\ApiResponse;
use App\User;
use Illuminate\Support\Facades\Hash;

class ManageUsersController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $users = User::all();
        return $this->apiResponse($users);
    }

    public function store(Request $request)
    {
        $this->validated($request);

        try {
            $user = User::create([
                'name' => $request->post('name'),
                'username' => $request->post('username'),
                'password' => Hash::make($request->post('password')),
                'confirmed' => 1,
            ]);

            if ($admin = $request->post('is_admin')) {
                $this->updateAdmin($admin, $user->id);
            }

            return $this->apiResponse('CREATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    protected function updateAdmin($admin, $id)
    {
        return User::where('id', $id)->update([
            'is_admin' => $admin
        ]);
    }

    public function edit(Request $request, $id)
    {
        if (!User::where('id', $id)->first()) {
            return $this->apiResponse('Not Found', 404);
        }
        $this->validated($request);
        try {
            User::where('id', $id)->update([
                'name' => $request->post('name'),
                'username' => $request->post('username'),
            ]);
            
            if($request->post('password')){
                User::where('id', $id)->update([
                    'password' => Hash::make($request->post('password')),
                ]);
            }

            if ($admin = $request->post('is_admin')) {
                $this->updateAdmin($admin, $id);
            }
            return $this->apiResponse('UPDATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    public function confirmation(Request $request, $id)
    {
        if (!User::where('id', $id)->first()) {
            return $this->apiResponse('Not Found', 404);
        }

        try {
            User::where('id', $id)->update([
                'confirmed' => 1
            ]);

            return $this->apiResponse('CONFIRM');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        if (!User::where('id', $id)->first()) {
            return $this->apiResponse('Not Found', 404);
        }

        try {
            User::where('id', $id)->delete();

            return $this->apiResponse('DELETED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    protected function validated(Request $request)
    {
        return $this->validate($request, [
            'name' => 'required',
            'username' => 'required',
        ]);
    }
}
