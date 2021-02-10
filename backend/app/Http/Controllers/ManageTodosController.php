<?php

namespace App\Http\Controllers;

use App\Todos;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;

class ManageTodosController extends Controller
{
    use ApiResponse;
    public function index(Request $request)
    {
        $todos = Todos::select('labels.label', 'todos.*')->leftJoin('labels', 'labels.id', '=', 'todos.label_id')->where('todos.user_id', $request->get('user_id'))->get();
        return $this->apiResponse($todos);
    }

    public function store(Request $request)
    {
        $this->validated($request);

        try {
            $todos = Todos::create([
                'user_id' => $request->post('user_id'),
                'task' => $request->post('task'),
            ]);

            if($label_id = $request->post('label_id')){
                $this->updateLabel($label_id, $todos->id);
            }

            return $this->apiResponse('CREATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    protected function updateLabel($label_id, $id)
    {
        return Todos::where('id', $id)->update([
            'label_id' => $label_id
        ]);
    }

    public function edit(Request $request, $id)
    {
        if(!Todos::where('id', $id)->first()){
            return $this->apiResponse('Not Found', 404);
        }

        $this->validate($request, [
            'user_id' => 'required',
        ]);

        $data = [];

        try {
            $data['user_id'] = $request->post('user_id');

            if($request->post('task') !== NULL){
                $data['task'] = $request->post('task');
            }

            if($request->post('completed') !== NULL){
                $data['completed'] = $request->post('completed');
            }

            Todos::where('id', $id)->update($data);

            if($label_id = $request->post('label_id')){
                $this->updateLabel($label_id, $id);
            }

            return $this->apiResponse('UPDATED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        if(!Todos::where('id', $id)->first()){
            return $this->apiResponse('Not Found', 404);
        }

        try {
            Todos::where('id', $id)->delete();
            return $this->apiResponse('DELETED');
        } catch (\Exception $e) {
            Log::error($e);
            return $this->apiResponse($e->getMessage(), 500);
        }

    }

    protected function validated(Request $request)
    {
        return $this->validate($request, [
            'user_id' => 'required',
            'task' => 'required'
        ]);
    }
}
