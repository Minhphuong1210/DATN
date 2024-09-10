<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Discount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = Category::query()->pluck('id')->toArray();
        $discount = [];
        for ($i = 0; $i < 10; $i++) {
            $discount[] = [
                'category_id' => fake()->randomElement($category),
                'discount_percent' => fake()->numberBetween(1, 100),
            ];
        }
        Discount::query()->insert($discount);
    }
}
