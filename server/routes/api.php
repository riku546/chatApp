<?php

use App\Http\Controllers\DmController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\ServerController;
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
    Route::get('/all-servers', [ServerController::class, 'index']);
    Route::get('/user-servers', [ServerController::class, 'list_user_server']);
    Route::post('/server/create', [ServerController::class, 'store']);
    Route::get('/server/{id}', [ServerController::class, 'show']);
    Route::put('/server/update/{id}', [ServerController::class, 'update']);
    Route::delete('/server/delete/{id}', [ServerController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dm-list', [DmController::class, 'list_dms']);
    Route::get('/dm/{dm_id}', [DmController::class, 'show_specific_dm']);
    Route::post('/dm/create', [DmController::class, 'create_dm']);
    Route::post('/dm/message/send', [DmController::class, 'send_message']);
    Route::put('/dm/message/edit', [DmController::class, 'edit_message']);
    Route::delete('/dm/message/delete', [DmController::class, 'delete_message']);
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
