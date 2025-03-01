<?php
namespace App\Repository\Channel\Concrete;

use App\Repository\Channel\ChannelRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ChannelRepositorySql implements ChannelRepositoryInterface
{

    public function list_channel_in_server(int $server_id)
    {
        try {
            return DB::select('select id, name from channels where server_id = ?', [$server_id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function create_channel(string $name, int $server_id)
    {
        try {
            DB::insert('insert into channels (name, server_id) values (?, ?)', [
                $name,
                $server_id,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update_channel(string $name, int $id)
    {
        try {
            DB::select('update channels set name = ? where id = ?', [$name, $id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_channel(int $id)
    {
        try {
            DB::delete('delete from channels where id = ?', [$id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
