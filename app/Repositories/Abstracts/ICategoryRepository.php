<?php

namespace App\Repositories\Abstracts;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

interface ICategoryRepository
{
    public function getAll(): Collection;
    public function findById(int $id): ?Category;
    public function create(array $daya): Category;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function getTodosByCategoryId(int $id): Collection;
}