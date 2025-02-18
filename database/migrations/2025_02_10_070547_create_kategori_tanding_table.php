<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kategori_tanding', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('jenis', ['TUNGGAL_PUTRA', 'TUNGGAL_PUTRI', 'GANDA_PUTRA', 'GANDA_PUTRI', 'CAMPURAN', 'TUNGGAKAN']);
            $table->enum('tingkat', ['SD', 'SMP', 'SMA', 'TUNGGAKAN']);
            $table->string('kelompok_umur'); // Misal: '7-9', '10-12'
            $table->integer('min_umur');
            $table->integer('max_umur');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_tanding');
    }
};
