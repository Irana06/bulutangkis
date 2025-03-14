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
            $table->string('nama_tim');
            $table->enum('jenis', ['GANDA']);
            $table->foreignUuid('atlet_id_1')->constrained('atlet')->onDelete('cascade');
            $table->foreignUuid('atlet_id_2')->constrained('atlet')->onDelete('cascade');
            $table->unique(['atlet_id_1', 'atlet_id_2']); // Mencegah duplikasi atlet dalam tim
            $table->foreignUuid('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignUuid('kontingen_id')->constrained('kontingen')->onDelete('cascade');
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
