<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ];
    }

    // XSS koruması için kullanıcıdan gelen verileri temizleme
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => $this->email ? strip_tags($this->email) : null,
        ]);
    }
} 