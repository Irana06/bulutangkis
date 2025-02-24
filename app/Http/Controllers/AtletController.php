<?php

namespace App\Http\Controllers;

use App\Http\Requests\Atlet\StoreRequest;
use App\Http\Requests\Atlet\UpdateRequest;
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

    public function edit($id)
    {
        $atlet = Atlet::findOrFail($id);

        return Inertia::render('Dashboard', [
            'child' => 'Peserta/CreateEditPeserta',
            'atlet' => $atlet,
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $atlet = Atlet::findOrFail($id);

        $validatedData = $request->validated();

        $atlet->update($validatedData);

        // Simpan avatar jika ada
        if ($request->hasFile('foto_profile')) {
            $atlet->clearMediaCollection('foto_profile');
            $atlet->addMediaFromRequest('foto_profile')->toMediaCollection('foto_profile');
        }

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil diperbarui');
    }
}
