import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Currency from '@/Components/Currency';
import FlashMessage from '@/Components/FlashMessage';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps, Category, Budget } from '@/types';
import { useState, FormEvent } from 'react';

interface BudgetsIndexProps extends PageProps {
    budgets: (Budget & {
        spent_amount: number;
        remaining_amount: number;
        percentage_used: number;
        is_exceeded: boolean;
    })[];
    categories: Category[];
}

export default function Index({ budgets, categories }: BudgetsIndexProps) {
    const { flash } = usePage().props as any;
    const [confirmingDeletion, setConfirmingDeletion] = useState<number | null>(null);
    const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        category_id: '',
        amount: '',
        period: 'monthly' as 'weekly' | 'monthly',
    });

    const openEdit = (budget: Budget) => {
        setEditingBudget(budget);
        setData({
            category_id: String(budget.category_id),
            amount: String(budget.amount),
            period: budget.period,
        });
    };

    const closeEdit = () => {
        setEditingBudget(null);
        reset();
    };

    const submitCreate = (e: FormEvent) => {
        e.preventDefault();
        post(route('budgets.store'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const submitUpdate = (e: FormEvent) => {
        e.preventDefault();
        if (editingBudget) {
            put(route('budgets.update', editingBudget.id), {
                onSuccess: closeEdit,
            });
        }
    };

    const deleteBudget = () => {
        if (confirmingDeletion) {
            router.delete(route('budgets.destroy', confirmingDeletion), {
                onSuccess: () => setConfirmingDeletion(null),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Budgets</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        {showForm ? 'Cancel' : 'Add Budget'}
                    </button>
                </div>
            }
        >
            <Head title="Budgets" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FlashMessage success={flash?.success} error={flash?.error} />

                    {/* Add Budget Form */}
                    {showForm && (
                        <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Add Budget</h3>
                                <form onSubmit={submitCreate} className="flex flex-wrap items-end gap-4">
                                    <div className="min-w-[200px]">
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={data.amount}
                                            onChange={(e) => setData('amount', e.target.value)}
                                            placeholder="Budget limit"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Period</label>
                                        <select
                                            value={data.period}
                                            onChange={(e) => setData('period', e.target.value as 'weekly' | 'monthly')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        Create Budget
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Budgets Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {budgets.length > 0 ? (
                            budgets.map((budget) => (
                                <div
                                    key={budget.id}
                                    className={`overflow-hidden rounded-lg bg-white shadow ${budget.is_exceeded ? 'ring-2 ring-red-500' : ''}`}
                                >
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <div
                                                    className="h-3 w-3 rounded-full mr-2"
                                                    style={{ backgroundColor: budget.category?.color || '#6b7280' }}
                                                />
                                                <span className="text-sm font-medium text-gray-900">{budget.category?.name}</span>
                                            </div>
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${budget.period === 'weekly' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                {budget.period}
                                            </span>
                                        </div>

                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Spent</span>
                                                <span className={budget.is_exceeded ? 'text-red-600 font-medium' : 'text-gray-900'}>
                                                    <Currency amount={budget.spent_amount || 0} /> / <Currency amount={budget.amount} />
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className={`h-2 rounded-full transition-all ${budget.is_exceeded
                                                            ? 'bg-red-500'
                                                            : (budget.percentage_used || 0) > 80
                                                                ? 'bg-yellow-500'
                                                                : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${Math.min(100, budget.percentage_used || 0)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>
                                                Remaining: <Currency amount={Math.max(0, budget.remaining_amount || 0)} />
                                            </span>
                                            <span>{Math.round(budget.percentage_used || 0)}% used</span>
                                        </div>

                                        {budget.is_exceeded && (
                                            <div className="mt-2 text-xs text-red-600 font-medium">
                                                ⚠️ Budget exceeded!
                                            </div>
                                        )}

                                        <div className="mt-3 pt-3 border-t flex justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(budget)}
                                                className="text-sm text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setConfirmingDeletion(budget.id)}
                                                className="text-sm text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No budgets set. Create your first budget to track spending limits!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Budget Modal */}
            <Modal show={editingBudget !== null} onClose={closeEdit}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Edit Budget</h2>
                    <form onSubmit={submitUpdate} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Period</label>
                            <select
                                value={data.period}
                                onChange={(e) => setData('period', e.target.value as 'weekly' | 'monthly')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3">
                            <SecondaryButton onClick={closeEdit}>Cancel</SecondaryButton>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={confirmingDeletion !== null} onClose={() => setConfirmingDeletion(null)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Delete Budget</h2>
                    <p className="mt-1 text-sm text-gray-600">Are you sure you want to delete this budget?</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setConfirmingDeletion(null)}>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteBudget}>Delete</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
