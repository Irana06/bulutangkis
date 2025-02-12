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
        Schema::create('kompetisi_tunggal', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('atlet_id')->constrained('atlet')->onDelete('cascade');
            $table->foreignUuid('kategori_tanding_tunggal_id')->constrained('kategori_tanding_tunggal')->onDelete('cascade');
            $table->foreignUuid('kontingen_id')->constrained('kontingen')->onDelete('cascade');
            $table->foreignUuid('event_id')->constrained('events')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kompetisi_tunggal');
    }
};
