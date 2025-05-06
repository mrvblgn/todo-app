<?php

namespace App\Repositories\Concretes;

use App\Models\Todo;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Abstracts\ITodoRepository;
use Illuminate\Database\Eloquent\Collection;

class TodoRepository implements ITodoRepository
{
    public function getAll(array $filters): LengthAwarePaginator
    {
        $query = Todo::with('categories');

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

    public function search(string $query): Collection
    {
        return Todo::where(function($q) use ($query) {
            $q->where('title', 'like', "%{$query}%")
              ->orWhere('description', 'like', "%{$query}%");
        })->get();
    }

    public function getTodosByStatus(): array
    {
        return Todo::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status => $item->count];
            })
            ->toArray();
    }

    public function getTodosByPriority(): array
    {
        return Todo::selectRaw('priority, COUNT(*) as count')
            ->groupBy('priority')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->priority => $item->count];
            })
            ->toArray();
    }
}
