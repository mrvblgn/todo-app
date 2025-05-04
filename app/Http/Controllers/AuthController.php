<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Services\Abstracts\IAuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly IAuthService $authService
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());
        return $this->successResponse($user, 'Kayıt başarılı', 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $token = $this->authService->login($request->validated());
        return $this->successResponse(['token' => $token], 'Giriş başarılı');
    }

    public function refresh(): JsonResponse
    {
        $token = $this->authService->refresh();
        return $this->success(['token' => $token], 'Token başarıyla yenilendi.');
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();
        return $this->successResponse(null, 'Başarıyla çıkış yapıldı');
    }
} 