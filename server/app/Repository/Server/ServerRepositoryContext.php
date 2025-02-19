<?php
namespace App\Repository\Server;

use App\Repository\Server\ServerRepositoryInterface;

class ServerRepositoryContext implements ServerRepositoryInterface
{
    private $serverRepository;

    public function __construct(ServerRepositoryInterface $serverRepository)
    {
        $this->serverRepository = $serverRepository;
    }

    public function list_all_servers()
    {
        return $this->serverRepository->list_all_servers();
    }

    public function list_user_servers()
    {
        return $this->serverRepository->list_user_servers();
    }

    public function create_server(string $server_name, string $server_type)
    {
        return $this->serverRepository->create_server($server_name, $server_type);
    }

    public function show_detail_info(int $id)
    {
        return $this->serverRepository->show_detail_info($id);
    }

    public function update_server(string $server_name, string $server_type, int $id)
    {
        return $this->serverRepository->update_server($server_name, $server_type, $id);
    }

    public function delete_server(int $id)
    {
        return $this->serverRepository->delete_server($id);
    }
}
