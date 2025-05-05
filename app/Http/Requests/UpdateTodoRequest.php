<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTodoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Gerekirse burada yetkilendirme kontrolü eklenebilir.
    }

    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['nullable', 'in:low,medium,high'],
            'due_date' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }
}
