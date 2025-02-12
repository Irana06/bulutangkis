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
        Schema::create('tim', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('kompetisi_1')->constrained('kompetisi')->onDelete('cascade');
            $table->foreignUuid('kompetisi_2')->constrained('kompetisi')->onDelete('cascade');
            $table->unique(['kompetisi_1', 'kompetisi_2']);
            $table->enum('jenis', ['GANDA', 'CAMPURAN']);
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
        Schema::dropIfExists('tim');
    }
};
