<?php
namespace App\Repository\Dm\Concrete;

use App\Repository\Dm\DmRepositoryInterface;
use Illuminate\Support\Facades\DB;

class DmRepositorySql implements DmRepositoryInterface
{
    public function list_dms()
    {
        try {
            $dms = DB::select('select u.name , f.dm_id  from friends as f inner join users as u on f.friend_id = u.id  where f.user_id = ?', [auth()->id()]);

            return $dms;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function create_dm($dm_id)
    {
        try {
            DB::select('insert into dm (id) values (?)', [$dm_id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function fetch_friend_info($dm_id)
    {
        try {
            $friend_info = DB::select('select u.id , u.name , u.description from users as u inner join friends as f on u.id = f.friend_id where f.dm_id = ? and f.user_id = ?', [$dm_id, auth()->id()]);

            return $friend_info;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

}
