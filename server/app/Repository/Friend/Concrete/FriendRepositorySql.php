<?php
namespace App\Repository\Friend\Concrete;

use App\Repository\Friend\FriendRepositoryInterface;
use Illuminate\Support\Facades\DB;

class FriendRepositorySql implements FriendRepositoryInterface
{
    public function list_user_friends()
    {
        try {
            $friends = DB::select('select u.id , u.name from users as u inner join friends as f on u.id = f.friend_id where f.user_id = ?', [auth()->id()]);
            return $friends;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show_specific_friend(string $friend_id)
    {
        try {
            $friend = DB::select('select u.id , u.name from users as u inner join friends as f on u.id = f.friend_id where f.user_id  = ? and f.friend_id  ', [auth()->id(), $friend_id]);
            return $friend;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function list_received_friend_request()
    {
        try {
            $friend_requests = DB::select('select u.id , u.name , f.created_at from users as u inner join friend_requests as f on u.id = f.sender_id where f.receiver_id = ?', [auth()->id()]);
            return $friend_requests;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function list_send_friend_request()
    {
        try {
            $friend_requests = DB::select('select u.id ,  u.name , f.created_at from users as u inner join friend_requests as f on u.id = f.receiver_id where f.sender_id = ?', [auth()->id()]);
            return $friend_requests;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function send_friend_request(int $receiver_id)
    {
        try {
            DB::select('insert into friend_requests (sender_id, receiver_id) values (?, ?)', [auth()->id(), $receiver_id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function accept_friend_request(int $sender_id, string $dm_id)
    {
        try {
            //フレンドを作成
            DB::select('insert into friends (user_id, friend_id , dm_id) values (?, ? , ?)', [auth()->id(), $sender_id, $dm_id]);
            DB::select('insert into friends (user_id, friend_id , dm_id) values (?, ? , ?)', [$sender_id, auth()->id(), $dm_id]);

            //フレンドリクエストを削除
            DB::select('delete from friend_requests where sender_id = ? and receiver_id = ?', [$sender_id, auth()->id()]);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    //送られてきたフレンドリクエストを拒否する
    public function reject_friend_request(int $sender_id)
    {
        try {

            DB::select('delete from friend_requests where sender_id = ? and receiver_id = ?', [$sender_id, auth()->id()]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    //送ったフレンドリクエストを削除する
    public function cancel_friend_request(int $receiver_id)
    {
        try {
            DB::select('delete from friend_requests where sender_id = ? and receiver_id = ?', [auth()->id(), $receiver_id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

}
