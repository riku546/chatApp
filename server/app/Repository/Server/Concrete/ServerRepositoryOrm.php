<?php
namespace App\Repository\Server\Concrete;

use App\Models\Servers;
use App\Repository\Server\ServerRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ServerRepositoryOrm implements ServerRepositoryInterface
{
    public function list_all_servers()
    {
        try {
            $server_list = Servers::all();

            return $server_list;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function list_users_servers()
    {
        try {
            $server_list = DB::table('servers as s')
                ->join('belonger_in_server as bs', 's.id', '=', 'bs.server_id')
                ->where('bs.user_id', auth()->id())
                ->select('s.id', 's.name')
                ->get();

            return $server_list;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function create_server(string $server_name)
    {
        try {
            $new_server = Servers::create(['name' => $server_name]);
            return $new_server;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show_detail_info(int $id)
    {
        try {
            $server_data = Servers::find($id);

            return $server_data;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update_server(string $server_name, int $id)
    {
        try {
            $server = Servers::find($id);
            if ($server) {
                $server->name = $server_name;
                $server->save();
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_server(int $id)
    {
        try {
            Servers::destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
