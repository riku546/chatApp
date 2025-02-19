<?php
namespace App\Http\Controllers;

use App\Repository\Friend\Concrete\FriendRepositorySql;
use App\Repository\Friend\FriendRepositoryContext;
use Illuminate\Http\Request;

class FriendController extends Controller
{

    public function list_user_friends()
    {
        try {
            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friends = $friend_repository_context->list_user_friends(auth()->id());

            return response()->json(["data" => $friends, "message" => "Friends listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list user friends", "status" => "error"]);
        }
    }

    public function show_specific_friend(string $friend_id)
    {
        try {

            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend = $friend_repository_context->show_specific_friend(auth()->id(), $friend_id);

            return response()->json(["data" => $friend, "message" => "Friend show successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to show friend", "status" => "error"]);
        }
    }

    public function list_received_friend_request(Request $request)
    {
        try {
            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend_requests = $friend_repository_context->list_received_friend_request(auth()->id());

            return response()->json(["data" => $friend_requests, "message" => "Friend requests listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list friend requests", "status" => "error"]);
        }
    }

    public function list_send_friend_request(Request $request)
    {
        try {

            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend_requests = $friend_repository_context->list_send_friend_request(auth()->id());

            return response()->json(["data" => $friend_requests, "message" => "Friend requests listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list friend requests", "status" => "error"]);
        }
    }

    public function send_friend_request(Request $request)
    {
        try {

            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend_repository_context->send_friend_request($request->receiver_id);

            return response()->json(["message" => "Friend request sent successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to send friend request", "status" => "error"]);
        }
    }

    public function accept_friend_request(Request $request)
    {
        try {

            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend_repository_context->accept_friend_request($request->sender_id, $request->dm_id);

            return response()->json(["message" => "Friend request accepted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to accept friend request", "status" => "error"]);
        }
    }

    public function reject_friend_request(int $sender_id)
    {
        try {

            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend_repository_context->reject_friend_request($sender_id);

            return response()->json(["message" => "Friend request rejected successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to reject friend request", "status" => "error"]);
        }
    }

    public function cancel_friend_request(int $receiver_id)
    {
        try {

            $friend_repository = new FriendRepositorySql();

            $friend_repository_context = new FriendRepositoryContext($friend_repository);

            $friend_repository_context->cancel_friend_request($receiver_id);

            return response()->json(["message" => "Friend request deleted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to delete friend request", "status" => "error"]);
        }
    }
}
