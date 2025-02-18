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
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('tahun');
            $table->integer('sesi')->unique();
            $table->integer('kuota_tunggal');
            $table->integer('kuota_ganda');
            $table->integer('kuota_campuran');
            $table->string('lokasi');
            $table->boolean('dibuka');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
