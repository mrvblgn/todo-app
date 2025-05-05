<?php

namespace App\Repositories;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Contracts\ITodoRepository;

class TodoRepository implements ITodoRepository
{
    public function getAll(array $filters): LengthAwarePaginator
    {
        $query = Todo::with('category');

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        $sort = $filters['sort'] ?? 'created_at';
        $order = $filters['order'] ?? 'desc';
        $limit = min($filters['limit'] ?? 10, 50);

        return $query->orderBy($sort, $order)->paginate($limit);
    }

    public function findById(int $id): ?Todo
    {
        return Todo::with('category')->find($id);
    }

    public function create(array $data): Todo
    {
        return Todo::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $todo = $this->findById($id);
        return $todo ? $todo->update($data) : false;
    }

    public function updateStatus(int $id, string $status): bool
    {
        $todo = $this->findById($id);
        return $todo ? $todo->update(['status' => $status]) : false;
    }

    public function delete(int $id): bool
    {
        $todo = $this->findById($id);
        return $todo ? $todo->delete() : false;
    }

    public function search(string $term, array $filters): LengthAwarePaginator
    {
        $query = Todo::with('category');

        $query->where(function ($q) use ($term) {
            $q->where('title', 'like', "%{$term}%")
              ->orWhere('description', 'like', "%{$term}%");
        });

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        $sort = $filters['sort'] ?? 'created_at';
        $order = $filters['order'] ?? 'desc';
        $limit = min($filters['limit'] ?? 10, 50);

        return $query->orderBy($sort, $order)->paginate($limit);
    }
}
