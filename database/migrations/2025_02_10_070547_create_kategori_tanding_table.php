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
            $table->string('tingkat');
            $table->string('jenis_kelamin');
            $table->string('kelas');
            $table->string('berat_badan');
            $table->integer('kuota');
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
