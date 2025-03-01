<?php
namespace App\Repository\Channel;

interface ChannelRepositoryInterface
{
    public function list_channel_in_server(int $server_id);
    public function create_channel(string $name, int $server_id);
    public function update_channel(string $name, int $id);
    public function delete_channel(int $id);
}
