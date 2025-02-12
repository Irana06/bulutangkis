<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'tahun', 'kuota_tunggal', 'kuota_ganda', 'lokasi'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            // Cari sesi yang hilang (misalnya karena soft delete)
            $missingSesi = self::getMissingSesi();
            $event->sesi = $missingSesi;
        });
    }

    private static function getMissingSesi()
    {
        // Ambil semua sesi yang masih ada dalam bentuk array
        $existingSessions = self::pluck('sesi')->toArray();

        // Jika tidak ada sesi, mulai dari 1
        if (empty($existingSessions)) {
            return 1;
        }

        // Cari angka sesi yang hilang (misalnya ada soft delete)
        for ($i = 1; $i <= max($existingSessions) + 1; $i++) {
            if (!in_array($i, $existingSessions)) {
                return $i;
            }
        }
    }
}
