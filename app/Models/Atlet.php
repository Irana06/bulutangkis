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

    public function kontingen()
    {
        return $this->belongsTo(Kontingen::class);
    }
}
