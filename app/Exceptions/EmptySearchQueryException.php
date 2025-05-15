<?php

namespace App\Exceptions;

use Exception;

class EmptySearchQueryException extends Exception
{
    public function __construct($message = 'Arama terimi gerekli')
    {
        parent::__construct($message);
    }
} 