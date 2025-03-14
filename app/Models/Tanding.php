<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tanding extends Model
{
    use HasFactory, HasUuid;

    protected $appends = ['atlet', 'kontingen', 'kategori_tanding'];

    protected $table = 'tanding';

    protected $keyType = 'string';

    protected $fillable = [
        'kategori_tanding_id',
        'event_id',
        'atlet_id',
        'tim_id',
    ];

    public function getAtletAttribute(): ?Atlet
    {
        return $this->atlet()->first();
    }
    public function getKontingenAttribute(): ?Kontingen
    {
        return $this->atlet ? $this->atlet->kontingen()->first() : null;
    }

    public function getKategoriTandingAttribute(): ?KategoriTanding
    {
        return $this->kategoriTanding()->first();
    }

    public function atlet()
    {
        return $this->belongsTo(Atlet::class);
    }
    public function kategoriTanding()
    {
        return $this->belongsTo(KategoriTanding::class);
    }

    public function tim()
    {
        return $this->belongsTo(Tim::class);
    }
}
