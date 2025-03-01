<?php

use App\Http\Controllers\AtletController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TandingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::fallback(function () {
    return Inertia::render('Services/NotFound');
});

Route::middleware('auth')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Dashboard', [
            'child' => 'Home'
        ]);
    })->name('home');

    // Peserta
    Route::resource('peserta', AtletController::class)->except(['show', 'update']);
    Route::get('/peserta/{id}/detail', [AtletController::class, 'show'])->name('peserta.show');
    Route::post('/peserta/{id}', [AtletController::class, 'update'])->name('peserta.update');

    // Tanding
    Route::resource('tanding', TandingController::class)->except(['show']);
    Route::get('/tanding/{id}/detail', [TandingController::class, 'show'])->name('tanding.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
