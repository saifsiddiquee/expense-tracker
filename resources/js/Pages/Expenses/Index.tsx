import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Currency from '@/Components/Currency';
import FlashMessage from '@/Components/FlashMessage';
import Pagination from '@/Components/Pagination';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { PageProps, Category, Expense, PaginatedData } from '@/types';
import { useState, FormEvent } from 'react';

interface ExpensesIndexProps extends PageProps {
    expenses: PaginatedData<Expense>;
    categories: Category[];
    filters: {
        start_date?: string;
        end_date?: string;
        category_id?: string;
    };
}

export default function Index({ expenses, categories, filters }: ExpensesIndexProps) {
    const { flash } = usePage().props as any;
    const [confirmingDeletion, setConfirmingDeletion] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
    });

    const [filterData, setFilterData] = useState({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        category_id: filters.category_id || '',
    });

    const applyFilters = () => {
        router.get(route('expenses.index'), filterData, { preserveState: true });
    };

    const clearFilters = () => {
        setFilterData({ start_date: '', end_date: '', category_id: '' });
        router.get(route('expenses.index'));
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('expenses.store'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const deleteExpense = () => {
        if (confirmingDeletion) {
            router.delete(route('expenses.destroy', confirmingDeletion), {
                onSuccess: () => setConfirmingDeletion(null),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Expenses</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        {showForm ? 'Cancel' : 'Add Expense'}
                    </button>
                </div>
            }
        >
            <Head title="Expenses" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FlashMessage success={flash?.success} error={flash?.error} />

                    {/* Quick Add Form */}
                    {showForm && (
                        <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Quick Add Expense</h3>
                                <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                    <div>
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
                                        <label className="block text-sm font-medium text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={data.amount}
                                            onChange={(e) => setData('amount', e.target.value)}
                                            placeholder="0.00"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <input
                                            type="text"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Optional description"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                        >
                                            Add Expense
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-wrap items-end gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={filterData.start_date}
                                        onChange={(e) => setFilterData({ ...filterData, start_date: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={filterData.end_date}
                                        onChange={(e) => setFilterData({ ...filterData, end_date: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={filterData.category_id}
                                        onChange={(e) => setFilterData({ ...filterData, category_id: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={applyFilters} className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                        Filter
                                    </button>
                                    <button onClick={clearFilters} className="inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300">
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expenses List */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Description</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {expenses.data.length > 0 ? (
                                        expenses.data.map((expense) => (
                                            <tr key={expense.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{expense.date}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="h-3 w-3 rounded-full mr-2"
                                                            style={{ backgroundColor: expense.category?.color || '#6b7280' }}
                                                        />
                                                        <span className="text-sm text-gray-900">{expense.category?.name || 'Unknown'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{expense.description || '-'}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-red-600">
                                                    <Currency amount={expense.amount} />
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <Link href={route('expenses.edit', expense.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => setConfirmingDeletion(expense.id)} className="text-red-600 hover:text-red-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                No expenses found. Add your first expense above!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={expenses.links} />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={confirmingDeletion !== null} onClose={() => setConfirmingDeletion(null)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Delete Expense</h2>
                    <p className="mt-1 text-sm text-gray-600">Are you sure you want to delete this expense? This action cannot be undone.</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setConfirmingDeletion(null)}>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteExpense}>Delete</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
