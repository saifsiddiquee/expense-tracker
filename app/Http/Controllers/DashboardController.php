<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request): Response
    {
        $user = auth()->user();

        // Default to current month if no dates provided
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->toDateString());

        // Get total expenses for the period
        $totalExpenses = $user->expenses()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        // Get total income for the period
        $totalIncome = $user->incomes()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        // Get expenses by category for the period
        $expensesByCategory = $user->expenses()
            ->with('category:id,name,color')
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw('category_id, SUM(amount) as total')
            ->groupBy('category_id')
            ->get()
            ->map(function ($item) {
                return [
                    'category_id' => $item->category_id,
                    'category_name' => $item->category->name ?? 'Unknown',
                    'category_color' => $item->category->color ?? '#6b7280',
                    'total' => (float) $item->total,
                ];
            });

        // Get budget status for all budgets
        $budgetStatus = $user->budgets()
            ->with('category:id,name,color')
            ->get()
            ->map(function ($budget) {
                return [
                    'id' => $budget->id,
                    'category_id' => $budget->category_id,
                    'category_name' => $budget->category->name,
                    'category_color' => $budget->category->color,
                    'amount' => (float) $budget->amount,
                    'period' => $budget->period,
                    'spent_amount' => $budget->spent_amount,
                    'remaining_amount' => $budget->remaining_amount,
                    'percentage_used' => round($budget->percentage_used, 1),
                    'is_exceeded' => $budget->is_exceeded,
                ];
            });

        // Get recent expenses
        $recentExpenses = $user->expenses()
            ->with('category:id,name,color')
            ->latest('date')
            ->take(5)
            ->get();

        // Get recent incomes
        $recentIncomes = $user->incomes()
            ->latest('date')
            ->take(5)
            ->get();

        // Get exceeded budgets for alerts
        $exceededBudgets = $budgetStatus->filter(fn($b) => $b['is_exceeded'])->values();

        return Inertia::render('Dashboard', [
            'summary' => [
                'total_expenses' => (float) $totalExpenses,
                'total_income' => (float) $totalIncome,
                'balance' => (float) ($totalIncome - $totalExpenses),
            ],
            'expenses_by_category' => $expensesByCategory,
            'budget_status' => $budgetStatus,
            'exceeded_budgets' => $exceededBudgets,
            'recent_expenses' => $recentExpenses,
            'recent_incomes' => $recentIncomes,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'settings' => $user->settings,
        ]);
    }
}
