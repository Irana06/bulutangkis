<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum StatusPertandinganEnum
{
    case TERJADWAL;
    case SELESAI;
    case DIBATALKAN;

    use EnumUtils;
}
