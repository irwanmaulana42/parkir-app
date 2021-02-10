<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Traits\ApiResponse;
use App\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    use ApiResponse;
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->get('page') : 1;
        $limit = $request->has('limit') ? $request->get('limit') : 10;

        $getData = Transaction::limit($limit)->offset(($page - 1) * $limit)->get();

        return $this->apiResponse($getData);
    }

    public function history(Request $request)
    {
        $page = $request->has('page') ? $request->get('page') : 1;
        $limit = $request->has('limit') ? $request->get('limit') : 10;

        $getData = Transaction::whereNotNull('jam_keluar')->limit($limit)->offset(($page - 1) * $limit)->get();
        
        return $this->apiResponse($getData);
    }

    public function test()
    {
        for ($i=0; $i < 5000; $i++) { 
            Transaction::create([
                'plat_nomor' => Str::random(5),
                'jenis_kendaraan' => 'motor',
                'kode' => Str::random(5),
                'jam_masuk' => Carbon::now()->addMinutes($i)->addSeconds($i),
            ]);
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'plat_nomor' => 'required',
            'jenis_kendaraan' => 'required'
        ]);

        try {
            Transaction::create([
                'plat_nomor' => $request->post('plat_nomor'),
                'jenis_kendaraan' => $request->post('jenis_kendaraan'),
                'kode' => Str::random(5),
                'jam_masuk' => Carbon::now(),
            ]);

            return $this->apiResponse('CREATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    public function edit(Request $request)
    {
        $this->validate($request, [
            'kode' => 'required',
        ]);

        try {
            $checkData = Transaction::where('kode', $request->post('kode'))->count();
            if($checkData < 1){
                return $this->apiResponse('Data Not Found', 404);
            }
            $checkUsed = Transaction::where('kode', $request->post('kode'))->whereNotNull('jam_keluar')->count();
            if($checkUsed > 0){
                return $this->apiResponse('Kode telah terpakai', 204);
            }
            Transaction::where('kode', $request->post('kode'))->update([
                'jam_keluar' => Carbon::now()
            ]);

            return $this->apiResponse('UPDATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }


}
