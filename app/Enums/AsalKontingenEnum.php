<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum AsalKontingenEnum
{
    case DALAM_NEGERI;
    case LUAR_NEGERI;

    use EnumUtils;
}
