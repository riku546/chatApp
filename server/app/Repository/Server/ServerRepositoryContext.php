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

    public function list_users_servers()
    {
        return $this->serverRepository->list_users_servers();
    }

    public function create_server(string $server_name)
    {
        return $this->serverRepository->create_server($server_name);
    }

    public function show_detail_info(int $id)
    {
        return $this->serverRepository->show_detail_info($id);
    }

    public function update_server(string $server_name, int $id)
    {
        return $this->serverRepository->update_server($server_name, $id);
    }

    public function delete_server(int $id)
    {
        return $this->serverRepository->delete_server($id);
    }

    public function enable_icon(int $server_id)
    {
        $this->serverRepository->enable_icon($server_id);
    }
}
