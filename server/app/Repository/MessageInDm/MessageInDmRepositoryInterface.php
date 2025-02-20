<?php
namespace App\Repository\MessageInDm;

interface MessageInDmRepositoryInterface
{
    public function show_specific_dm(string $dm_id): array;
    public function send_message(string $content, string $dm_id, string $formattedTimestamp): void;
    public function edit_message(string $dm_id, string $created_at, string $content): void;
    public function delete_message(string $dm_id, string $created_at): void;
}
