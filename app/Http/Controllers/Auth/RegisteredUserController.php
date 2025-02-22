<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\EventController;
use App\Models\Kontingen;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

    public function create(): Response
    {
        return Inertia::render('Auth/Auth', [
            'isRegister' => true,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $eventController = new EventController();
        $eventId = $eventController->getOpenEvent();

        if (!$eventId || !preg_match('/^[a-f0-9\-]{36}$/', $eventId)) {
            return back()->withErrors(['event_id' => 'Event tidak valid atau tidak ditemukan.']);
        }
        
        // Perbaikan validasi password (tidak perlu 'confirmed')
        $request->validate([
            'namaKontingen' => 'required|string|max:255',
            'emailKontingen' => 'required|string|lowercase|email|max:255|unique:kontingen,email',
            'password' => 'required|string|min:6',
            'retypePassword' => 'required|same:password', // Validasi manual
            'penanggungJawab' => 'required|string|max:255',
            'noTelepon' => 'required|string|max:15',
            'asalKontingen' => 'required|string',
            'alamat' => 'required|string|max:500',
        ]);

        // Buat user baru di tabel `kontingen`
        $kontingen = Kontingen::create([
            'name' => $request->namaKontingen,
            'email' => $request->emailKontingen,
            'password' => Hash::make($request->password),
            'penanggung_jawab' => $request->penanggungJawab,
            'no_hp_penanggung_jawab' => $request->noTelepon,
            'asal_kontingen' => $request->asalKontingen,
            'alamat_lengkap' => $request->alamat,
            'event_id' => $eventId,
        ]);

        event(new Registered($kontingen));

        // Perbaikan: Pastikan model Kontingen bisa di-autentikasi
        Auth::guard('web')->login($kontingen);

        return redirect(RouteServiceProvider::HOME);
    }
}
