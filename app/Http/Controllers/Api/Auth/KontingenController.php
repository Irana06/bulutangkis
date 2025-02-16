<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Kontingen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Spatie\RouteDiscovery\Attributes\Route;
use Illuminate\Validation\Rule;

class KontingenController extends Controller
{
    #[Route(fullUri: 'auth/register', method: 'POST')]
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:kontingen',
            'password' => 'required|string|min:6',
            'penanggung_jawab' => 'required|string|max:255',
            'no_hp_penanggung_jawab' => 'required|string|max:15',
            'asal_kontingen' => ['required', Rule::in(['LUAR_NEGERI', 'DALAM_NEGERI'])],
            'alamat_lengkap' => 'required|string',
            'event_id' => 'required|uuid|exists:events,id',
        ]);

        $kontingen = Kontingen::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'penanggung_jawab' => $validated['penanggung_jawab'],
            'no_hp_penanggung_jawab' => $validated['no_hp_penanggung_jawab'],
            'asal_kontingen' => $validated['asal_kontingen'],
            'alamat_lengkap' => $validated['alamat_lengkap'],
            'event_id' => $validated['event_id'],
        ]);

        return response()->json([
            'message' => 'Kontingen Registered Successfully.',
            'token' => $kontingen->createToken('auth_token')->plainTextToken,
            'data' => $kontingen,
        ], 201);
    }

    #[Route(fullUri: 'auth/user/my', method: 'GET', middleware: ['auth:sanctum'])]
    public function my()
    {
        // Dapatkan user yang login
        $user = Auth::user();

        abort_unless($user, 401, 'Unauthorized');

        return response()->json([
            'status' => 'success',
            'user' => $user,
        ], 200);
    }
}
