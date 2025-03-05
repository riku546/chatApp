<?php
namespace App\Http\Controllers;

use App\Events\Chat\Concrete\DmEvent;
use App\Repository\MessageInDm\Concrete\MessageInDmRepositorySql;
use App\Repository\MessageInDm\MessageInDmRepositoryContext;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MessageInDmController extends Controller
{
    public function show_message_specific_dm(string $dm_id)
    {
        try {
            $dm_repository = new MessageInDmRepositorySql();

            $dm_repository_context = new MessageInDmRepositoryContext($dm_repository);

            $messages = $dm_repository_context->show_specific_dm($dm_id);

            return response()->json(["data" => $messages, "message" => "DM show successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to show dm", "status" => "error"]);
        }
    }

    public function send_message(Request $request)
    {
        $formatted_timestamp = Carbon::now()->format('Y-m-d H:i');

        try {
            //websocketsを使ってメッセージを送信
            event(new DmEvent($request->message, auth()->id(), auth()->user()->name, $formatted_timestamp, $request->dm_id));

            //メッセージをDBに保存
            $dm_repository = new MessageInDmRepositorySql();

            $dm_repository_context = new MessageInDmRepositoryContext($dm_repository);

            $dm_repository_context->send_message($request->message, $request->dm_id, $formatted_timestamp);

            return response()->json(["message" => "DM sent successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to send dm", "status" => "error"]);
        }
    }

    public function edit_message(Request $request)
    {
        try {
            $dm_repository = new MessageInDmRepositorySql();

            $dm_repository_context = new MessageInDmRepositoryContext($dm_repository);

            $dm_repository_context->edit_message($request->dm_id, $request->created_at, $request->content);

            return response()->json(["message" => "Message edited successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to edit message", "status" => "error"]);
        }
    }

    public function delete_message($dm_id, $created_at)
    {
        try {
            $dm_repository = new MessageInDmRepositorySql();

            $dm_repository_context = new MessageInDmRepositoryContext($dm_repository);

            $dm_repository_context->delete_message($dm_id, $created_at);

            return response()->json(["message" => "Message deleted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to delete message", "status" => "error"]);
        }
    }
}
