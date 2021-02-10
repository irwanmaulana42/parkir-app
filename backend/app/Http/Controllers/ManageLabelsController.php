<?php

namespace App\Http\Controllers;

use App\Label;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Traits\ApiResponse;

class ManageLabelsController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $labels = Label::all();
        return $this->apiResponse($labels);
    }

    public function store(Request $request)
    {
        $this->validated($request);

        try {
            Label::create([
                'label' => $request->post('label'),
                'desc' => $request->post('desc')
            ]);

            return $this->apiResponse('CREATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    public function edit(Request $request, $id)
    {
        if(!Label::where('id', $id)->first()){
            return $this->apiResponse('Not Found', 404);
        }
        $this->validated($request);
        try {
            Label::where('id', $id)->update([
                'label' => $request->post('label'),
                'desc' => $request->post('desc'),
            ]);

            return $this->apiResponse('UPDATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        if(!Label::where('id', $id)->first()){
            return $this->apiResponse('Not Found', 404);
        }

        try {
            Label::where('id', $id)->delete();

            return $this->apiResponse('DELETED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }

    }

    protected function validated(Request $request)
    {
        return $this->validate($request, [
            'label' => 'required',
            'desc' => 'required'
        ]);
    }
}
