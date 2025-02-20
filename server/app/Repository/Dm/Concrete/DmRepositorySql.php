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

}
