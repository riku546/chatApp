<?php
namespace App\Repository\UsersInServer;

use App\Repository\UsersInServer\UsersInServerRepositoryInterface;

class UsersInServerRepositoryContext implements UsersInServerRepositoryInterface
{
    private $repository;

    public function __construct(UsersInServerRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function list_belongers_in_server(int $server_id):array
    {
        return $this->repository->list_belongers_in_server($server_id);
    }

    public function join_to_server(int $server_id):void
    {
        return $this->repository->join_to_server($server_id);
    }

    public function leave_from_server( $server_id):void
    {
        return $this->repository->leave_from_server($server_id);
    }
}
