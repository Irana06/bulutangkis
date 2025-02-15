<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Kontingen;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Spatie\RouteDiscovery\Attributes\Route;

class LoginController extends Controller
{
    #[Route(method: 'POST')]
    public function __invoke(Request $request): JsonResponse
    {
        $credentials = $this->getCredentials($request);

        if (Auth::attempt($credentials)) {
            /** @var Kontingen $user */
            $user = Auth::user();

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Login successfully.',
                    'access_token' => $user->createToken('MyApp')->plainTextToken,
                    'token_type' => 'Bearer',
                    'expires_in' => 3600,
                    'user' => $user,
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'status' => 'invalid_grant',
                    'message' => 'Invalid User credentials',
                    'user' => $credentials,
                ],
                401
            );
        }
    }

    private function getCredentials(Request $request): array
    {
        return [
            'email' => $request->username,
            'password' => $request->password,
            'deleted_at' => null,
        ];
    }
}
