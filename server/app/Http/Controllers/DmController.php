<?php
namespace App\Http\Controllers;

use App\Events\Chat\Concrete\DmEvent;
use App\Repository\Dm\Concrete\DmRepositorySql;
use App\Repository\Dm\DmRepositoryContext;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DmController extends Controller
{
    public function list_dms()
    {
        try {
            //使用する具象クラスをインスタンス化
            $dm_repository = new DmRepositorySql();

            $dm_repository_context = new DmRepositoryContext($dm_repository);
            $dms                   = $dm_repository_context->list_dms();

            return response()->json(["data" => $dms, "message" => "DMs listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "failed to list dms", "status" => "error"]);
        }
    }

    public function show_message_specific_dm(string $dm_id)
    {
        try {
            $dm_repository = new DmRepositorySql();
            $messages      = $dm_repository->show_specific_dm($dm_id);

            return response()->json(["data" => $messages, "message" => "DM show successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to show dm", "status" => "error"]);
        }
    }

    public function send_message(Request $request)
    {
        $formattedTimestamp = Carbon::now()->format('Y-m-d H:i');

        try {
            //websocketsを使ってメッセージを送信
            event(new DmEvent($request->content, auth()->id(), auth()->user()->name, $formattedTimestamp, $request->dm_id));

            //メッセージをDBに保存
            $dm_repository = new DmRepositorySql();
            $dm_repository->send_message($request->content, $request->dm_id, $formattedTimestamp);

            return response()->json(["message" => "DM sent successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to send dm", "status" => "error"]);
        }
    }

    public function create_dm(Request $request)
    {
        try {
            $dm_repository = new DmRepositorySql();
            $dm_repository->create_dm($request->dm_id);

            return response()->json(["message" => "DM created successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to create dm", "status" => "error"]);
        }
    }

    public function edit_message(Request $request)
    {
        try {
            $dm_repository = new DmRepositorySql();
            $dm_repository->edit_message($request->dm_id, $request->created_at, $request->content);

            return response()->json(["message" => "Message edited successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to edit message", "status" => "error"]);
        }
    }

    public function delete_message($dm_id, $created_at)
    {
        try {
            $dm_repository = new DmRepositorySql();
            $dm_repository->delete_message($dm_id, $created_at);

            return response()->json(["message" => "Message deleted successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to delete message", "status" => "error"]);
        }
    }

}
