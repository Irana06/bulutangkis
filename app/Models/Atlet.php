<?php

namespace App\Models;

use App\Traits\HasUuid;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property-read string|null $foto_profile_url
 */
class Atlet extends Model implements HasMedia
{
    use HasFactory, HasUuid, InteractsWithMedia;

    protected $keyType = 'string';

    protected $table = 'atlet';

    protected $fillable = [
        'name',
        'jenis_kelamin',
        'nik',
        'no_kk',
        'tanggal_lahir',
        'tempat_lahir',
        'berat_badan',
        'tinggi_badan',
        'kontingen_id',
    ];

    protected $appends = ['foto_profile_url', 'umur_update', 'kontingen'];

    public function getFotoProfileUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('foto_profile') ?: null;
    }

    public function getUmurUpdateAttribute(): int
    {
        return Carbon::parse($this->tanggal_lahir)->age;
    }

    public function getKontingenAttribute(): ?Kontingen
    {
        return $this->kontingen()->first();
    }

    public function kontingen()
    {
        return $this->belongsTo(Kontingen::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('foto_profile')->singleFile();
    }
}
