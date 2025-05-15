<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\FilterTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Services\Abstracts\ITodoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TodoController extends Controller
{
    use AuthorizesRequests;
    
    protected ITodoService $todoService;

    public function __construct(ITodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    public function getAll(FilterTodoRequest $request): JsonResponse
    {
        $filters = $request->validated();
        $todos = $this->todoService->getAll($filters);

        return response()->json([
            'status' => 'success',
            'data' => TodoResource::collection($todos->items()),
            'meta' => [
                'pagination' => [
                    'total' => $todos->total(),
                    'per_page' => $todos->perPage(),
                    'current_page' => $todos->currentPage(),
                    'last_page' => $todos->lastPage(),
                    'from' => $todos->firstItem(),
                    'to' => $todos->lastItem(),
                ]
            ]
        ]);
    }

    public function findById(int $id): JsonResponse
    {
        $todo = $this->todoService->findById($id);
        return response()->json([
            'status' => 'success',
            'data' => new TodoResource($todo)
        ]);
    }

    public function create(CreateTodoRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $todo = $this->todoService->create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Todo başarıyla oluşturuldu',
            'data' => new TodoResource($todo)
        ], 201);
    }

    public function update(UpdateTodoRequest $request, int $id): JsonResponse
    {
        $this->authorize('update', $this->todoService->findById($id));
        
        $validated = $request->validated();
        $updatedTodo = $this->todoService->update($id, $validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Todo başarıyla güncellendi',
            'data' => new TodoResource($updatedTodo)
        ]);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $status = $request->input('status');
        $updatedTodo = $this->todoService->updateStatus($id, $status);

        return response()->json([
            'status' => 'success',
            'message' => 'Todo durumu başarıyla güncellendi',
            'data' => new TodoResource($updatedTodo)
        ]);
    }

    public function delete(int $id): JsonResponse
    {
        $this->authorize('delete', $this->todoService->findById($id));
        $this->todoService->delete($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Todo başarıyla silindi'
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->input('q');
        $todos = $this->todoService->search($query);
        
        return response()->json([
            'status' => 'success',
            'data' => TodoResource::collection($todos)
        ]);
    }

    public function getTodosByStatus(): JsonResponse
    {
        $statuses = $this->todoService->getTodosByStatus();

        return response()->json([
            'status' => 'success',
            'data' => collect($statuses)->map(function ($count, $status) {
                return [
                    'status' => $status,
                    'count' => $count,
                ];
            })->values()
        ]);
    }

    public function getTodosByPriority(): JsonResponse
    {
        $priorities = $this->todoService->getTodosByPriority();

        return response()->json([
            'status' => 'success',
            'data' => collect($priorities)->map(function ($count, $priorities) {
                return [
                    'priorities' => $priorities,
                    'count' => $count,
                ];
            })->values()
        ]);
    }
}
