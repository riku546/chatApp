<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    public function list_user_friends()
    {
        try {
            $friends = DB::select('select u.id , u.name from users as u inner join friends as f on u.id = f.friend_id where f.user_id = ?', [auth()->id()]);
            return response()->json(["data" => $friends, "message" => "Friends listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list user friends", "status" => "error"]);
        }
    }

    public function show_specific_friend(string $friend_id)
    {
        try {
            $friend = DB::select('select u.id , u.name from users as u inner join friends as f on u.id = f.friend_id where f.user_id  = ? and f.friend_id  ', [auth()->id(), $friend_id]);
            return response()->json(["data" => $friend, "message" => "Friend show successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to show friend", "status" => "error"]);
        }
    }

    public function list_received_friend_request(Request $request)
    {
        try {
            $friend_requests = DB::select('select u.id , u.name , f.created_at from users as u inner join friend_requests as f on u.id = f.sender_id where f.receiver_id = ?', [auth()->id()]);
            return response()->json(["data" => $friend_requests, "message" => "Friend requests listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list friend requests", "status" => "error"]);
        }
    }

    public function list_send_friend_request(Request $request)
    {
        try {
            $friend_requests = DB::select('select u.id ,  u.name , f.created_at from users as u inner join friend_requests as f on u.id = f.receiver_id where f.sender_id = ?', [auth()->id()]);
            return response()->json(["data" => $friend_requests, "message" => "Friend requests listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list friend requests", "status" => "error"]);
        }
    }

    public function send_friend_request(Request $request)
    {
        try {
            DB::select('insert into friend_requests (sender_id, receiver_id) values (?, ?)', [auth()->id(), $request->receiver_id]);
            return response()->json(["message" => "Friend request sent successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to send friend request", "status" => "error"]);
        }
    }

    public function accept_friend_request(Request $request)
    {
        try {
            //フレンドを作成
            DB::select('insert into friends (user_id, friend_id , dm_id) values (?, ? , ?)', [auth()->id(), $request->sender_id, $request->dm_id]);
            DB::select('insert into friends (user_id, friend_id , dm_id) values (?, ? , ?)', [$request->sender_id, auth()->id(), $request->dm_id]);

            //フレンドリクエストを削除
            DB::select('delete from friend_requests where sender_id = ? and receiver_id = ?', [$request->sender_id, auth()->id()]);

            return response()->json(["message" => "Friend request accepted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "failed to accept friend request", "status" => "error"]);
        }
    }

    //送られてきたフレンドリクエストを拒否する
    public function reject_friend_request(int $sender_id)
    {
        try {

            DB::select('delete from friend_requests where sender_id = ? and receiver_id = ?', [$sender_id, auth()->id()]);
            return response()->json(["message" => "Friend request rejected successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "failed to reject friend request", "status" => "error"]);
        }
    }

    //送ったフレンドリクエストを削除する
    public function cancel_friend_request(int $receiver_id)
    {
        try {

            DB::select('delete from friend_requests where sender_id = ? and receiver_id = ?', [auth()->id(), $receiver_id]);
            return response()->json(["message" => "Friend request deleted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "failed to delete friend request", "status" => "error"]);
        }
    }

}
