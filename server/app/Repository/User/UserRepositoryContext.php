<?php
namespace App\Repository\User;

use App\Repository\User\UserRepositoryInterface;

class UserRepositoryContext implements UserRepositoryInterface
{
    private $user_repository;

    public function __construct(UserRepositoryInterface $user_repository)
    {
        $this->user_repository = $user_repository;
    }

    public function update_info(string $name, string $description, int $userId): void
    {
        $this->user_repository->update_info($name, $description, $userId);
    }

    public function enable_icon(int $userId): void
    {
        $this->user_repository->enable_icon($userId);
    }

    public function show_icon_status(int $userId): int
    {
        return $this->user_repository->show_icon_status($userId);
    }

    public function show_specific_user_info(int $user_id): array
    {
        return $this->user_repository->show_specific_user_info($user_id);
    }
}
