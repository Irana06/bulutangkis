<?php

namespace App\Http\Controllers;

use App\Models\Atlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:LAKI_LAKI,PEREMPUAN',
            'nik' => 'required|digits:16|unique:atlet,nik',
            'no_kk' => 'required|digits:16|unique:atlet,no_kk',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'berat_badan' => 'numeric|min:1|max:999.99',
            'tinggi_badan' => 'numeric|min:1|max:999.99',
        ])->validate();

        // Hitung umur berdasarkan tanggal lahir
        // $validatedData['umur'] = now()->diffInYears($validatedData['tanggal_lahir']);

        // Tambahkan kontingen_id dari user yang sedang login
        $validatedData['kontingen_id'] = auth()->id();

        Atlet::create($validatedData);

        return redirect()->route('peserta.index')->with('success', 'Atlet berhasil ditambahkan');
    }
}
