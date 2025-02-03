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
        Schema::dropIfExists('messages_in_dm');

        Schema::create('messages_in_dm', function (Blueprint $table) {
            $table->text('content');
            $table->timestamp("created_at");
            $table->timestamp("updated_at");

            $table->uuid('dm_id');
            $table->foreign('dm_id')->references('id')->on('dm')->onDelete('cascade');

            $table->primary(['dm_id', 'created_at']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages_in_dm', function (Blueprint $table) {
            //
        });
    }
};
