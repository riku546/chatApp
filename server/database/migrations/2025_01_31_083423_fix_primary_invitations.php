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

        Schema::dropIfExists('invitations');

        Schema::create('invitations', function (Blueprint $table) {

            $table->timestamps();

            $table->unsignedBigInteger('invited_user_id');
            $table->foreign('invited_user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('server_id');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');

            $table->primary(['invited_user_id', 'server_id']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            //
        });
    }
};
