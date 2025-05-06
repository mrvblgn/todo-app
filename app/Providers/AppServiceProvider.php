<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use App\Services\Abstracts\IAuthService;
use App\Services\Concretes\AuthService;
use App\Repositories\Abstracts\IAuthRepository;
use App\Repositories\Concretes\AuthRepository;
use App\Services\Abstracts\ITodoService;
use App\Services\Concretes\TodoService;
use App\Repositories\Abstracts\ITodoRepository;
use App\Repositories\Concretes\TodoRepository;
use App\Services\Abstracts\ICategoryService;
use App\Services\Concretes\CategoryService;
use App\Repositories\Abstracts\ICategoryRepository;
use App\Repositories\Concretes\CategoryRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IAuthService::class, AuthService::class);
        $this->app->bind(IAuthRepository::class, AuthRepository::class);

        $this->app->bind(ITodoService::class, TodoService::class);
        $this->app->bind(ITodoRepository::class, TodoRepository::class);

        $this->app->bind(ICategoryService::class, CategoryService::class);
        $this->app->bind(ICategoryRepository::class, CategoryRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
