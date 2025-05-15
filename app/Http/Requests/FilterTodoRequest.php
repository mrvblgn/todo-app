<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterTodoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Gerekirse burada yetkilendirme kontrolü eklenebilir.
    }

    public function rules(): array
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:50'],
            'sort' => ['nullable', 'string', 'in:created_at,due_date,priority'],
            'order' => ['nullable', 'string', 'in:asc,desc'],
            'status' => ['nullable', 'string', 'in:pending,in_progress,completed,cancelled'],
            'priority' => ['nullable', 'string', 'in:low,medium,high'],
        ];
    }

    public function messages(): array
    {
        return [
            'page.min' => 'Sayfa numarası en az 1 olmalıdır.',
            'limit.min' => 'Sayfa başına gösterilecek kayıt sayısı en az 1 olmalıdır.',
            'limit.max' => 'Sayfa başına gösterilecek kayıt sayısı 50’den fazla olamaz.',
            'sort.in' => 'Sıralama alanı yalnızca: created_at, due_date, priority olabilir.',
            'order.in' => 'Sıralama yönü yalnızca: asc veya desc olabilir.',
            'status.in' => 'Durum yalnızca: pending, in_progress, completed, cancelled olabilir.',
            'priority.in' => 'Öncelik yalnızca: low, medium, high olabilir.',
        ];
    }

    // XSS koruması için kullanıcıdan gelen verileri temizleme
    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => $this->title ? strip_tags($this->title) : null,
            'description' => $this->description ? strip_tags($this->description) : null,
        ]);
    }
}
