<?php
namespace App\Http\Controllers;

use App\Repository\Dm\Concrete\DmRepositorySql;
use App\Repository\Dm\DmRepositoryContext;
use Illuminate\Http\Request;

class DmController extends Controller
{
    public function list_dms()
    {
        try {

            $dm_repository = new DmRepositorySql();

            $dm_repository_context = new DmRepositoryContext($dm_repository);

            $dms = $dm_repository_context->list_dms();

            return response()->json(["data" => $dms, "message" => "DMs listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "failed to list dms", "status" => "error"]);
        }
    }

    public function create_dm(Request $request)
    {
        try {
            $dm_repository = new DmRepositorySql();

            $dm_repository_context = new DmRepositoryContext($dm_repository);

            $dm_repository_context->create_dm($request->dm_id);

            return response()->json(["message" => "DM created successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to create dm", "status" => "error"]);
        }
    }

    public function fetch_friend_info(string $dm_id)
    {
        try {
            $dm_repository = new DmRepositorySql();

            $dm_repository_context = new DmRepositoryContext($dm_repository);

            $friend_info = $dm_repository_context->fetch_friend_info($dm_id);

            return response()->json(["data" => $friend_info, "message" => "Friend info fetched successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to fetch friend info", "status" => "error"]);
        }
    }

}
