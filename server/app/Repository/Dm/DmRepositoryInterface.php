<?php
namespace App\Repository\Dm;

interface DmRepositoryInterface
{
    public function list_dms();
    public function create_dm($dm_id);
    public function fetch_friend_info($dm_id);
}
