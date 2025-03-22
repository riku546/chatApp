<?php
namespace App\Repository\MessageInDm\Concrete;

use App\Repository\MessageInDm\MessageInDmRepositoryInterface;
use Illuminate\Support\Facades\DB;

class MessageInDmRepositorySql implements MessageInDmRepositoryInterface
{

    public function show_specific_dm(string $dm_id): array
    {
        try {
            $messages = DB::select('select u.name as user_name , u.id as user_id , u.set_icon , m.content , m.created_at , m.updated_at  from messages_in_dm as m inner join users as u on m.user_id = u.id where m.dm_id = ? order by m.created_at', [$dm_id]);

            return $messages;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function send_message(string $content, string $dm_id, string $formattedTimestamp): void
    {

        try {
            //メッセージをDBに保存
            DB::select('insert into messages_in_dm (content , created_at , updated_at , dm_id , user_id) values (?, ? , ?, ?, ?)', [$content, $formattedTimestamp, $formattedTimestamp, $dm_id, auth()->id()]);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function edit_message(string $dm_id, string $created_at, string $content): void
    {
        try {
            DB::select('update messages_in_dm set content = ? where dm_id = ? and created_at = ?', [$content, $dm_id, $created_at]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_message(string $dm_id, string $created_at): void
    {
        try {
            DB::select('delete from messages_in_dm where dm_id = ? and created_at = ?', [$dm_id, $created_at]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
