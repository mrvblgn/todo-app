<?php

namespace App\Repositories\Concretes;

use App\Models\Category;
use App\Repositories\Abstracts\ICategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository implements ICategoryRepository
{
    public function getAll(): Collection
    {
        return Category::all();
    }

    public function getById(int $id): ?Category
    {
        return Category::find($id);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $category = $this->getById($id);

        if ($category) {
            return $category->update($data);
        }

        return false;
    }

    public function delete(int $id): bool
    {
        $category = $this->getById($id);

        if ($category) {
            return $category->delete();
        }

        return false;
    }

    public function getTodosByCategory(int $id): Collection
    {
        $category = $this->getById($id);

        if ($category) {
            return $category->todos()
                ->where('user_id', auth()->id())
                ->with('categories')
                ->get();
        }

        return collect();  // Eğer kategori bulunmazsa boş koleksiyon döndür
    }
}
