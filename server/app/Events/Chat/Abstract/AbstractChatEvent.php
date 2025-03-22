<?php
namespace App\Events\Chat\Abstract;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

abstract class AbstractChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $content;
    public $user_name;
    public $user_id;
    public $created_at;
    public $set_icon;

    public function __construct($content, $user_id, $user_name, $timestamp, $set_icon)
    {
        $this->content    = $content;
        $this->user_id    = $user_id;
        $this->user_name  = $user_name;
        $this->created_at = $timestamp;
        $this->set_icon   = $set_icon;
    }

    abstract public function broadcastOn();

    public function broadcastAs()
    {
        return 'chat-event';
    }

}
