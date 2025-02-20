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

    public function create_dm($dm_id)
    {
        $this->dm_repository_instance->create_dm($dm_id);
    }

}
