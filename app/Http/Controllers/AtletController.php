<?php

namespace App\Http\Controllers;

use App\Models\Atlet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AtletController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        $atlet = Atlet::with('kontingen')->where('kontingen_id', $kontingenId)->get();

        return Inertia::render('Dashboard', [
            'child' => 'Peserta/ListPeserta',
            'atlet' => $atlet,
        ]);
    }
}
