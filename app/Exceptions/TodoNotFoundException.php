<?php

namespace App\Exceptions;

use Exception;

class TodoNotFoundException extends Exception
{
    public function __construct($message = 'Todo bulunamadı')
    {
        parent::__construct($message);
    }
} 