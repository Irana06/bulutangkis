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
        Schema::create('tanding', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('kategori_tanding_id')->constrained('kategori_tanding')->onDelete('cascade');
            $table->foreignUuid('event_id')->constrained('events')->onDelete('cascade');

            // Bisa berupa atlet (untuk Tunggal) atau tim (untuk Ganda/Campuran)
            $table->foreignUuid('atlet_id')->nullable()->constrained('atlet')->onDelete('cascade');
            $table->foreignUuid('tim_id')->nullable()->constrained('tim')->onDelete('cascade');

            $table->boolean('dibayar')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kompetisi');
    }
};
