<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tim\StoreRequest;
use App\Models\Atlet;
use App\Models\Tim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        $tim = Tim::where('kontingen_id', $kontingenId)->get();

        return Inertia::render('Dashboard', [
            'child' => 'Tim/ListTim',
            'tim' => $tim,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        // Ambil atlet yang belum terdaftar di tabel Tim berdasarkan atlet_id_1 dan atlet_id_2
        $atlet = Atlet::where('kontingen_id', $kontingenId)
            ->whereNotIn('id', function ($query) {
                $query->select('atlet_id_1')->from('tim')->whereNotNull('atlet_id_1');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('atlet_id_2')->from('tim')->whereNotNull('atlet_id_2');
            })
            ->get(); // Pilih hanya kolom yang diperlukan

        return Inertia::render('Dashboard', [
            'child' => 'Tim/CreateEditTim',
            'atlet' => $atlet,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $user = auth()->user();
        $kontingenId = $user->id;

        $eventController = new EventController();
        $eventId = $eventController->getOpenEvent();

        if (!$eventId || !preg_match('/^[a-f0-9\-]{36}$/', $eventId)) {
            return back()->withErrors(['event_id' => 'Event tidak valid atau tidak ditemukan.']);
        }

        Tim::create([
            'nama_tim' => $validatedData['nama_tim'],
            'kontingen_id' => $kontingenId,
            'jenis' => $validatedData['jenis'],
            'event_id' => $eventId,
            'atlet_id_1' => $validatedData['atlet_id_1'],
            'atlet_id_2' => $validatedData['atlet_id_2'],
        ]);

        return redirect()->route('tim.index')->with(['success' => 'Tim berhasil disimpan.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
