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
        Schema::create('tim_atlet', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tim_id')->constrained('tim')->onDelete('cascade');
            $table->foreignUuid('atlet_id')->constrained('atlet')->onDelete('cascade');
            $table->unique(['tim_id', 'atlet_id']); // Mencegah duplikasi atlet dalam tim
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tim_atlet');
    }
};
