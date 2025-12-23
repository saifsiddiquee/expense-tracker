<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIncomeRequest;
use App\Http\Requests\UpdateIncomeRequest;
use App\Models\Income;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = auth()->user()->incomes();

        // Apply date filters
        if ($request->filled('start_date')) {
            $query->whereDate('date', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('date', '<=', $request->end_date);
        }

        $incomes = $query->latest('date')->paginate(15)->withQueryString();

        return Inertia::render('Incomes/Index', [
            'incomes' => $incomes,
            'filters' => $request->only(['start_date', 'end_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Incomes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomeRequest $request): RedirectResponse
    {
        auth()->user()->incomes()->create($request->validated());

        return redirect()->route('incomes.index')
            ->with('success', 'Income added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income): Response
    {
        Gate::authorize('view', $income);

        return Inertia::render('Incomes/Show', [
            'income' => $income,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $income): Response
    {
        Gate::authorize('update', $income);

        return Inertia::render('Incomes/Edit', [
            'income' => $income,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncomeRequest $request, Income $income): RedirectResponse
    {
        Gate::authorize('update', $income);

        $income->update($request->validated());

        return redirect()->route('incomes.index')
            ->with('success', 'Income updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income): RedirectResponse
    {
        Gate::authorize('delete', $income);

        $income->delete();

        return redirect()->route('incomes.index')
            ->with('success', 'Income deleted successfully.');
    }
}
