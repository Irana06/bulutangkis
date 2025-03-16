<?php

use App\Enums\BabakPertandinganEnum;
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
        Schema::create('scores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('babak', BabakPertandinganEnum::values())->default('AWAL')->nullable();
            $table->foreignUuid('pertandingan_id')->constrained('pertandingan')->onDelete('cascade');
            $table->foreignUuid('pemenang_id')->nullable()->constrained('tanding')->onDelete('set null'); // Pemenang bisa atlet atau tim
            $table->integer('skor_tanding_1');
            $table->integer('skor_tanding_2');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
