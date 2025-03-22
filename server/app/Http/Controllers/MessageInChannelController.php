<?php
namespace App\Http\Controllers;

use App\Events\Chat\Concrete\ChannelEvent;
use App\Repository\MessageInChannel\Concrete\MessageInChannelRepositorySql;
use App\Repository\MessageInChannel\MessageInChannelRepositoryContext;
use App\Repository\User\Concrete\UserRepositorySql;
use App\Repository\User\UserRepositoryContext;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MessageInChannelController extends Controller
{
    public function list_messages($channel_id)
    {

        try {
            $messageRepository = new MessageInChannelRepositorySql();

            $messageRepositoryContext = new MessageInChannelRepositoryContext
                ($messageRepository);

            $messages = $messageRepositoryContext->list_messages($channel_id);

            return response()->json(["data" => $messages, "message" => "Messages listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "failed to list messages", "status" => "error"]);
        }
    }

    public function send_message(Request $request)
    {
        $formatted_timestamp = Carbon::now()->format('Y-m-d H:i');

        try {
            $user_repository         = new UserRepositorySql();
            $user_repository_context = new UserRepositoryContext($user_repository);

            $icon_status = $user_repository_context->show_icon_status(auth()->id());

            // Websocketsを使ってメッセージを送信
            event(new ChannelEvent($request->message, auth()->id(), auth()->user()->name, $formatted_timestamp, $request->channel_id, $icon_status));

            $messageRepository = new MessageInChannelRepositorySql();

            $messageRepositoryContext = new MessageInChannelRepositoryContext($messageRepository);

            // DBにメッセージを保存
            $messageRepositoryContext->send_message($request->message, $request->channel_id);

            return response()->json(["message" => "Message sent successfully", "status" => "success"]);
        } catch (\Throwable $th) {

            return response()->json(["message" => "failed to send message", "status" => "error"]);
        }
    }

    public function edit_message(Request $request)
    {

        try {

            $messageRepository = new MessageInChannelRepositorySql();

            $messageRepositoryContext = new MessageInChannelRepositoryContext($messageRepository);

            $messageRepositoryContext->edit_message($request->message, $request->channel_id, $request->created_at);

            return response()->json(["message" => "Message edited successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to edit message", "status" => "error"]);
        }
    }

    public function delete_message(int $channel_id, string $created_at)
    {

        try {
            $messageRepository = new MessageInChannelRepositorySql();

            $messageRepositoryContext = new MessageInChannelRepositoryContext
                ($messageRepository);

            $messageRepositoryContext->delete_message($channel_id, $created_at);

            return response()->json(["message" => "Message deleted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to delete message", "status" => "error"]);
        }
    }
}
