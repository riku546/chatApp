<?php
namespace App\Repository\Dm;

use App\Repository\Dm\DmRepositoryInterface;

class DmRepositoryContext implements DmRepositoryInterface
{
    private $dm_repository_instance;

    public function __construct(DmRepositoryInterface $dm_repository_instance)
    {
        $this->dm_repository_instance = $dm_repository_instance;
    }

    public function list_dms()
    {
        return $this->dm_repository_instance->list_dms();
    }

    public function show_specific_dm(string $dm_id)
    {
        return $this->dm_repository_instance->show_specific_dm($dm_id);
    }

    public function send_message($content, $dm_id, $formattedTimestamp)
    {
        $this->dm_repository_instance->send_message($content, $dm_id, $formattedTimestamp);
    }

    public function create_dm($dm_id)
    {
        $this->dm_repository_instance->create_dm($dm_id);
    }

    public function edit_message($dm_id, $created_at, $content)
    {
        $this->dm_repository_instance->edit_message($dm_id, $created_at, $content);
    }

    public function delete_message($dm_id, $created_at)
    {
        $this->dm_repository_instance->delete_message($dm_id, $created_at);
    }
}
