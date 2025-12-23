<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'period',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    /**
     * Get the user that owns the budget.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category for this budget.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Calculate total spending for this budget's category in the current period.
     */
    public function getSpentAmountAttribute(): float
    {
        $query = Expense::where('user_id', $this->user_id)
            ->where('category_id', $this->category_id);

        if ($this->period === 'weekly') {
            $query->whereBetween('date', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek(),
            ]);
        } else {
            $query->whereBetween('date', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth(),
            ]);
        }

        return (float) $query->sum('amount');
    }

    /**
     * Get remaining budget amount.
     */
    public function getRemainingAmountAttribute(): float
    {
        return $this->amount - $this->spent_amount;
    }

    /**
     * Check if budget is exceeded.
     */
    public function getIsExceededAttribute(): bool
    {
        return $this->spent_amount > $this->amount;
    }

    /**
     * Get percentage used of budget.
     */
    public function getPercentageUsedAttribute(): float
    {
        if ($this->amount <= 0) {
            return 0;
        }
        return min(100, ($this->spent_amount / $this->amount) * 100);
    }
}
