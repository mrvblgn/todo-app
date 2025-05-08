<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\CategoryController;

// Auth routes with stricter rate limiting
Route::middleware(['throttle:30,1'])->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
});

Route::get('/categories', [CategoryController::class, 'getAll']);
Route::get('/categories/{id}', [CategoryController::class, 'getById']);

// Protected routes
Route::middleware(['auth:api'])->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);

    // Normal user routes - Can only manage their own todos
    Route::get('/todos', [TodoController::class, 'getAll']);
    Route::get('/todos/search', [TodoController::class, 'search']);
    Route::get('/todos/{id}', [TodoController::class, 'findById']);
    Route::get('/stats/todos', [TodoController::class, 'getTodosByStatus']);
    Route::get('/stats/priorities', [TodoController::class, 'getTodosByPriority']);
    Route::post('/todos', [TodoController::class, 'create']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::patch('/todos/{id}/status', [TodoController::class, 'updateStatus']);
    Route::delete('/todos/{id}', [TodoController::class, 'delete']);

    // Admin routes - Can manage all todos
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        Route::get('/todos', [TodoController::class, 'getAll']); // Tüm todo'ları listeler
        Route::get('/todos/search', [TodoController::class, 'search']); // Tüm todo'larda arama yapar
    });

    // Category routes
    Route::get('/categories/{id}/todos', [CategoryController::class, 'getTodosByCategory']);
    Route::post('/categories', [CategoryController::class, 'create']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'delete']);
});