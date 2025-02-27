<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChannelController extends Controller
{

    //特定のサーバー内のチャンネルを取得
    public function list_channel_in_server(int $server_id)
    {
        try {
            $channels = DB::select('select id , name  from channels where server_id = ? order by created_at', [$server_id]);

            Log::debug($server_id);
            Log::debug($channels);

            return response()->json(['data' => $channels, 'message' => 'Channels fetched successfully']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get channels']);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create_channel(Request $request)
    {
        try {
            DB::insert('insert into channels (name, server_id ) values (? , ?)', [
                $request->name,
                $request->server_id,
            ]);
            return response()->json(['message' => 'Channel created successfully']);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(['message' => 'failed to create channel']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_channel(Request $request, int $id)
    {
        try {
            DB::select('update channels set name = ? where id = ?', [
                $request->name,
                $id,
            ]);
            return response()->json(['message' => 'Channel updated successfully']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to update channel']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete_channel(int $id)
    {
        try {
            DB::delete('delete from channels where id = ?', [$id]);
            return response()->json(['message' => 'Channel deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to delete channel']);
        }
    }

}
