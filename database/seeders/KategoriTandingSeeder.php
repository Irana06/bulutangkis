<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class KategoriTandingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoriTanding = [
            // SD
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SD', 'kelompok_umur' => 'Pra Dini', 'min_umur' => 7, 'max_umur' => 9],
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SD', 'kelompok_umur' => 'Usia Dini', 'min_umur' => 10, 'max_umur' => 12],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SD', 'kelompok_umur' => 'Pra Dini', 'min_umur' => 7, 'max_umur' => 9],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SD', 'kelompok_umur' => 'Usia Dini', 'min_umur' => 10, 'max_umur' => 12],

            // SMP
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pra Remaja', 'min_umur' => 13, 'max_umur' => 15],
            ['jenis' => 'GANDA_PUTRI', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pra Remaja', 'min_umur' => 13, 'max_umur' => 15],

            // SMA/SMK
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Remaja', 'min_umur' => 16, 'max_umur' => 18],
            ['jenis' => 'GANDA_PUTRI', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Remaja', 'min_umur' => 16, 'max_umur' => 18],

            // CAMPURAN
            ['jenis' => 'CAMPURAN', 'tingkat' => 'SD', 'kelompok_umur' => 'Pra Dini', 'min_umur' => 7, 'max_umur' => 9],
            ['jenis' => 'CAMPURAN', 'tingkat' => 'SD', 'kelompok_umur' => 'Usia Dini', 'min_umur' => 10, 'max_umur' => 12],

            ['jenis' => 'CAMPURAN', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pra Remaja', 'min_umur' => 13, 'max_umur' => 15],

            ['jenis' => 'CAMPURAN', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Remaja', 'min_umur' => 16, 'max_umur' => 18],

            // TUNGGAKAN
            ['jenis' => 'TUNGGAKAN', 'tingkat' => 'TUNGGAKAN', 'kelompok_umur' => 'Taruna', 'min_umur' => 19, 'max_umur' => 25],
        ];

        foreach ($kategoriTanding as $kategori) {
            DB::table('kategori_tanding')->insert([
                'id' => Str::uuid(),
                'jenis' => $kategori['jenis'],
                'tingkat' => $kategori['tingkat'],
                'kelompok_umur' => $kategori['kelompok_umur'],
                'min_umur' => $kategori['min_umur'],
                'max_umur' => $kategori['max_umur'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
