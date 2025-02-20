<?php
namespace App\Http\Controllers;

use App\Events\Chat\Concrete\ChannelEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageInChannelController extends Controller
{
    public function list_messages($channel_id)
    {
        try {
            $messages = DB::select('select message , created_at user_id from messages_in_channel where channel_id = ?', [$channel_id]);

            return response()->json(["data" => $messages, "message" => "Messages listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to list messages", "status" => "error"]);
        }
    }

    public function send_message(Request $request)
    {
        $formattedTimestamp = Carbon::now()->format('Y-m-d H:i');

        try {

            //websocketsを使ってメッセージを送信
            event(new ChannelEvent($request->message, auth()->id(), auth()->user()->name, $formattedTimestamp, $request->channel_id));

            //DBにメッセージを保存
            DB::insert('insert into messages_in_channel (message, user_id, channel_id, created_at, updated_at) values (?, ?, ?, ?, ?)', [$request->message, auth()->id(), $request->channel_id, $formattedTimestamp, $formattedTimestamp]);

            return response()->json(["message" => "Message sent successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to send message", "status" => "error"]);
        }
    }

    public function edit_message(Request $request)
    {
        $formattedTimestamp = Carbon::now()->format('Y-m-d H:i');

        try {
            DB::update('update messages_in_channel set message = ?, updated_at = ? where channel_id = ? and user_id = ?  and created_at = ?', [$request->message, $formattedTimestamp, $request->channel_id, auth()->id(), $request->created_at]);

            return response()->json(["message" => "Message edited successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to edit message", "status" => "error"]);
        }
    }

    public function delete_message(int $channel_id, string $created_at)
    {
        try {
            DB::delete('delete from messages_in_channel where channel_id = ? and user_id = ? and created_at = ?', [$channel_id, auth()->id(), $created_at]);

            return response()->json(["message" => "Message deleted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to delete message", "status" => "error"]);
        }
    }
}
