<?php
namespace App\Repository\User\Concrete;

use App\Repository\User\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class UserRepositorySql implements UserRepositoryInterface
{

    public function update_info(string $name, string $description, int $userId): void
    {
        try {
            DB::update('update users set name = ? , description = ? where id = ?', [$name, $description, $userId]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function enable_icon(int $userId): void
    {
        try {
            DB::update('update users set set_icon = ? where id = ?', [1, $userId]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show_icon_status(int $userId): int
    {
        try {
            $icon_status = DB::select('select set_icon from users where id = ?', [$userId]);

            return $icon_status[0]->set_icon;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show_specific_user_info(int $user_id): array
    {
        try {
            $user_info = DB::select('select name , description from users where id = ?', [$user_id]);

            return $user_info;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
