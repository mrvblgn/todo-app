<?php

namespace App\Services\Concretes;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Contracts\ITodoRepository;
use App\Services\Contracts\ITodoService;

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

    public function update(int $id, array $data): bool
    {
        return $this->todoRepository->update($id, $data);
    }

    public function updateStatus(int $id, string $status): bool
    {
        return $this->todoRepository->updateStatus($id, $status);
    }

    public function delete(int $id): bool
    {
        return $this->todoRepository->delete($id);
    }

    public function search(string $term, array $filters): LengthAwarePaginator
    {
        return $this->todoRepository->search($term, $filters);
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