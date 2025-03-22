<?php
namespace App\Repository\User;

interface UserRepositoryInterface
{
    public function update_info(string $name, string $description, int $userId): void;

    public function enable_icon(int $userId): void;

    public function show_icon_status(int $userId): int;

    public function show_specific_user_info(int $user_id): array;
}
