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
            $table->enum('jenis', ['TUNGGAL', 'GANDA', 'CAMPURAN']);
            $table->string('tingkat');
            $table->enum('jenis_kelamin', ['LAKI_LAKI', 'PEREMPUAN', 'CAMPURAN']);
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
        Schema::dropIfExists('kategori_tanding');
    }
};
