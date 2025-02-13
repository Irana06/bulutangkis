<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait EnumUtils
{
    public static function values(): array
    {
        $cases = self::cases();

        return array_map(fn ($case) => $case->name, $cases);
    }

    public static function toSelect(): array
    {
        $cases = self::cases();

        return array_map(fn ($case) => [
            'value' => $case->name,
            'label' => Str::replace('_', ' ', Str::title($case->name)),
        ], $cases);
    }
}
