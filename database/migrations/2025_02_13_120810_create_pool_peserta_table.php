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
        Schema::create('pool_peserta', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('pool_id')->constrained('pools')->onDelete('cascade');
            $table->foreignUuid('kompetisi_id')->constrained('kompetisi')->onDelete('cascade'); // Bisa atlet atau tim
            $table->foreignUuid('juara_pool_id')->nullable()->constrained('kompetisi')->onDelete('set null');
            $table->unique(['pool_id', 'kompetisi_id']); // Mencegah peserta masuk lebih dari sekali ke pool
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pool_peserta');
    }
};
