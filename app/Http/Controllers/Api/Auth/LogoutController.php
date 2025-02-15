<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\RouteDiscovery\Attributes\Route;

class LogoutController extends Controller
{
    #[Route(fullUri: 'auth/logout', method: 'POST', middleware: ['auth:sanctum'])]
    public function __invoke(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'You have been logged out successfully.'], 200);
    }
}
