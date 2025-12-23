<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use App\Models\Budget;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $budgets = auth()->user()->budgets()
            ->with('category')
            ->get()
            ->map(function ($budget) {
                return [
                    'id' => $budget->id,
                    'category' => $budget->category,
                    'amount' => $budget->amount,
                    'period' => $budget->period,
                    'spent_amount' => $budget->spent_amount,
                    'remaining_amount' => $budget->remaining_amount,
                    'percentage_used' => $budget->percentage_used,
                    'is_exceeded' => $budget->is_exceeded,
                ];
            });

        $categories = auth()->user()->categories()->get(['id', 'name', 'color']);

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = auth()->user()->categories()->get(['id', 'name', 'color']);

        return Inertia::render('Budgets/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBudgetRequest $request): RedirectResponse
    {
        // Check if budget already exists for this category and period
        $existing = auth()->user()->budgets()
            ->where('category_id', $request->category_id)
            ->where('period', $request->period)
            ->first();

        if ($existing) {
            return back()->withErrors([
                'category_id' => 'A budget for this category and period already exists.',
            ]);
        }

        auth()->user()->budgets()->create($request->validated());

        return redirect()->route('budgets.index')
            ->with('success', 'Budget created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Budget $budget): Response
    {
        Gate::authorize('view', $budget);

        return Inertia::render('Budgets/Show', [
            'budget' => [
                'id' => $budget->id,
                'category' => $budget->category,
                'amount' => $budget->amount,
                'period' => $budget->period,
                'spent_amount' => $budget->spent_amount,
                'remaining_amount' => $budget->remaining_amount,
                'percentage_used' => $budget->percentage_used,
                'is_exceeded' => $budget->is_exceeded,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Budget $budget): Response
    {
        Gate::authorize('update', $budget);

        $categories = auth()->user()->categories()->get(['id', 'name', 'color']);

        return Inertia::render('Budgets/Edit', [
            'budget' => $budget->load('category'),
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBudgetRequest $request, Budget $budget): RedirectResponse
    {
        Gate::authorize('update', $budget);

        // Check if another budget exists for this category and period
        $existing = auth()->user()->budgets()
            ->where('category_id', $request->category_id)
            ->where('period', $request->period)
            ->where('id', '!=', $budget->id)
            ->first();

        if ($existing) {
            return back()->withErrors([
                'category_id' => 'A budget for this category and period already exists.',
            ]);
        }

        $budget->update($request->validated());

        return redirect()->route('budgets.index')
            ->with('success', 'Budget updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget): RedirectResponse
    {
        Gate::authorize('delete', $budget);

        $budget->delete();

        return redirect()->route('budgets.index')
            ->with('success', 'Budget deleted successfully.');
    }
}
