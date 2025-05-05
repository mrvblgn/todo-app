<?php

namespace App\Services\Abstracts;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;

interface ITodoService
{
    public function getAll(array $filters): LengthAwarePaginator;

    public function findById(int $id): ?Todo;

    public function create(array $data): Todo;

    public function update(int $id, array $data): bool;

    public function updateStatus(int $id, string $status): bool;

    public function delete(int $id): bool;

    public function search(string $term, array $filters): LengthAwarePaginator;

    public function getTodosByStatus(): array;

    public function getTodosByPriority(): array;
}