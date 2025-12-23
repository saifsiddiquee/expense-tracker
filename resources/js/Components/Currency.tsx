import { usePage } from '@inertiajs/react';

interface CurrencyProps {
    amount: number | string;
    className?: string;
}

export default function Currency({ amount, className = '' }: CurrencyProps) {
    const { auth } = usePage().props as any;
    const currency = auth?.user?.settings?.currency ?? '৳';

    const formattedAmount = typeof amount === 'string'
        ? parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <span className={className}>
            {currency}{formattedAmount}
        </span>
    );
}
