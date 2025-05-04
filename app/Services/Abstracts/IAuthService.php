<?php

namespace App\Services\Abstracts;

use App\Models\User;

interface IAuthService
{
    public function register(array $data): array;
    public function login(array $credentials): string;
    public function logout(): void;
    public function refresh(): string;
}