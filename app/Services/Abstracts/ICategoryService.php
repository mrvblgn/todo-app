<?php

namespace App\Services\Abstracts;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

interface ICategoryService
{
    public function getAll(): Collection;

    public function getById(int $id): ?Category;

    public function create(array $data): Category;

    public function update(int $id, array $data): Category;

    public function delete(int $id): bool;

    public function getTodosByCategory(int $id): Collection;
}
