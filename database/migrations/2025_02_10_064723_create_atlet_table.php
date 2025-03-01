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
        Schema::create('atlet', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->enum('jenis_kelamin', ['LAKI_LAKI', 'PEREMPUAN']);
            $table->unsignedBigInteger('nik')->unique();
            $table->unsignedBigInteger('no_kk');
            $table->date('tanggal_lahir');
            $table->integer('umur');
            $table->string('tempat_lahir');
            $table->decimal('berat_badan', 4, 2)->nullable();
            $table->decimal('tinggi_badan', 5, 2)->nullable();
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
        Schema::dropIfExists('atlet');
    }
};
