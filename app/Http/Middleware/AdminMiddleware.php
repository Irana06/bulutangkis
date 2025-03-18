<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Pastikan user sudah login dan memiliki role 'admin'
        if (auth()->check() && auth()->user()->role === 'admin') {
            return $next($request);
        }

        // Simpan pesan di session flash
        session()->flash('flash', ['error' => 'Anda tidak memiliki akses ke halaman ini.']);

        // Redirect ke /home menggunakan Inertia
        return Inertia::location(route('home'));
    }
}
