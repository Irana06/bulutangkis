<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum JenisTimEnum
{
    case GANDA;
    case CAMPURAN;

    use EnumUtils;
}
