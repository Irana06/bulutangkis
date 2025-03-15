<?php

namespace App\Http\Controllers;

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
}
