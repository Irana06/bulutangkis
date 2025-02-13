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
        Schema::create('decision_tree_rules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kondisi'); // Contoh: "umur >= 7 AND umur <= 9"
            $table->string('kategori_tanding');
            $table->string('level'); // "SD", "SMP", "SMA", "TUNGGAKAN"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('decision_tree_rules');
    }
};
