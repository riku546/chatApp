<?php
namespace App\Events;

use App\Events\Abstract\ChatEvent;

class DmEvent extends ChatEvent
{
    public $dm_id;

    public function __construct($content, $user_id, $user_name, $timestamp, $dm_id)
    {
        parent::__construct($content, $user_id, $user_name, $timestamp);
        $this->dm_id = $dm_id;
    }

    public function broadcastOn()
    {
        return ['dm' . $this->dm_id];
    }
}
