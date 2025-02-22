<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
        /**
     * Mendapatkan event yang sedang dibuka.
     */
    public function getOpenEvent(): ?string
    {
        // Ambil event yang memiliki "dibuka" bernilai true
        $event = Event::where('dibuka', true)->first();

        return $event ? (string) $event->id : null;
    }


    /**
     * Mendapatkan ID event yang terbuka dalam bentuk JSON response.
     */
    public function fetchOpenEvent(): JsonResponse
    {
        $eventId = $this->getOpenEvent();

        return response()->json(["event_id" => $eventId]);
    }
}
