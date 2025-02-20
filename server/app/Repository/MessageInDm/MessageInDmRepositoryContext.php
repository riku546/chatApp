<?php
namespace App\Repository\MessageInDm;

use App\Repository\MessageInDm\MessageInDmRepositoryInterface;

class MessageInDmRepositoryContext implements MessageInDmRepositoryInterface
{
    private $messageInDmRepository;

    public function __construct(MessageInDmRepositoryInterface $messageInDmRepository)
    {
        $this->messageInDmRepository = $messageInDmRepository;
    }

    public function show_specific_dm(string $dm_id): array
    {
        return $this->messageInDmRepository->show_specific_dm($dm_id);
    }

    public function send_message(string $content, string $dm_id, string $formattedTimestamp): void
    {
        $this->messageInDmRepository->send_message($content, $dm_id, $formattedTimestamp);
    }

    public function edit_message(string $dm_id, string $created_at, string $content): void
    {
        $this->messageInDmRepository->edit_message($dm_id, $created_at, $content);
    }

    public function delete_message(string $dm_id, string $created_at): void
    {
        $this->messageInDmRepository->delete_message($dm_id, $created_at);
    }
}
