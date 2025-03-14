<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/payment', // Tambahkan route ini untuk mengecualikan dari CSRF
        '/payment/callback', // Tambahkan route ini untuk mengecualikan dari CSRF
    ];
}
