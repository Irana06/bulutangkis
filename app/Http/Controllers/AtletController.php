<?php

namespace App\Http\Controllers;

use App\Http\Requests\Atlet\StoreRequest;
use App\Models\Atlet;
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

    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        // Hitung umur berdasarkan tanggal lahir
        // $validatedData['umur'] = now()->diffInYears($validatedData['tanggal_lahir']);

        // Tambahkan kontingen_id dari user yang sedang login
        $validatedData['kontingen_id'] = auth()->id();

        Atlet::create($validatedData);

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil ditambahkan');
    }
}
