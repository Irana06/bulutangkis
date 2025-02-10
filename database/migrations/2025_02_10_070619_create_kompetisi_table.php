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
        Schema::create('kompetisi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('atlet_id');
            $table->foreign('atlet_id')->references('id')->on('atlet')->onDelete('cascade');
            $table->uuid('kategori_tanding_id');
            $table->foreign('kategori_tanding_id')->references('id')->on('kategori_tanding')->onDelete('cascade');
            $table->uuid('kontingen_id');
            $table->foreign('kontingen_id')->references('id')->on('kontingen')->onDelete('cascade');
            $table->string('info');
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
