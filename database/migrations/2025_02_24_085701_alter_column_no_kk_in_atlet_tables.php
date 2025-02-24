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
        Schema::table('atlet', function (Blueprint $table) {
            // Hapus constraint unik terlebih dahulu jika ada
            $table->dropUnique('atlet_no_kk_unique');

            // Sekarang ubah tipe data kolom
            $table->unsignedBigInteger('no_kk')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('atlet', function (Blueprint $table) {
            // Kembalikan menjadi unik jika rollback
            $table->unsignedBigInteger('no_kk')->unique()->change();
        });
    }
};

