import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps, Category } from '@/types';
import { useState, FormEvent } from 'react';

interface CategoriesIndexProps extends PageProps {
    categories: (Category & { expenses_count: number })[];
}

export default function Index({ categories }: CategoriesIndexProps) {
    const { flash } = usePage().props as any;
    const [confirmingDeletion, setConfirmingDeletion] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        color: '#6b7280',
    });

    const openEdit = (category: Category) => {
        setEditingCategory(category);
        setData({ name: category.name, color: category.color || '#6b7280' });
    };

    const closeEdit = () => {
        setEditingCategory(null);
        reset();
    };

    const submitCreate = (e: FormEvent) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const submitUpdate = (e: FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('categories.update', editingCategory.id), {
                onSuccess: closeEdit,
            });
        }
    };

    const deleteCategory = () => {
        if (confirmingDeletion) {
            router.delete(route('categories.destroy', confirmingDeletion), {
                onSuccess: () => setConfirmingDeletion(null),
                onError: () => setConfirmingDeletion(null),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Categories</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        {showForm ? 'Cancel' : 'Add Category'}
                    </button>
                </div>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FlashMessage success={flash?.success} error={flash?.error} />

                    {/* Add Category Form */}
                    {showForm && (
                        <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Add Category</h3>
                                <form onSubmit={submitCreate} className="flex flex-wrap items-end gap-4">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Category name"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Color</label>
                                        <input
                                            type="color"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            className="mt-1 h-10 w-20 cursor-pointer rounded-md border border-gray-300"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        Create Category
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Categories Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.id} className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div
                                                    className="h-4 w-4 rounded-full mr-3"
                                                    style={{ backgroundColor: category.color || '#6b7280' }}
                                                />
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                                                    <p className="text-xs text-gray-500">
                                                        {category.expenses_count} expense{category.expenses_count !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {category.is_default && (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(category)}
                                                className="text-sm text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setConfirmingDeletion(category.id)}
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
                                No categories found. Create your first category above!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Category Modal */}
            <Modal show={editingCategory !== null} onClose={closeEdit}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Edit Category</h2>
                    <form onSubmit={submitUpdate} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color</label>
                            <input
                                type="color"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                className="mt-1 h-10 w-20 cursor-pointer rounded-md border border-gray-300"
                            />
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
                    <h2 className="text-lg font-medium text-gray-900">Delete Category</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this category? Categories with expenses cannot be deleted.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setConfirmingDeletion(null)}>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteCategory}>Delete</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
