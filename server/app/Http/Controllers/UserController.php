<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function update_info(Request $request)
    {
        try {
            DB::select('update users set name = ? , description = ? where id = ?', [$request->name, $request->description, auth()->id()]);

            return response()->json(["message" => "User info updated successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "failed to update user info", "status" => "error"]);
        }
    }
}
