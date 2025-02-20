<?php
namespace App\Repository\Dm;

interface DmRepositoryInterface
{
    public function list_dms();
    public function create_dm($dm_id);
}
