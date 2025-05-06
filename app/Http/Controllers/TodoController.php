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
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponse;

class TodoController extends Controller
{
    use ApiResponse;

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

    /**
     * Todo ara
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q');
        if (empty($query)) {
            return $this->errorResponse('Arama terimi gerekli', 400);
        }

        $todos = $this->todoService->search($query);
        return $this->successResponse(TodoResource::collection($todos));
    }

    /**
     * Belirli bir todo'yu getir
     */
    public function show(int $id): JsonResponse
    {
        $todo = $this->todoService->findById($id);
        if (!$todo) {
            return $this->errorResponse('Todo bulunamadı', 404);
        }

        $this->authorize('view', $todo);
        return $this->successResponse(new TodoResource($todo));
    }

    /**
     * Yeni todo oluştur
     */
    public function store(CreateTodoRequest $request): JsonResponse
    {
        $this->authorize('create', Todo::class);
        $validated = $request->validated();
        $todo = $this->todoService->create($validated);
        return $this->successResponse(new TodoResource($todo), 'Todo başarıyla oluşturuldu', 201);
    }

    /**
     * Todo güncelle
     */
    public function update(UpdateTodoRequest $request, int $id): JsonResponse
    {
        $todo = $this->todoService->findById($id);
        if (!$todo) {
            return $this->errorResponse('Todo bulunamadı', 404);
        }

        $this->authorize('update', $todo);
        $validated = $request->validated();
        $updatedTodo = $this->todoService->update($id, $validated);
        return $this->successResponse(new TodoResource($updatedTodo), 'Todo başarıyla güncellendi');
    }

    /**
     * Sadece todo durumunu güncelle
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $todo = $this->todoService->findById($id);
        if (!$todo) {
            return $this->errorResponse('Todo bulunamadı', 404);
        }

        $this->authorize('update', $todo);
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed'
        ]);

        $updatedTodo = $this->todoService->updateStatus($id, $validated['status']);
        return $this->successResponse(new TodoResource($updatedTodo), 'Todo durumu başarıyla güncellendi');
    }

    /**
     * Todo sil (soft delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $todo = $this->todoService->findById($id);
        if (!$todo) {
            return $this->errorResponse('Todo bulunamadı', 404);
        }

        $this->authorize('delete', $todo);
        $this->todoService->delete($id);
        return $this->successResponse(null, 'Todo başarıyla silindi');
    }

    /**
     * Durumlara göre todo sayılarını getir
     */
    public function getTodosByStatus(): JsonResponse
    {
        $statuses = $this->todoService->getTodosByStatus();
        return $this->successResponse($statuses);
    }

    /**
     * Önceliklere göre todo sayılarını getir
     */
    public function getTodosByPriority(): JsonResponse
    {
        $priorities = $this->todoService->getTodosByPriority();
        return $this->successResponse($priorities);
    }
}
