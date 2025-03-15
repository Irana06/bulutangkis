<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            [
                'id' => 'c5dd37dc-05bb-4073-8f99-7b5563037f0c',
                'tahun' => 2025,
                'sesi' => 1,
                'kuota_peserta' => 1200,
                'lokasi' => 'GOR Donokerto Turi',
                'dibuka' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
