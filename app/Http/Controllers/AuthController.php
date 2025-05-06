<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Services\Abstracts\IAuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(
        private readonly IAuthService $authService
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());
        return response()->json([
            'status' => 'success',
            'message' => 'Kayıt başarılı',
            'data' => $user
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $token = $this->authService->login($request->validated());
        return response()->json([
            'status' => 'success',
            'message' => 'Giriş başarılı',
            'data' => ['token' => $token]
        ]);
    }

    public function refresh(): JsonResponse
    {
        $token = $this->authService->refresh();
        return response()->json([
            'status' => 'success',
            'message' => 'Token başarıyla yenilendi',
            'data' => ['token' => $token]
        ]);
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Başarıyla çıkış yapıldı'
        ]);
    }
} 