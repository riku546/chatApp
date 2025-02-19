<?php
namespace App\Repository\Friend;

interface FriendRepositoryInterface
{
    public function list_user_friends();
    public function show_specific_friend(string $friend_id);
    public function list_received_friend_request();
    public function list_send_friend_request();
    public function send_friend_request(int $receiver_id);
    public function accept_friend_request(int $sender_id, string $dm_id);
    public function reject_friend_request(int $sender_id);
    public function cancel_friend_request(int $receiver_id);

}
