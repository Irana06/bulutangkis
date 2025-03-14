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
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SD', 'kelompok_umur' => 'Pra Dini', 'min_umur' => 8, 'max_umur' => 9, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SD', 'kelompok_umur' => 'Usia Dini', 'min_umur' => 9, 'max_umur' => 10, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SD', 'kelompok_umur' => 'Anak-Anak', 'min_umur' => 11, 'max_umur' => 12, 'biaya' => '150000'],

            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SD', 'kelompok_umur' => 'Pra Dini', 'min_umur' => 8, 'max_umur' => 9, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SD', 'kelompok_umur' => 'Usia Dini', 'min_umur' => 9, 'max_umur' => 10, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SD', 'kelompok_umur' => 'Anak-Anak', 'min_umur' => 11, 'max_umur' => 12, 'biaya' => '150000'],

            // SMP
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pemula', 'min_umur' => 13, 'max_umur' => 14, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SMP', 'kelompok_umur' => 'Remaja', 'min_umur' => 15, 'max_umur' => 16, 'biaya' => '150000'],

            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pemula', 'min_umur' => 13, 'max_umur' => 14, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SMP', 'kelompok_umur' => 'Remaja', 'min_umur' => 15, 'max_umur' => 16, 'biaya' => '150000'],

            // SMA/SMK
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Taruna', 'min_umur' => 17, 'max_umur' => 18, 'biaya' => '150000'],

            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Taruna', 'min_umur' => 17, 'max_umur' => 18, 'biaya' => '150000'],

            // DEWASA
            ['jenis' => 'TUNGGAL_PUTRA', 'tingkat' => 'DEWASA', 'kelompok_umur' => 'Dewasa', 'min_umur' => 19, 'max_umur' => null, 'biaya' => '150000'],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'DEWASA', 'kelompok_umur' => 'Dewasa', 'min_umur' => 19, 'max_umur' => null, 'biaya' => '150000'],

            ////////////////////////////////// Ganda //////////////////////////////////

            // Anak-Anak
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'SD', 'kelompok_umur' => 'Anak-Anak', 'min_umur' => 11, 'max_umur' => 12, 'biaya' => '200000'],
            ['jenis' => 'GANDA_PUTRI', 'tingkat' => 'SD', 'kelompok_umur' => 'Anak-Anak', 'min_umur' => 11, 'max_umur' => 12, 'biaya' => '200000'],

            // Pemula
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pemula', 'min_umur' => 13, 'max_umur' => 14, 'biaya' => '200000'],
            ['jenis' => 'TUNGGAL_PUTRI', 'tingkat' => 'SMP', 'kelompok_umur' => 'Pemula', 'min_umur' => 13, 'max_umur' => 14, 'biaya' => '200000'],

            // Remaja
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Remaja', 'min_umur' => 15, 'max_umur' => 16, 'biaya' => '200000'],
            ['jenis' => 'GANDA_PUTRI', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Remaja', 'min_umur' => 15, 'max_umur' => 16, 'biaya' => '200000'],

            // Taruna
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Taruna', 'min_umur' => 17, 'max_umur' => 18, 'biaya' => '200000'],
            ['jenis' => 'GANDA_PUTRI', 'tingkat' => 'SMA/SMK', 'kelompok_umur' => 'Taruna', 'min_umur' => 17, 'max_umur' => 18, 'biaya' => '200000'],

            // DEWASA
            ['jenis' => 'GANDA_PUTRA', 'tingkat' => 'DEWASA', 'kelompok_umur' => 'Dewasa', 'min_umur' => 19, 'max_umur' => null, 'biaya' => '200000'],
            ['jenis' => 'GANDA_PUTRI', 'tingkat' => 'DEWASA', 'kelompok_umur' => 'Dewasa', 'min_umur' => 19, 'max_umur' => null, 'biaya' => '200000'],
        ];

        foreach ($kategoriTanding as $kategori) {
            DB::table('kategori_tanding')->insert([
                'id' => Str::uuid(),
                'jenis' => $kategori['jenis'],
                'tingkat' => $kategori['tingkat'],
                'kelompok_umur' => $kategori['kelompok_umur'],
                'min_umur' => $kategori['min_umur'],
                'max_umur' => $kategori['max_umur'],
                'biaya' => $kategori['biaya'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
