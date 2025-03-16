<?php

namespace App\Enums;

use App\Traits\EnumUtils;

enum StatusPoolsEnum
{
    case BELUM_PENUH;
    case PENUH;

    use EnumUtils;
}
