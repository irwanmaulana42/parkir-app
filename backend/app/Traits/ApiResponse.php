<?php

namespace App\Traits;
use Illuminate\Http\Response;

trait ApiResponse {
  public function apiResponse($data, $code = 200){
    return response()->json([
      'code' => $code,
      'message' => $data
    ]);
  }
}