<?php
namespace App\Http\Controllers;

use App\Repository\Channel\ChannelRepositoryContext;
use App\Repository\Channel\Concrete\ChannelRepositoryOrm;
use App\Repository\Channel\Concrete\ChannelRepositorySql;
use Illuminate\Http\Request;

class ChannelController extends Controller
{

    public function list_channel_in_server(int $server_id)
    {
        try {
            $channel_repository         = new ChannelRepositorySql();
            $channel_repository_context = new ChannelRepositoryContext($channel_repository);

            $channels = $channel_repository_context->list_channel_in_server($server_id);

            return response()->json(['data' => $channels, 'message' => 'Channels fetched successfully', 'status' => 'success']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to get channels', 'status' => 'error']);
        }
    }

    public function create_channel(Request $request)
    {
        try {
            $channel_repository         = new ChannelRepositoryOrm();
            $channel_repository_context = new ChannelRepositoryContext($channel_repository);

            $new_channel = $channel_repository_context->create_channel($request->name, $request->server_id);

            return response()->json(['data' => $new_channel, 'message' => 'Channel created successfully', 'status' => 'success']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to create channel', 'status' => 'error']);
        }
    }

    public function update_channel(Request $request, int $id)
    {
        try {
            $channel_repository         = new ChannelRepositorySql();
            $channel_repository_context = new ChannelRepositoryContext($channel_repository);

            $channel_repository_context->update_channel($request->name, $id);

            return response()->json(['message' => 'Channel updated successfully', 'status' => 'success']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to update channel', 'status' => 'error']);
        }
    }

    public function delete_channel(int $id)
    {
        try {
            $channel_repository         = new ChannelRepositorySql();
            $channel_repository_context = new ChannelRepositoryContext($channel_repository);

            $channel_repository_context->delete_channel($id);

            return response()->json(['message' => 'Channel deleted successfully', 'status' => 'success']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'failed to delete channel', 'status' => 'error']);
        }
    }
}
