<?php
namespace App\Repository\Friend;

interface FriendRepositoryInterface
{
    public function list_user_friends(): array;
    public function show_specific_friend(string $friend_id): array;
    public function list_received_friend_request(): array;
    public function list_send_friend_request(): array;
    public function send_friend_request(int $receiver_id): void;
    public function accept_friend_request(int $sender_id, string $dm_id): void;
    public function reject_friend_request(int $sender_id): void;
    public function cancel_friend_request(int $receiver_id): void;

}
