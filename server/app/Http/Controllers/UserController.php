<?php
namespace App\Http\Controllers;

use App\Repository\User\Concrete\UserRepositorySql;
use App\Repository\User\UserRepositoryContext;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update_info(Request $request)
    {
        try {
            $user_repository         = new UserRepositorySql();
            $user_repository_context = new UserRepositoryContext($user_repository);

            $user_repository_context->update_info($request->name, $request->description, auth()->id());

            return response()->json(["message" => "User info updated successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to update user info", "status" => "error"]);
        }
    }

    public function enable_icon()
    {
        try {
            $user_repository         = new UserRepositorySql();
            $user_repository_context = new UserRepositoryContext($user_repository);

            $user_repository_context->enable_icon(auth()->id());

            return response()->json(["message" => "Icon enabled successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to enable icon", "status" => "error"]);
        }
    }

    public function show_specific_user_info(int $user_id)
    {
        try {
            $user_repository         = new UserRepositorySql();
            $user_repository_context = new UserRepositoryContext($user_repository);

            $user_info = $user_repository_context->show_specific_user_info($user_id);

            return response()->json(["data" => $user_info, "message" => "User info shown successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to show user info", "status" => "error"]);
        }
    }
}
