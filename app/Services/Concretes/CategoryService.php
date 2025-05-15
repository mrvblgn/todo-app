<?php

namespace App\Services\Concretes;

use App\Models\Category;
use App\Repositories\Abstracts\ICategoryRepository;
use App\Services\Abstracts\ICategoryService;
use Illuminate\Database\Eloquent\Collection;

class CategoryService implements ICategoryService
{
    protected ICategoryRepository $categoryRepository;

    public function __construct(ICategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAll(): Collection
    {
        return $this->categoryRepository->getAll();
    }

    public function getById(int $id): ?Category
    {
        $category = $this->categoryRepository->getById($id);
        
        if (!$category) {
            throw new \InvalidArgumentException('Kategori bulunamadı');
        }

        return $category;
    }

    public function create(array $data): Category
    {
        return $this->categoryRepository->create($data);
    }

    public function update(int $id, array $data): Category
    {
        $category = $this->getById($id);
        $this->categoryRepository->update($id, $data);
        
        return $this->getById($id);
    }

    public function delete(int $id): bool
    {
        $this->getById($id);
        return $this->categoryRepository->delete($id);
    }

    public function getTodosByCategory(int $id): Collection
    {
        return $this->categoryRepository->getTodosByCategory($id);
    }
}
