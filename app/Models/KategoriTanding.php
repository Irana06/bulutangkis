<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriTanding extends Model
{
    use HasFactory, HasUuid;

    protected $table = 'kategori_tanding';

    protected $keyType = 'string';
}
