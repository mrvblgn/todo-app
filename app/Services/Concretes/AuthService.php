<?php

namespace App\Services\Concretes;

use App\Services\Abstracts\IAuthService;
use App\Repositories\Abstracts\IAuthRepository;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;

class AuthService implements IAuthService
{
    public function __construct(
        private readonly IAuthRepository $authRepository
    ) {}

    public function register(array $data): array
    {
        $user = $this->authRepository->register($data);

        $token = auth()->login($user);
        return ['user' => $user, 'token' => $token];
    }

    public function login(array $credentials): string
    {
        if (!$token = auth()->attempt($credentials)) {
            throw new AuthenticationException('Geçersiz kimlik bilgileri');
        }
    
        return $token;
    }

    public function refresh(): string
    {
        try {
            return auth()->refresh();
        } catch (\Exception $e) {
            throw new AuthenticationException('Unable to refresh token');
        }
    }

    public function logout(): void
    {
        try {
            auth()->logout();
        } catch (\Exception $e) {
            throw new AuthenticationException('Unable to logout');
        }
    }
} 