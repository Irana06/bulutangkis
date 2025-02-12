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
        Schema::create('kategori_tanding_tunggal', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tingkat');
            $table->string('jenis_kelamin');
            $table->string('kelas');
            $table->string('umur');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('kategori_tanding_ganda', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tingkat');
            $table->string('jenis_kelamin');
            $table->string('kelas');
            $table->string('umur');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('kategori_tanding_campuran', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tingkat');
            $table->string('jenis_kelamin');
            $table->string('kelas');
            $table->string('umur');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_tanding_tunggal');
        Schema::dropIfExists('kategori_tanding_ganda');
        Schema::dropIfExists('kategori_tanding_campuran');
    }
};
