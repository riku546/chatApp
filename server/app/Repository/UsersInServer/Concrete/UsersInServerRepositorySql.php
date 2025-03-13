<?php
namespace App\Repository\UsersInServer\Concrete;

use App\Repository\UsersInServer\UsersInServerRepositoryInterface;
use Illuminate\Support\Facades\DB;

class UsersInServerRepositorySql implements UsersInServerRepositoryInterface
{
    public function list_belongers_in_server(int $server_id): array
    {
        try {
            $belongers = DB::select('select u.name , u.id from users u inner join belonger_in_server bs on u.id = bs.user_id where bs.server_id = ?', [$server_id]);

            return $belongers;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function join_to_server(int $server_id): void
    {
        try {
            DB::insert('insert into belonger_in_server (user_id, server_id) values (?, ?)', [auth()->id(), $server_id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function leave_from_server(int $server_id): void
    {
        try {
            DB::delete('delete from belonger_in_server where user_id = ? and server_id = ?', [auth()->id(), $server_id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
