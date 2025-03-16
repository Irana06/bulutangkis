<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum JenisKategoriTandingEnum
{
    case TUNGGAL_PUTRA;
    case TUNGGAL_PUTRI;
    case GANDA_PUTRA;
    case GANDA_PUTRI;
    case GANDA_CAMPURAN;

    use EnumUtils;
}
