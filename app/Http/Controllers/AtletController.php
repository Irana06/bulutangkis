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

        // Tambahkan kontingen_id dari user yang sedang login
        $validatedData['kontingen_id'] = auth()->id();

        $atlet = Atlet::create($validatedData);

        // Simpan avatar jika ada
        if ($request->hasFile('foto_profile')) {
            $atlet->addMediaFromRequest('foto_profile')->toMediaCollection('foto_profile');
        }

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil ditambahkan');
    }
}
