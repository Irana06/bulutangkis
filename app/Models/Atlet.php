<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atlet extends Model
{
    use HasFactory, HasUuid;

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

    public function kontingen()
    {
        return $this->belongsTo(Kontingen::class);
    }
}
