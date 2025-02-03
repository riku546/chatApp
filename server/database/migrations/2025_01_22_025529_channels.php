<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('channels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->uuid('join_code')->default(Str::uuid());
            $table->timestamps();

            $table->unsignedBigInteger('server_id');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');
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
