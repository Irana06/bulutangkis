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
        Schema::create('pertandingan_tree', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('pertandingan_id')->constrained('pertandingan')->onDelete('cascade');
            $table->foreignUuid('pertandingan_sebelumnya_1')->nullable()->constrained('pertandingan')->onDelete('cascade');
            $table->foreignUuid('pertandingan_sebelumnya_2')->nullable()->constrained('pertandingan')->onDelete('cascade');
            $table->foreignUuid('pemenang_id')->nullable()->constrained('kompetisi')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pertandingan_tree');
    }
};
