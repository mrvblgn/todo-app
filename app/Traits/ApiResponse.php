<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiResponse
{
    public function successResponse($data = null, string $message = null): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'meta' => null,
            'errors' => null
        ]);
    }

    public function errorResponse(array|string $errors, string $message = null, int $code = 400): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => null,
            'meta' => null,
            'errors' => is_array($errors) ? $errors : [$errors]
        ], $code);
    }

    public function paginatedResponse(LengthAwarePaginator $paginator, string $message = null): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $paginator->items(),
            'meta' => [
                'pagination' => [
                    'total' => $paginator->total(),
                    'per_page' => $paginator->perPage(),
                    'current_page' => $paginator->currentPage(),
                    'last_page' => $paginator->lastPage(),
                    'from' => $paginator->firstItem(),
                    'to' => $paginator->lastItem(),
                ]
            ],
            'errors' => null
        ]);
    }
}
