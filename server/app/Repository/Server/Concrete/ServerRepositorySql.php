<?php
namespace App\Repository\Server\Concrete;

use App\Repository\Server\ServerRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ServerRepositorySql implements ServerRepositoryInterface
{

    public function list_all_servers()
    {
        try {
            $server_list = DB::select('select s.id ,s.name, (select count(*) from belonger_in_server as bs where server_id = s.id) as num_of_people from servers as s');

            return $server_list;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function list_users_servers()
    {
        try {
            $server_list = DB::select('select s.id as server_id , s.name as server_name ,  (select min(c.id) from channels c where c.server_id = s.id) as channel_id from servers as s inner join belonger_in_server as bs on s.id = bs.server_id  where bs.user_id = ?', [auth()->id()]);

            return $server_list;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function create_server(string $server_name)
    {
        try {
            DB::select('insert into servers (name) values (?)', [$server_name]);
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

    public function update_server(string $server_name, int $id)
    {
        try {
            DB::select('update servers set name = ? where id = ?', [$server_name, $id]);

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
