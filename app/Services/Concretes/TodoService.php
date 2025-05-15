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
        $todo = $this->todoRepository->findById($id);
        
        if (!$todo) {
            throw new \InvalidArgumentException('Todo bulunamadı');
        }

        return $todo;
    }

    public function create(array $data): Todo
    {
        $categoryIds = $data['categories'] ?? [];
        unset($data['categories']);

        $todo = $this->todoRepository->create($data);

        if (!empty($categoryIds)) {
            $todo->categories()->sync($categoryIds);
        }

        return $todo;
    }

    public function update(int $id, array $data): ?Todo
    {
        $todo = $this->findById($id);
        
        if (!$todo) {
            throw new \InvalidArgumentException('Todo bulunamadı');
        }

        return $this->todoRepository->update($id, $data);
    }

    public function updateStatus(int $id, string $status): ?Todo
    {
        if (!in_array($status, ['pending', 'completed', 'overdue'])) {
            throw new \InvalidArgumentException('Geçersiz status');
        }

        $todo = $this->findById($id);
        
        if (!$todo) {
            throw new \InvalidArgumentException('Todo bulunamadı');
        }

        return $this->todoRepository->updateStatus($id, $status);
    }

    public function delete(int $id): bool
    {
        $todo = $this->findById($id);
        
        if (!$todo) {
            throw new \InvalidArgumentException('Todo bulunamadı');
        }

        return $this->todoRepository->delete($id);
    }

    public function search(string $query): Collection
    {
        if (empty($query)) {
            throw new \InvalidArgumentException('Arama terimi gerekli');
        }

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