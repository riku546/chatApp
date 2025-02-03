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

        //既存のテーブルのprimary keyを変更するのがうまくいかなかったため、一度テーブルを削除して再作成する
        Schema::dropIfExists('belonger_in_server');

        Schema::create('belonger_in_server', function (Blueprint $table) {

            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('server_id');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');

            $table->primary(['user_id', 'server_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('belonger_in_server', function (Blueprint $table) {
            //
        });
    }
};
