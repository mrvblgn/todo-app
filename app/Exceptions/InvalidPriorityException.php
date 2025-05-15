<?php

namespace App\Exceptions;

use Exception;

class InvalidPriorityException extends Exception
{
    public function __construct($message = 'Geçersiz öncelik değeri')
    {
        parent::__construct($message);
    }
} 