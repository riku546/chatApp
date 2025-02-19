<?php
namespace App\Repository\Friend;

use App\Repository\Friend\FriendRepositoryInterface;

class FriendRepositoryContext implements FriendRepositoryInterface
{
    private $friendRepository;

    public function __construct(FriendRepositoryInterface $friendRepository)
    {
        $this->friendRepository = $friendRepository;
    }

    public function list_user_friends()
    {
        return $this->friendRepository->list_user_friends();
    }

    public function show_specific_friend(string $friend_id)
    {
        return $this->friendRepository->show_specific_friend($friend_id);
    }

    public function list_received_friend_request()
    {
        return $this->friendRepository->list_received_friend_request();
    }

    public function list_send_friend_request()
    {
        return $this->friendRepository->list_send_friend_request();
    }

    public function send_friend_request(int $receiver_id)
    {
        return $this->friendRepository->send_friend_request($receiver_id);
    }

    public function accept_friend_request(int $sender_id, string $dm_id)
    {
        return $this->friendRepository->accept_friend_request($sender_id, $dm_id);
    }

    public function reject_friend_request(int $sender_id)
    {
        return $this->friendRepository->reject_friend_request($sender_id);
    }

    public function cancel_friend_request(int $receiver_id)
    {
        return $this->friendRepository->cancel_friend_request($receiver_id);
    }
}
