<?php
namespace App\Events\Chat\Concrete;

use App\Events\Chat\Abstract\AbstractChatEvent;

class ChannelEvent extends AbstractChatEvent
{
    public $channel_id;

    public function __construct($content, $user_id, $user_name, $timestamp, $channel_id, $set_icon)
    {
        parent::__construct($content, $user_id, $user_name, $timestamp, $set_icon);
        $this->channel_id = $channel_id;
    }

    public function broadcastOn()
    {
        return ['channel' . $this->channel_id];
    }
}
