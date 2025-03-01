<?php
namespace App\Repository\Channel\Concrete;

use App\Models\Channels;
use App\Repository\Channel\ChannelRepositoryInterface;

class ChannelRepositorySql implements ChannelRepositoryInterface
{
    public function list_channel_in_server(int $server_id)
    {
        try {
            return Channels::where('server_id', $server_id)
                ->select('id', 'name')
                ->get();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function create_channel(string $name, int $server_id)
    {
        try {
            return Channels::create([
                'name'      => $name,
                'server_id' => $server_id,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update_channel(string $name, int $id)
    {
        try {
            Channels::find($id)->update([
                'name' => $name,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete_channel(int $id)
    {
        try {
            Channels::destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
