<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum BabakPertandinganEnum
{
    case AWAL;
    case KEDUA;
    case AKHIR;

    use EnumUtils;
}
