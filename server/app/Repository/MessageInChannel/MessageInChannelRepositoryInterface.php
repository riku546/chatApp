<?php
namespace App\Repository\MessageInChannel;

interface MessageInChannelRepositoryInterface
{
    public function list_messages($channel_id): array;
    public function send_message($message, $channel_id): void;
    public function edit_message($message, $channel_id, $created_at): void;
    public function delete_message($channel_id, $created_at): void;
}
