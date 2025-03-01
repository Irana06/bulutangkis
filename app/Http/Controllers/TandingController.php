<?php

namespace App\Http\Controllers;

use App\Models\Tanding;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        // Ambil query parameters dari frontend
        $filterTunggal = $request->query('tunggal');
        $filterGanda = $request->query('ganda');
        $filterCampuran = $request->query('campuran');

        // Query dasar dengan filter berdasarkan kontingen
        $tanding = Tanding::whereHas('atlet', function ($query) use ($kontingenId) {
            $query->where('kontingen_id', $kontingenId);
        });

        // Filter berdasarkan jenis kategori tanding
        if ($filterTunggal) {
            $tanding->whereHas('kategoriTanding', function ($query) {
                $query->whereIn('jenis', ['TUNGGAL_PUTRA', 'TUNGGAL_PUTRI']);
            });
        }

        if ($filterGanda) {
            $tanding->whereHas('kategoriTanding', function ($query) {
                $query->whereIn('jenis', ['GANDA_PUTRA', 'GANDA_PUTRI']);
            });
        }

        if ($filterCampuran) {
            $tanding->whereHas('kategoriTanding', function ($query) {
                $query->where('jenis', 'CAMPURAN');
            });
        }

        return Inertia::render('Dashboard', [
            'child' => 'Tanding/ListTanding',
            'tanding' => $tanding->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tanding = Tanding::findOrFail($id);

        return Inertia::render('Dashboard', [
            'child' => 'Tanding/DetailTanding',
            'tanding' => $tanding,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
