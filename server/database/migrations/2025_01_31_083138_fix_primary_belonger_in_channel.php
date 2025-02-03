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

        Schema::dropIfExists('belonger_in_channel');

        Schema::create('belonger_in_channel', function (Blueprint $table) {
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('channel_id');
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');

            $table->primary(['user_id', 'channel_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('belonger_in_channel', function (Blueprint $table) {
            //
        });
    }
};
