<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $server_list = DB::select('select * from servers');
            return response()->json(["data" => $server_list, "message" => "all server listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get server list', "status" => "error"]);
        }
    }

    public function list_user_server()
    {
        try {
            $server_list = DB::select('select s.id , s.name from servers as s inner join belonger_in_server as bs on s.id = bs.server_id where bs.user_id = ?', [auth()->id()]);
            return response()->json(["data" => $server_list, "message" => "server listed successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get server list', "status" => "error"]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::select('insert into servers (name, type) values (?, ?)', [$request->name, $request->type]);
            return response()->json(['message' => 'server created', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to create server', "status" => "error"]);
        }
    }

    /**
     * Display the specified resource.
     */

    public function show(int $id)
    {
        try {
            $server_data = DB::select('select * from servers where id = ?', [$id]);
            return response()->json(["data" => $server_data, "message" => "server detail data show successfully", "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get server data', "status" => "error"]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        try {
            DB::select('update servers set name = ?, type = ? where id = ?', [$request->name, $request->type, $id]);
            return response()->json(['message' => 'server updated', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to update server', "status" => "error"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            DB::select('delete from servers where id = ?', [$id]);
            return response()->json(['message' => 'server deleted', "status" => "success"]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to delete server', "status" => "error"]);
        }
    }
}
