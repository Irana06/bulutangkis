<?php

namespace App\Http\Controllers;

use App\Models\Kontingen;
use App\Models\Tanding;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $kontingenId = $user->id;

        $tanding = Tanding::where(function ($query) {
            $query->where('dibayar', false)
                ->orWhereNull('dibayar');
        })
            ->where(function ($query) use ($kontingenId) {
                $query->whereHas('atlet', fn($q) => $q->where('kontingen_id', $kontingenId))
                    ->orWhereHas('tim', fn($q) => $q->where('kontingen_id', $kontingenId));
            })
            ->get();

        return Inertia::render('Dashboard', [
            'child' => 'Pembayaran/ListPembayaran',
            'tanding' => $tanding,
        ]);
    }

    public function show($id)
    {
        $tanding = Tanding::findOrFail($id);

        return Inertia::render('Dashboard', [
            'child' => 'Pembayaran/DetailPembayaran',
            'tanding' => $tanding,
        ]);
    }

    public function checkout($id)
    {
        $tanding = Tanding::findOrFail($id);

        return Inertia::render('Dashboard', [
            'child' => 'Pembayaran/CheckoutPembayaran',
            'tanding' => $tanding,
        ]);
    }

    public function listConfirmations()
    {
        $tanding = Tanding::where(function ($query) {
            $query->where('dibayar', false)
                ->orWhereNull('dibayar');
        })->get();

        $kontingen = Kontingen::where(function ($query) {
            $query->where('dibayar', false)
                ->orWhereNull('dibayar');
        })->get();

        return Inertia::render('Dashboard', [
            'child' => 'Pembayaran/ListKonfirmasiPembayaran',
            'tanding' => $tanding,
            'kontingen' => $kontingen,
        ]);
    }

    public function confirmPayment(Request $request)
    {
        if ($request->has('tanding_id')) {
            $tanding = Tanding::findOrFail($request->tanding_id);
            $tanding->dibayar = true;
            $tanding->save();
        }

        if ($request->has('kontingen_id')) {
            $kontingen = Kontingen::findOrFail($request->kontingen_id);
            $kontingen->dibayar = true;
            $kontingen->save();
        }

        return redirect()->route('pembayaran.listConfirmations');
    }

    public function searchQuery(Request $request)
    {
        $queryTanding = Tanding::query();
        $queryKontingen = Kontingen::query();

        // Filter berdasarkan tanding_id jika ada
        if ($request->has('tanding_id') && !empty($request->tanding_id)) {
            $queryTanding->where('id', $request->tanding_id);
        }

        // Filter berdasarkan kontingen_id jika ada
        if ($request->has('kontingen_id') && !empty($request->kontingen_id)) {
            $queryKontingen->where('id', $request->kontingen_id);
        }

        // Ambil hasil filter
        $tanding = $queryTanding->where(function ($query) {
            $query->where('dibayar', false)
                ->orWhereNull('dibayar');
        })->get();

        $kontingen = $queryKontingen->where(function ($query) {
            $query->where('dibayar', false)
                ->orWhereNull('dibayar');
        })->get();

        // Jika ID tidak ditemukan, kirim flash message
        if ($request->has('tanding_id') && $tanding->isEmpty()) {
            return redirect()->back()->with('error', 'ID Tanding tidak ditemukan.');
        }

        if ($request->has('kontingen_id') && $kontingen->isEmpty()) {
            return redirect()->back()->with('error', 'ID Kontingen tidak ditemukan.');
        }

        return Inertia::render('Dashboard', [
            'child' => 'Pembayaran/ListKonfirmasiPembayaran',
            'tanding' => $tanding,
            'kontingen' => $kontingen,
            'flash' => session('error'),
        ]);
    }

    public function showBulk(Request $request)
    {
        $ids = $request->input('ids', []);
        $tanding = Tanding::whereIn('id', $ids)->get();

        return Inertia::render('Dashboard', [
            'child' => 'Pembayaran/DetailBulkPembayaran',
            'tanding' => $tanding,
        ]);
    }
}
