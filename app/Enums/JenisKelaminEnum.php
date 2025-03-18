<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum JenisKelaminEnum
{
    case LAKI_LAKI;
    case PEREMPUAN;

    use EnumUtils;
}
