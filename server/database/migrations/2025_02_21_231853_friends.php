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

        Schema::create('friends', function (Blueprint $table) {

            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('friend_id');
            $table->foreign('friend_id')->references('id')->on('users')->onDelete('cascade');

            $table->uuid('dm_id');
            $table->foreign('dm_id')->references('id')->on('dm')->onDelete('cascade');

            $table->primary(['user_id', 'friend_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
