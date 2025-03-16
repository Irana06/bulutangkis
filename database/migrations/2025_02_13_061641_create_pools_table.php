<?php

use App\Enums\StatusPoolsEnum;
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
        Schema::create('pools', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('kategori_tanding_id')->constrained('kategori_tanding')->onDelete('cascade');
            $table->foreignUuid('event_id')->constrained('events')->onDelete('cascade');
            $table->integer('max_peserta')->default(4);
            $table->enum('status', StatusPoolsEnum::values())->default('BELUM_PENUH')->nullable(); // Menandakan pool siap digunakan
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pools');
    }
};
