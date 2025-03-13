<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tim extends Model
{
    use HasFactory, HasUuid;

    protected $appends = ['atlet_1', 'atlet_2', 'kontingen'];

    protected $fillable = [
        'nama_tim',
        'jenis',
        'atlet_id_1',
        'atlet_id_2',
    ];

    protected $table = 'tim';

    protected $keyType = 'string';

    public function getAtlet1Attribute(): ?Atlet
    {
        return $this->atlet1()->first();
    }

    public function getAtlet2Attribute():?Atlet
    {
        return $this->atlet2()->first();
    }

    public function getKontingenAttribute(): ?Kontingen
    {
        return $this->kontingen()->first();
    }

    public function kontingen()
    {
        return $this->belongsTo(Kontingen::class);
    }

    public function atlet1()
    {
        return $this->belongsTo(Atlet::class, 'atlet_id_1');
    }

    public function atlet2()
    {
        return $this->belongsTo(Atlet::class, 'atlet_id_2');
    }
}
