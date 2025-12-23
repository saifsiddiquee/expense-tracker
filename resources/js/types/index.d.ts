export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    settings: {
        currency: string;
        currency_code: string;
        allow_future_dates: boolean;
    };
}

export interface Category {
    id: number;
    user_id: number;
    name: string;
    color: string | null;
    is_default: boolean;
    expenses_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Expense {
    id: number;
    user_id: number;
    category_id: number;
    category?: Category;
    date: string;
    amount: number | string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface Income {
    id: number;
    user_id: number;
    date: string;
    amount: number | string;
    source: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface Budget {
    id: number;
    user_id: number;
    category_id: number;
    category?: Category;
    amount: number | string;
    period: 'weekly' | 'monthly';
    spent_amount?: number;
    remaining_amount?: number;
    percentage_used?: number;
    is_exceeded?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Currency {
    symbol: string;
    code: string;
    name: string;
}

export interface DashboardSummary {
    total_expenses: number;
    total_income: number;
    balance: number;
}

export interface CategoryExpense {
    category_id: number;
    category_name: string;
    category_color: string;
    total: number;
}

export interface BudgetStatus {
    id: number;
    category_id: number;
    category_name: string;
    category_color: string;
    amount: number;
    period: 'weekly' | 'monthly';
    spent_amount: number;
    remaining_amount: number;
    percentage_used: number;
    is_exceeded: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
