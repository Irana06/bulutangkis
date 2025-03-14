<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tanding\StoreRequest;
use App\Models\Atlet;
use App\Models\KategoriTanding;
use App\Models\Tanding;
use App\Models\Tim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $tanding = Tanding::where(function ($query) use ($kontingenId) {
            // Hanya menampilkan atlet jika kategori adalah tunggal
            $query->whereHas('atlet', function ($subQuery) use ($kontingenId) {
                $subQuery->where('kontingen_id', $kontingenId);
            })
            // Hanya menampilkan tim jika kategori adalah ganda/campuran
            ->orWhereHas('tim', function ($subQuery) use ($kontingenId) {
                $subQuery->where('kontingen_id', $kontingenId);
            });
        });

        // Filter berdasarkan jenis kategori tanding
        $tanding->whereHas('kategoriTanding', function ($query) use ($filterTunggal, $filterGanda, $filterCampuran) {
            if ($filterTunggal) {
                $query->whereIn('jenis', ['TUNGGAL_PUTRA', 'TUNGGAL_PUTRI']);
            } elseif ($filterGanda) {
                $query->whereIn('jenis', ['GANDA_PUTRA', 'GANDA_PUTRI']);
            } elseif ($filterCampuran) {
                $query->where('jenis', 'CAMPURAN');
            }
        });

        return Inertia::render('Dashboard', [
            'child' => 'Tanding/ListTanding',
            'childText' => $filterTunggal ? 'Tunggal' : ($filterGanda ? 'Ganda' : 'Campuran'),
            'tanding' => $tanding->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        $kategoriTanding = KategoriTanding::all();

        // Ambil atlet yang belum terdaftar di tabel Tanding
        $atlet = Atlet::where('kontingen_id', $kontingenId)
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('tanding')
                    ->whereColumn('tanding.atlet_id', 'atlet.id');
            })
            ->get();

        // Ambil tim yang belum terdaftar di tabel Tanding
        $tim = Tim::where('kontingen_id', $kontingenId)
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('tanding')
                    ->whereColumn('tanding.tim_id', 'tim.id');
            })
            ->get();

        return Inertia::render('Dashboard', [
            'child' => 'Tanding/CreateEditTanding',
            'kategoriTanding' => $kategoriTanding,
            'atlet' => $atlet,
            'tim' => $tim,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $eventController = new EventController();
        $eventId = $eventController->getOpenEvent();

        if (!$eventId || !preg_match('/^[a-f0-9\-]{36}$/', $eventId)) {
            return back()->withErrors(['event_id' => 'Event tidak valid atau tidak ditemukan.']);
        }

        // Pastikan setidaknya salah satu dari atlet_id atau tim_id dikirimkan
        if (!$request->has('atlet_id') && !$request->has('tim_id')) {
            return redirect()->back()->withErrors(['error' => 'Harap pilih atlet atau tim untuk bertanding.']);
        }

        // Buat data pertandingan
        Tanding::create([
            'atlet_id' => $validatedData['atlet_id'] ?? null,
            'tim_id' => $validatedData['tim_id'] ?? null,
            'kategori_tanding_id' => $validatedData['kategori_tanding_id'],
            'event_id' => $eventId,
        ]);

        return redirect()->route('tanding.index')->with('success', 'Pertandingan berhasil dibuat.');
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
    public function destroy($id)
    {
        $tanding = Tanding::findOrFail($id);
        $tanding->delete();

        return redirect()->route('tanding.index')->with('success', 'Tanding berhasil dihapus');
    }
}
