<?php
namespace App\Repository\Channel;

use App\Repository\Channel\ChannelRepositoryInterface;

class ChannelRepositoryContext implements ChannelRepositoryInterface
{
    private $repository;

    public function __construct(ChannelRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function list_channel_in_server(int $server_id)
    {
        return $this->repository->list_channel_in_server($server_id);
    }

    public function create_channel(string $name, int $server_id)
    {
        return $this->repository->create_channel($name, $server_id);
    }

    public function update_channel(string $name, int $id)
    {
        $this->repository->update_channel($name, $id);
    }

    public function delete_channel(int $id)
    {
        $this->repository->delete_channel($id);
    }
}
