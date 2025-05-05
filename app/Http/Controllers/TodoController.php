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

class TodoController extends Controller
{
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

        if (!$todo) {
            return response()->json(['message' => 'Todo bulunamadı'], 404);
        }

        return response()->json(new TodoResource($todo));
    }

    public function create(CreateTodoRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $todo = $this->todoService->create($validated);

        return response()->json(new TodoResource($todo), 201);
    }

    public function update(UpdateTodoRequest $request, int $id): JsonResponse
    {
        $validated = $request->validated();
        $updatedTodo = $this->todoService->update($id, $validated);

        if (!$updatedTodo) {
            return response()->json(['message' => 'Todo bulunamadı'], 404);
        }

        return response()->json(new TodoResource($updatedTodo));
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $status = $request->input('status');

        if (!in_array($status, ['pending', 'completed', 'overdue'])) {
            return response()->json(['message' => 'Geçersiz status'], 400);
        }

        $updatedTodo = $this->todoService->updateStatus($id, $status);

        if (!$updatedTodo) {
            return response()->json(['message' => 'Todo bulunamadı'], 404);
        }

        return response()->json(new TodoResource($updatedTodo));
    }

    public function delete(int $id): JsonResponse
    {
        $deleted = $this->todoService->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Todo bulunamadı'], 404);
        }

        return response()->json(['message' => 'Todo başarıyla silindi'], 204);
    }

    public function search(Request $request): JsonResponse
    {
        $term = $request->input('q');
        $filters = $request->only(['status', 'priority', 'sort', 'order', 'limit']);
        $todos = $this->todoService->search($term, $filters);

        return response()->json([
            'status' => 'success',
            'data' => TodoResource::collection($todos),
        ]);
    }

    public function getTodosByStatus(): JsonResponse
    {
        $statuses = $this->todoService->getTodosByStatus();

        return response()->json([
            'status' => 'success',
            'data' => $statuses->map(function ($status) {
                return [
                    'status' => $status->status,  
                    'count' => $status->count,    
                ];
            }),
        ]);
    }

    public function getTodosByPriority(): JsonResponse
    {
        $priorities = $this->todoService->getTodosByPriority();

        return response()->json([
            'status' => 'success',
            'data' => $priorities->map(function ($priority) {
                return [
                    'priority' => $priority->priority,  
                    'count' => $priority->count,        
                ];
            }),
        ]);
    }

}
