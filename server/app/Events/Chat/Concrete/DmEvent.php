<?php
namespace App\Events\Chat\Concrete;

use App\Events\Chat\Abstract\AbstractChatEvent;

class DmEvent extends AbstractChatEvent
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
