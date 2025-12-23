<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultCategorySeeder extends Seeder
{
    /**
     * Default categories with colors.
     */
    protected array $defaultCategories = [
        ['name' => 'Food', 'color' => '#22c55e'],      // Green
        ['name' => 'Travel', 'color' => '#3b82f6'],    // Blue
        ['name' => 'Rent', 'color' => '#f97316'],      // Orange
        ['name' => 'Utilities', 'color' => '#eab308'], // Yellow
        ['name' => 'Entertainment', 'color' => '#a855f7'], // Purple
        ['name' => 'Healthcare', 'color' => '#ef4444'], // Red
        ['name' => 'Shopping', 'color' => '#ec4899'],   // Pink
        ['name' => 'Other', 'color' => '#6b7280'],      // Gray
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users and create default categories for each
        User::all()->each(function ($user) {
            $this->createDefaultCategoriesForUser($user);
        });
    }

    /**
     * Create default categories for a specific user.
     */
    public function createDefaultCategoriesForUser(User $user): void
    {
        foreach ($this->defaultCategories as $category) {
            $user->categories()->firstOrCreate(
                ['name' => $category['name']],
                [
                    'color' => $category['color'],
                    'is_default' => true,
                ]
            );
        }
    }
}
