<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    //このテーブルはfriendsテーブルとmessage_in_dmテーブルの中間テーブルです。
    //このテーブルはDM自体を定義するものです。
    //uuidを主キーなのは、ユーザーがフレンドを追加した際にフロントエンド側でuuidを用いてdmを作成するためです。
    public function up(): void
    {
        Schema::create('dm', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
