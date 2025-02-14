<?php
namespace App\Events\Abstract;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

abstract class ChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $content;
    public $user_name;
    public $user_id;
    public $created_at;

    public function __construct($content, $user_id, $user_name, $timestamp)
    {
        $this->content    = $content;
        $this->user_id    = $user_id;
        $this->user_name  = $user_name;
        $this->created_at = $timestamp;
    }

    abstract public function broadcastOn();

    public function broadcastAs()
    {
        return 'chat-event';
    }
}
