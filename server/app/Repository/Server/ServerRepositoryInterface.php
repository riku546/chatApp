<?php
namespace App\Repository\Server;

interface ServerRepositoryInterface
{
    public function list_all_servers();
    public function list_users_servers();
    public function create_server(string $server_name);
    public function show_detail_info(int $id);
    public function update_server(string $server_name, int $id);
    public function delete_server(int $id);
    public function enable_icon(int $server_id);
}
