import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Expense Tracker - Take Control of Your Finances" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-20 right-1/4 h-60 w-60 rounded-full bg-pink-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                {/* Header */}
                <header className="relative z-10">
                    <nav className="mx-auto max-w-7xl px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/25">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-white">ExpenseTracker</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-lg"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10">
                    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-24">
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-sm text-white/70">Free to use • No credit card required</span>
                            </div>
                            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
                                Take Control of Your
                                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"> Financial Future</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
                                Track expenses, manage budgets, and gain insights into your spending habits.
                                Start your journey to financial freedom today with our intuitive expense tracker.
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href={route('register')}
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:-translate-y-1"
                                >
                                    Start Tracking Free
                                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl transition-all group-hover:bg-emerald-500/30" />
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">Smart Expense Tracking</h3>
                                    <p className="text-white/60">Easily categorize and track all your expenses. Know exactly where your money goes every month.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl transition-all group-hover:bg-cyan-500/30" />
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">Budget Management</h3>
                                    <p className="text-white/60">Set weekly or monthly budgets per category. Get alerted when you're close to overspending.</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl transition-all group-hover:bg-purple-500/30" />
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">Visual Insights</h3>
                                    <p className="text-white/60">View spending breakdowns by category. Understand your financial patterns at a glance.</p>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-pink-500/20 blur-2xl transition-all group-hover:bg-pink-500/30" />
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">Income Tracking</h3>
                                    <p className="text-white/60">Log all income sources separately. See your complete financial picture in one place.</p>
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/20 blur-2xl transition-all group-hover:bg-amber-500/30" />
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">Custom Categories</h3>
                                    <p className="text-white/60">Create personalized expense categories with custom colors. Organize spending your way.</p>
                                </div>
                            </div>

                            {/* Feature 6 */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl transition-all group-hover:bg-indigo-500/30" />
                                <div className="relative">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">Multi-Currency</h3>
                                    <p className="text-white/60">Support for multiple currencies including ৳ Taka. Perfect for users worldwide.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-12">
                            <div className="grid gap-8 sm:grid-cols-3">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white sm:text-5xl">100%</div>
                                    <div className="mt-2 text-white/60">Free Forever</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white sm:text-5xl">∞</div>
                                    <div className="mt-2 text-white/60">Unlimited Transactions</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white sm:text-5xl">9+</div>
                                    <div className="mt-2 text-white/60">Currency Options</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-24 text-center">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to start tracking?</h2>
                            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
                                Join now and take the first step towards better financial management.
                            </p>
                            <Link
                                href={route('register')}
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:-translate-y-1"
                            >
                                Create Free Account
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/10">
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
                                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-white">ExpenseTracker</span>
                            </div>
                            <p className="text-sm text-white/40">
                                © {new Date().getFullYear()} ExpenseTracker. Built with Laravel & React.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
