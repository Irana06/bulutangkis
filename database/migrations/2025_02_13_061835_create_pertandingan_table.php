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
        Schema::create('pertandingan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('pool_id')->nullable()->constrained('pools')->onDelete('cascade');
            $table->foreignUuid('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignUuid('kontingen_1')->constrained('kontingen')->onDelete('cascade');
            $table->foreignUuid('kontingen_2')->constrained('kontingen')->onDelete('cascade');
            $table->timestamp('waktu_pertandingan');
            $table->enum('status', ['TERJADWAL', 'SELESAI', 'DIBATALKAN']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pertandingan');
    }
};
