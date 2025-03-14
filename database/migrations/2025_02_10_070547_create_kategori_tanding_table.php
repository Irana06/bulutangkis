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
            $table->enum('jenis', [
                'TUNGGAL_PUTRA',
                'TUNGGAL_PUTRI',
                'GANDA_PUTRA',
                'GANDA_PUTRI',
            ]);
            $table->string('tingkat')->nullable();
            $table->string('kelompok_umur'); // Misal: '8-9', '9-10'
            $table->integer('min_umur');
            $table->integer('max_umur')->nullable();
            $table->integer('biaya');
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
