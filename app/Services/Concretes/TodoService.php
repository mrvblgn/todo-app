<?php

namespace App\Services\Concretes;

use App\Models\Todo;
use App\Exceptions\TodoNotFoundException;
use App\Exceptions\InvalidStatusException;
use App\Exceptions\EmptySearchQueryException;
use App\Exceptions\InvalidPriorityException;
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
            throw new TodoNotFoundException();
        }

        return $todo;
    }

    public function create(array $data): Todo
    {
        if (isset($data['priority']) && !in_array($data['priority'], ['low', 'medium', 'high'])) {
            throw new InvalidPriorityException();
        }

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
        if (isset($data['priority']) && !in_array($data['priority'], ['low', 'medium', 'high'])) {
            throw new InvalidPriorityException();
        }

        $todo = $this->findById($id);
        
        if (!$todo) {
            throw new TodoNotFoundException();
        }

        return $this->todoRepository->update($id, $data);
    }

    public function updateStatus(int $id, string $status): ?Todo
    {
        if (!in_array($status, ['pending', 'in_progress', 'completed', 'cancelled'])) {
            throw new InvalidStatusException();
        }

        $todo = $this->findById($id);
        
        if (!$todo) {
            throw new TodoNotFoundException();
        }

        return $this->todoRepository->updateStatus($id, $status);
    }

    public function delete(int $id): bool
    {
        $todo = $this->findById($id);
        
        if (!$todo) {
            throw new TodoNotFoundException();
        }

        return $this->todoRepository->delete($id);
    }

    public function search(string $query): Collection
    {
        if (empty($query)) {
            throw new EmptySearchQueryException();
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