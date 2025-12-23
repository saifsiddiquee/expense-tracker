import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Currency from '@/Components/Currency';
import FlashMessage from '@/Components/FlashMessage';
import { Head, router, usePage } from '@inertiajs/react';
import { PageProps, BudgetStatus, CategoryExpense, DashboardSummary, Expense, Income } from '@/types';
import { useState } from 'react';

interface DashboardProps extends PageProps {
    summary: DashboardSummary;
    expenses_by_category: CategoryExpense[];
    budget_status: BudgetStatus[];
    exceeded_budgets: BudgetStatus[];
    recent_expenses: Expense[];
    recent_incomes: Income[];
    filters: {
        start_date: string;
        end_date: string;
    };
    settings: {
        currency: string;
        currency_code: string;
        allow_future_dates: boolean;
    };
}

export default function Dashboard({
    summary,
    expenses_by_category,
    budget_status,
    exceeded_budgets,
    recent_expenses,
    recent_incomes,
    filters,
}: DashboardProps) {
    const { flash } = usePage().props as any;
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);

    const applyFilters = () => {
        router.get(route('dashboard'), { start_date: startDate, end_date: endDate }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FlashMessage success={flash?.success} error={flash?.error} />

                    {/* Budget Alerts */}
                    {exceeded_budgets.length > 0 && (
                        <div className="mb-6 rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Budget Alert!</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <ul className="list-disc space-y-1 pl-5">
                                            {exceeded_budgets.map((budget) => (
                                                <li key={budget.id}>
                                                    <strong>{budget.category_name}</strong> ({budget.period}) - Spent <Currency amount={budget.spent_amount} /> of <Currency amount={budget.amount} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Date Filter */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-wrap items-end gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    onClick={applyFilters}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 rounded-md bg-green-100 p-3">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Total Income</dt>
                                            <dd className="text-lg font-semibold text-green-600">
                                                <Currency amount={summary.total_income} />
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 rounded-md bg-red-100 p-3">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Total Expenses</dt>
                                            <dd className="text-lg font-semibold text-red-600">
                                                <Currency amount={summary.total_expenses} />
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 rounded-md p-3 ${summary.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                                        <svg className={`h-6 w-6 ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Balance</dt>
                                            <dd className={`text-lg font-semibold ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                                                <Currency amount={summary.balance} />
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Expenses by Category */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Expenses by Category</h3>
                                {expenses_by_category.length > 0 ? (
                                    <div className="space-y-3">
                                        {expenses_by_category.map((item) => (
                                            <div key={item.category_id} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div
                                                        className="h-3 w-3 rounded-full mr-2"
                                                        style={{ backgroundColor: item.category_color }}
                                                    />
                                                    <span className="text-sm text-gray-700">{item.category_name}</span>
                                                </div>
                                                <Currency amount={item.total} className="text-sm font-medium text-gray-900" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No expenses in this period.</p>
                                )}
                            </div>
                        </div>

                        {/* Budget Status */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Budget Status</h3>
                                {budget_status.length > 0 ? (
                                    <div className="space-y-4">
                                        {budget_status.map((budget) => (
                                            <div key={budget.id}>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium text-gray-700">
                                                        {budget.category_name}
                                                        <span className="ml-1 text-xs text-gray-500">({budget.period})</span>
                                                    </span>
                                                    <span className={budget.is_exceeded ? 'text-red-600' : 'text-gray-900'}>
                                                        <Currency amount={budget.spent_amount} /> / <Currency amount={budget.amount} />
                                                    </span>
                                                </div>
                                                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                    <div
                                                        className={`h-2 rounded-full transition-all ${budget.is_exceeded
                                                                ? 'bg-red-500'
                                                                : budget.percentage_used > 80
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-green-500'
                                                            }`}
                                                        style={{ width: `${Math.min(100, budget.percentage_used)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No budgets set. Create budgets to track spending.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Expenses */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Expenses</h3>
                                {recent_expenses.length > 0 ? (
                                    <div className="space-y-3">
                                        {recent_expenses.map((expense) => (
                                            <div key={expense.id} className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center">
                                                        <div
                                                            className="h-2 w-2 rounded-full mr-2"
                                                            style={{ backgroundColor: expense.category?.color || '#6b7280' }}
                                                        />
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {expense.category?.name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{expense.date}</p>
                                                </div>
                                                <Currency amount={expense.amount} className="text-sm font-semibold text-red-600" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No recent expenses.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Income */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Income</h3>
                                {recent_incomes.length > 0 ? (
                                    <div className="space-y-3">
                                        {recent_incomes.map((income) => (
                                            <div key={income.id} className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {income.source || 'Income'}
                                                    </span>
                                                    <p className="text-xs text-gray-500">{income.date}</p>
                                                </div>
                                                <Currency amount={income.amount} className="text-sm font-semibold text-green-600" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No recent income.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
