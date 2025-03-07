<?php
namespace App\Repository\MessageInChannel\Concrete;

use App\Repository\MessageInChannel\MessageInChannelRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MessageInChannelRepositorySql implements MessageInChannelRepositoryInterface
{
    public function list_messages($channel_id): array
    {
        try {
            $messages = DB::select('select m.message as content, m.created_at, u.name , u.id as user_id from messages_in_channel as m inner join users as u on m.user_id = u.id  where channel_id = ? order by created_at', [$channel_id]);

            return $messages;
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function send_message($message, $channel_id): void
    {
        $formatted_timestamp = Carbon::now()->format('Y-m-d H:i');

        try {
            DB::insert('insert into messages_in_channel (message, user_id, channel_id, created_at, updated_at) values (?, ?, ?, ?, ?)', [$message, auth()->id(), $channel_id, $formatted_timestamp, $formatted_timestamp]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function edit_message($message, $channel_id, $created_at): void
    {
        $formatted_timestamp = Carbon::now()->format('Y-m-d H:i');

        try {
            DB::update('update messages_in_channel set message = ?, updated_at = ? where channel_id = ? and user_id = ? and created_at = ?', [$message, $formatted_timestamp, $channel_id, auth()->id(), $created_at]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_message($channel_id, $created_at): void
    {

        try {
            DB::delete('delete from messages_in_channel where channel_id = ? and user_id = ? and created_at = ?', [$channel_id, auth()->id(), $created_at]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
