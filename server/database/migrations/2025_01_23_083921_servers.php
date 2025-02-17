<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->timestamps();
        });

        //typeカラムはpublicかprivateのみ許可
        DB::statement('ALTER TABLE channels ADD CONSTRAINT check_type CHECK (type IN ("public", "private"))');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
