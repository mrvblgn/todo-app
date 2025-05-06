<?php

namespace App\Services\Abstracts;

use App\Models\Category;

interface ICategoryService
{
    public function getAll(): array;

    public function getById(int $id): ?Category;

    public function create(array $data): Category;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;

    public function getTodosByCategory(int $id): array;
}
