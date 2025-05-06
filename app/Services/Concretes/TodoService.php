<?php

namespace App\Services\Concretes;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Abstracts\ITodoRepository;
use App\Services\Abstracts\ITodoService;
use Illuminate\Database\Eloquent\Collection;

class TodoService implements ITodoService
{
    protected ITodoRepository $todoRepository;

    public function __construct(ITodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    public function getAll(array $filters): LengthAwarePaginator
    {
        return $this->todoRepository->getAll($filters);
    }

    public function findById(int $id): ?Todo
    {
        return $this->todoRepository->findById($id);
    }

    public function create(array $data): Todo
    {
        return $this->todoRepository->create($data);
    }

    public function update(int $id, array $data): ?Todo
    {
        return $this->todoRepository->update($id, $data);
    }

    public function updateStatus(int $id, string $status): ?Todo
    {
        return $this->todoRepository->updateStatus($id, $status);
    }

    public function delete(int $id): bool
    {
        return $this->todoRepository->delete($id);
    }

    public function search(string $query): Collection
    {
        return $this->todoRepository->search($query);
    }

    public function getTodosByStatus(): array
    {
        return $this->todoRepository->getTodosByStatus();
    }

    public function getTodosByPriority(): array
    {
        return $this->todoRepository->getTodosByPriority();
    }

}