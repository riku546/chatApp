<?php
namespace App\Repository\Dm;

interface DmRepositoryInterface
{
    public function list_dms();
    public function show_specific_dm(string $dm_id);
    public function send_message($content, $dm_id, $formattedTimestamp);
    public function create_dm($dm_id);
    public function edit_message($dm_id, $created_at, $content);
    public function delete_message($dm_id, $created_at);
}
