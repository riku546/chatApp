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

    public function show_specific_dm(string $dm_id)
    {
        try {
            $messages = DB::select('select u.name , u.id , m.content , m.created_at , m.updated_at  from messages_in_dm as m inner join users as u on m.user_id = u.id where m.dm_id = ? order by m.created_at', [$dm_id]);

            return $messages;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function send_message($content, $dm_id, $formattedTimestamp)
    {

        try {
            //メッセージをDBに保存
            DB::select('insert into messages_in_dm (content , created_at , updated_at , dm_id , user_id) values (?, ? , ?, ?, ?)', [$content, $formattedTimestamp, $formattedTimestamp, $dm_id, auth()->id()]);

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

    public function edit_message($dm_id, $created_at, $content)
    {
        try {
            DB::select('update messages_in_dm set content = ? where dm_id = ? and created_at = ?', [$content, $dm_id, $created_at]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_message($dm_id, $created_at)
    {
        try {
            DB::select('delete from messages_in_dm where dm_id = ? and created_at = ?', [$dm_id, $created_at]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
