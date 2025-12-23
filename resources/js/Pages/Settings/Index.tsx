import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps, Currency } from '@/types';
import { FormEvent } from 'react';

interface SettingsProps extends PageProps {
    settings: {
        currency: string;
        currency_code: string;
        allow_future_dates: boolean;
    };
    currencies: Currency[];
}

export default function Index({ settings, currencies }: SettingsProps) {
    const { flash } = usePage().props as any;

    const { data, setData, patch, processing } = useForm({
        currency: settings.currency,
        currency_code: settings.currency_code,
        allow_future_dates: settings.allow_future_dates,
    });

    const handleCurrencyChange = (code: string) => {
        const currency = currencies.find((c) => c.code === code);
        if (currency) {
            setData({
                ...data,
                currency: currency.symbol,
                currency_code: currency.code,
            });
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        patch(route('settings.update'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Settings</h2>}
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <FlashMessage success={flash?.success} error={flash?.error} />

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Currency Settings</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Choose your preferred currency for displaying amounts.
                                    </p>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                                        <select
                                            value={data.currency_code}
                                            onChange={(e) => handleCurrencyChange(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            {currencies.map((currency) => (
                                                <option key={currency.code} value={currency.code}>
                                                    {currency.symbol} - {currency.name} ({currency.code})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium text-gray-900">Date Validation</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Control whether future dates are allowed for expenses and income.
                                    </p>
                                    <div className="mt-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.allow_future_dates}
                                                onChange={(e) => setData('allow_future_dates', e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">
                                                Allow future dates for expenses and income
                                            </span>
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500 ml-6">
                                            When disabled, you cannot add transactions with dates after today.
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        Save Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
