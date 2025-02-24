<?php
namespace App\Repository\UsersInServer;

interface UsersInServerRepositoryInterface
{
    public function list_belongers_in_server(int $server_id): array;
    public function join_to_server(int $server_id): void;
    public function leave_from_server(int $server_id): void;
}
