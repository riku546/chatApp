<?php
namespace App\Repository\Server\Concrete;

use App\Repository\Server\ServerRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ServerRepositorySql implements ServerRepositoryInterface
{

    public function list_all_servers()
    {
        try {
            $server_list = DB::select('select * from servers');

            return $server_list;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function list_user_servers()
    {
        try {
            $server_list = DB::select('select s.id , s.name from servers as s inner join belonger_in_server as bs on s.id = bs.server_id where bs.user_id = ?', [auth()->id()]);

            return $server_list;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function create_server(string $server_name, string $server_type)
    {
        try {
            DB::select('insert into servers (name, type) values (?, ?)', [$server_name, $server_type]);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show_detail_info(int $id)
    {
        try {
            $server_data = DB::select('select * from servers where id = ?', [$id]);

            return $server_data;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update_server(string $server_name, string $server_type, int $id)
    {
        try {
            DB::select('update servers set name = ?, type = ? where id = ?', [$server_name, $server_type, $id]);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_server(int $id)
    {
        try {
            DB::select('delete from servers where id = ?', [$id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
