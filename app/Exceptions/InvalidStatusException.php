<?php

namespace App\Exceptions;

use Exception;

class InvalidStatusException extends Exception
{
    public function __construct($message = 'Geçersiz status')
    {
        parent::__construct($message);
    }
} 