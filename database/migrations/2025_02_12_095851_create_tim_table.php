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
        Schema::create('tim_ganda', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('atlet_1')->constrained('kompetisi_ganda')->onDelete('cascade');
            $table->foreignUuid('atlet_2')->constrained('kompetisi_ganda')->onDelete('cascade');
            $table->unique(['atlet_1', 'atlet_2']);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('tim_campuran', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('atlet_1')->constrained('kompetisi_campuran')->onDelete('cascade');
            $table->foreignUuid('atlet_2')->constrained('kompetisi_campuran')->onDelete('cascade');
            $table->unique(['atlet_1', 'atlet_2']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tim_ganda');
        Schema::dropIfExists('tim_campuran');
    }
};
