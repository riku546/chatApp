<?php
namespace App\Http\Controllers;

use App\Repository\UsersInServer\Concrete\UsersInServerRepositorySql;
use App\Repository\UsersInServer\UsersInServerRepositoryContext;
use Illuminate\Http\Request;

class UsersInServerController extends Controller
{
    public function list_belongers_in_server(Request $request)
    {

        try {
            $users_in_server_repository = new UsersInServerRepositorySql();

            $users_in_server_repository_context = new UsersInServerRepositoryContext($users_in_server_repository);

            $belongers = $users_in_server_repository_context->list_belongers_in_server($request->server_id);

            return response()->json(["data" => $belongers, "message" => "Belongers listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to list belongers', "status" => "error"]);
        }
    }

    public function join_to_server(Request $request)
    {

        try {
            $users_in_server_repository = new UsersInServerRepositorySql();

            $users_in_server_repository_context = new UsersInServerRepositoryContext($users_in_server_repository);

            $users_in_server_repository_context->join_to_server($request->server_id);

            return response()->json(['message' => 'Joined to server successfully', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to join server', "status" => "error"]);
        }
    }

    public function leave_from_server(Request $request)
    {

        try {
            $users_in_server_repository = new UsersInServerRepositorySql();

            $users_in_server_repository_context = new UsersInServerRepositoryContext($users_in_server_repository);

            $users_in_server_repository_context->leave_from_server($request->server_id);

            return response()->json(['message' => 'Left from server successfully', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to leave server', "status" => "error"]);
        }
    }
}
