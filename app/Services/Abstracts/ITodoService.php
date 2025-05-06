<?php

namespace App\Services\Abstracts;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface ITodoService
{
    public function getAll(array $filters): LengthAwarePaginator;

    public function findById(int $id): ?Todo;

    public function create(array $data): Todo;

    public function update(int $id, array $data): bool;

    public function updateStatus(int $id, string $status): bool;

    public function delete(int $id): bool;

    public function search(string $query): Collection;

    public function getTodosByStatus(): array;

    public function getTodosByPriority(): array;
}