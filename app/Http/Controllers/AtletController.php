<?php

namespace App\Http\Controllers;

use App\Http\Requests\Atlet\StoreRequest;
use App\Http\Requests\Atlet\UpdateRequest;
use App\Models\Atlet;
use Inertia\Inertia;

class AtletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        $atlet = Atlet::where('kontingen_id', $kontingenId)->get();

        return Inertia::render('Dashboard', [
            'child' => 'Peserta/ListPeserta',
            'atlet' => $atlet,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard', [
            'child' => 'Peserta/CreateEditPeserta'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        // Tambahkan kontingen_id dari user yang sedang login
        $validatedData['kontingen_id'] = auth()->id();

        // Hitung umur berdasarkan tanggal_lahir
        $validatedData['umur'] = now()->diffInYears($validatedData['tanggal_lahir']);

        $atlet = Atlet::create($validatedData);

        // Simpan avatar & kk jika ada
        if ($request->hasFile('foto_profile')) {
            $atlet->addMediaFromRequest('foto_profile')->toMediaCollection('foto_profile');
        }
        if ($request->hasFile('kk_photo')) {
            $atlet->addMediaFromRequest('kk_photo')->toMediaCollection('kk_photo');
        }

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $atlet = Atlet::findOrFail($id);

        return Inertia::render('Dashboard', [
            'child' => 'Peserta/DetailPeserta',
            'atlet' => $atlet,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $atlet = Atlet::findOrFail($id);

        return Inertia::render('Dashboard', [
            'child' => 'Peserta/CreateEditPeserta',
            'atlet' => $atlet,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $atlet = Atlet::findOrFail($id);

        $validatedData = $request->validated();

        // Hitung umur berdasarkan tanggal_lahir
        $validatedData['umur'] = now()->diffInYears($validatedData['tanggal_lahir']);

        $atlet->update($validatedData);

        // Simpan avatar jika ada
        if ($request->hasFile('foto_profile')) {
            $atlet->clearMediaCollection('foto_profile');
            $atlet->addMediaFromRequest('foto_profile')->toMediaCollection('foto_profile');
        }
        if ($request->hasFile('kk_photo')) {
            $atlet->clearMediaCollection('kk_photo');
            $atlet->addMediaFromRequest('kk_photo')->toMediaCollection('kk_photo');
        }

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $atlet = Atlet::findOrFail($id);
        $atlet->delete();

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil dihapus');
    }
}
