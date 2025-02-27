<?php
namespace App\Repository\MessageInChannel;

use App\Repository\MessageInChannel\MessageInChannelRepositoryInterface;

class MessageInChannelRepositoryContext implements MessageInChannelRepositoryInterface
{
    private $repository;

    public function __construct(MessageInChannelRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function list_messages($channel_id): array
    {
        return $this->repository->list_messages($channel_id);
    }

    public function send_message($message, $channel_id): void
    {
        $this->repository->send_message($message, $channel_id);
    }

    public function edit_message($message, $channel_id, $created_at): void
    {
        $this->repository->edit_message($message, $channel_id, $created_at);
    }

    public function delete_message($channel_id, $created_at): void
    {
        $this->repository->delete_message($channel_id, $created_at);
    }
}
