<?php
namespace App\Http\Controllers;

use App\Repository\Server\Concrete\ServerRepositorySql;
use App\Repository\Server\ServerRepositoryContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServerController extends Controller
{

    public function list_all_servers()
    {
        try {
            $server_repository = new ServerRepositorySql();

            $server_repository_context = new ServerRepositoryContext($server_repository);

            $server_list = $server_repository_context->list_all_servers();

            return response()->json(["data" => $server_list, "message" => "all server listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get server list', "status" => "error"]);
        }
    }

    public function list_users_servers()
    {
        try {
            $server_repository = new ServerRepositorySql();

            $server_repository_context = new ServerRepositoryContext($server_repository);

            $server_list = $server_repository_context->list_users_servers();

            return response()->json(["data" => $server_list, "message" => "server listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get server list', "status" => "error"]);
        }
    }

    public function create_server(Request $request)
    {
        try {
            $server_repository = new ServerRepositorySql();

            $server_repository_context = new ServerRepositoryContext($server_repository);

            $server_repository_context->create_server($request->name);

            //新しく作成したサーバーのidを返しているのは、サーバー作成後にサーバーへの参加とサーバにチャンネルを作成するために
            //serversテーブルのidはint型のauto incrementなのでmax(id)で最新のidを取得している
            $new_server_id = DB::select('select max(id) as new_server_id from servers');

            return response()->json(['data' => $new_server_id, 'message' => 'server created', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to create server', "status" => "error"]);
        }
    }

    public function show_detail_info(int $id)
    {
        try {
            $server_repository = new ServerRepositorySql();

            $server_repository_context = new ServerRepositoryContext($server_repository);

            $server_data = $server_repository_context->show_detail_info($id);

            return response()->json(["data" => $server_data, "message" => "server detail data show successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get server data', "status" => "error"]);
        }
    }

    public function update_server(Request $request)
    {
        try {
            $server_repository = new ServerRepositorySql();

            $server_repository_context = new ServerRepositoryContext($server_repository);

            $server_repository_context->update_server($request->name, $request->id);

            return response()->json(['message' => 'server updated', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to update server', "status" => "error"]);
        }
    }

    public function delete_server(int $id)
    {
        try {
            $server_repository = new ServerRepositorySql();

            $server_repository_context = new ServerRepositoryContext($server_repository);

            $server_repository_context->delete_server($id);

            return response()->json(['message' => 'server deleted', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to delete server', "status" => "error"]);
        }
    }

}
