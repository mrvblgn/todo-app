<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\Abstracts\ICategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected ICategoryService $categoryService;

    public function __construct(ICategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function getAll(): JsonResponse
    {
        $categories = $this->categoryService->getAll();

        return response()->json([
            'status' => 'success',
            'data' => CategoryResource::collection($categories),
        ]);
    }

    public function getById(int $id): JsonResponse
    {
        $category = $this->categoryService->getById($id);

        if (!$category) {
            return response()->json(['message' => 'Kategori bulunamadı'], 404);
        }

        return response()->json(new CategoryResource($category));
    }

    public function create(CreateCategoryRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $category = $this->categoryService->create($validated);

        return response()->json(new CategoryResource($category), 201);
    }

    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {
        $validated = $request->validated();
        $updatedCategory = $this->categoryService->update($id, $validated);

        if (!$updatedCategory) {
            return response()->json(['message' => 'Kategori bulunamadı'], 404);
        }

        return response()->json(new CategoryResource($updatedCategory));
    }

    public function delete(int $id): JsonResponse
    {
        $deleted = $this->categoryService->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Kategori bulunamadı'], 404);
        }

        return response()->json(['message' => 'Kategori başarıyla silindi'], 204);
    }

    public function getTodosByCategory(int $id): JsonResponse
    {
        $todos = $this->categoryService->getTodosByCategory($id);

        return response()->json([
            'status' => 'success',
            'data' => $todos,
        ]);
    }
}
