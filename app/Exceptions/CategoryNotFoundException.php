<?php

namespace App\Exceptions;

use Exception;

class CategoryNotFoundException extends Exception
{
    public function __construct($message = 'Kategori bulunamadı')
    {
        parent::__construct($message);
    }
} 