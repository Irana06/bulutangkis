<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('atlet', function (Blueprint $table) {
            $table->decimal('berat_badan', 4, 2)->change();
            $table->decimal('tinggi_badan', 5, 2)->change();
        });
    }

    public function down()
    {
        Schema::table('atlet', function (Blueprint $table) {
            $table->decimal('berat_badan', 3, 2)->change(); // Sesuaikan dengan tipe awal
            $table->decimal('tinggi_badan', 3, 2)->change(); // Sesuaikan dengan tipe awal
        });
    }

};
