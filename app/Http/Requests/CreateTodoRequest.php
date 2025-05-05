<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTodoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Gerekirse burada yetkilendirme kontrolü eklenebilir.
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['required', 'in:low,medium,high'],
            'due_date' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }
}
