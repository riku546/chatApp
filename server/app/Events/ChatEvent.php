<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $channel_id;
    public $sender_name;

    public function __construct($message, $channel_id, $sender_name)
    {
        $this->message     = $message;
        $this->channel_id  = $channel_id;
        $this->sender_name = $sender_name;
    }

    public function broadcastOn()
    {
        return new Channel('chat' . $this->channel_id);
    }

    public function broadcastAs()
    {
        return 'chat-event';
    }
}
