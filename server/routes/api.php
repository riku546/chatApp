<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\DmController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MessageInChannelController;
use App\Http\Controllers\MessageInDmController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UsersInServerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function () {
    return response()->json(auth()->user());
});

Route::get('/checkLogin', function () {
    return response()->json(auth()->id() ? true : false);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/all-servers', [ServerController::class, 'list_all_servers']);
    Route::get('/users-servers', [ServerController::class, 'list_users_servers']);
    Route::post('/server/create', [ServerController::class, 'create_server']);
    Route::get('/server/{id}', [ServerController::class, 'show_detail_info']);
    Route::put('/server/update/{id}', [ServerController::class, 'update_server']);
    Route::delete('/server/delete/{id}', [ServerController::class, 'delete_server']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/server/{server_id}/belongers', [UsersInServerController::class, 'list_belongers_in_server']);
    Route::post('/server/join', [UsersInServerController::class, 'join_to_server']);
    Route::post('/server/leave', [UsersInServerController::class, 'leave_from_server']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dm-list', [DmController::class, 'list_dms']);
    Route::post('/dm/create', [DmController::class, 'create_dm']);
});

//Dm内でのメッセージの表示、送信、編集、削除
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dm/{dm_id}/message/', [MessageInDmController::class, 'show_message_specific_dm']);
    Route::post('/dm/message/send', [MessageInDmController::class, 'send_message']);
    Route::put('/dm/message/edit', [MessageInDmController::class, 'edit_message']);
    Route::delete('/dm/message/delete', [MessageInDmController::class, 'delete_message']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/all-friends', [FriendController::class, 'list_user_friends']);
    Route::get('/friend/{friend_id}', [FriendController::class, 'show_specific_friend']);
    Route::get('/friend-request/list/receive', [FriendController::class, 'list_received_friend_request']);
    Route::get('/friend-request/list/send', [FriendController::class, 'list_send_friend_request']);
    Route::post('/friend-request/send', [FriendController::class, 'send_friend_request']);
    Route::post('/friend-request/accept', [FriendController::class, 'accept_friend_request']);

    //送られてきたフレンドリクエストを拒否する
    Route::delete('/friend-request/reject/{sender_id}', [FriendController::class, 'reject_friend_request']);
    //送ったフレンドリクエストをキャンセルする
    Route::delete('/friend-request/cancel/{receiver_id}', [FriendController::class, 'cancel_friend_request']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/server/{server_id}/channels', [ChannelController::class, 'list_channel_in_server']);
    Route::post('/channel/create', [ChannelController::class, 'create_channel']);
    Route::put('/channel/update/{id}', [ChannelController::class, 'update_channel']);
    Route::delete('/channel/delete/{id}', [ChannelController::class, 'delete_channel']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/channel/{channel_id}/messages', [MessageInChannelController::class, 'list_messages']);
    Route::post('/channel/message/send', [MessageInChannelController::class, 'send_message']);
    Route::put('/channel/message/edit', [MessageInChannelController::class, 'edit_message']);
    Route::delete('/channel/message/{channel_id}/delete/{created_at}', [MessageInChannelController::class, 'delete_message']);
});
