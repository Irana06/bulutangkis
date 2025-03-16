<?php

use App\Enums\AsalKontingenEnum;
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
        Schema::create('kontingen', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('penanggung_jawab');
            $table->string('no_hp_penanggung_jawab');
            $table->enum('asal_kontingen', AsalKontingenEnum::values())->nullable();
            $table->text('alamat_lengkap');

            $table->foreignUuid('event_id')->nullable()->constrained('events')->onDelete('cascade');

            $table->boolean('dibayar')->default(false)->nullable();
            $table->enum('role', ['admin', 'default'])->default('default');
            $table->integer('biaya')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
