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

    public $content;
    //dm or サーバーのチャンネルかを判別するための変数
    public $message_type;
    public $id;
    public $name;
    public $created_at;

    public function __construct($content, $message_type, $id, $name, $timestamp)
    {
        $this->content      = $content;
        $this->message_type = $message_type;
        $this->id           = $id;
        $this->name         = $name;
        $this->created_at   = $timestamp;
    }

    public function broadcastOn()
    {
        return new Channel($this->message_type . $this->id);
    }

    public function broadcastAs()
    {
        return 'chat-event';
    }
}
