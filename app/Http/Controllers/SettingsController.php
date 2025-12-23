<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display settings page.
     */
    public function index(): Response
    {
        return Inertia::render('Settings/Index', [
            'settings' => auth()->user()->settings,
            'currencies' => $this->getAvailableCurrencies(),
        ]);
    }

    /**
     * Update user settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'currency' => ['required', 'string', 'max:10'],
            'currency_code' => ['required', 'string', 'max:3'],
            'allow_future_dates' => ['required', 'boolean'],
        ]);

        $user = auth()->user();
        $currentSettings = $user->settings;

        $user->update([
            'settings' => array_merge($currentSettings, $validated),
        ]);

        return redirect()->route('settings.index')
            ->with('success', 'Settings updated successfully.');
    }

    /**
     * Get available currencies.
     */
    private function getAvailableCurrencies(): array
    {
        return [
            ['symbol' => '৳', 'code' => 'BDT', 'name' => 'Bangladeshi Taka'],
            ['symbol' => '$', 'code' => 'USD', 'name' => 'US Dollar'],
            ['symbol' => '€', 'code' => 'EUR', 'name' => 'Euro'],
            ['symbol' => '£', 'code' => 'GBP', 'name' => 'British Pound'],
            ['symbol' => '₹', 'code' => 'INR', 'name' => 'Indian Rupee'],
            ['symbol' => '¥', 'code' => 'JPY', 'name' => 'Japanese Yen'],
            ['symbol' => '¥', 'code' => 'CNY', 'name' => 'Chinese Yuan'],
            ['symbol' => 'A$', 'code' => 'AUD', 'name' => 'Australian Dollar'],
            ['symbol' => 'C$', 'code' => 'CAD', 'name' => 'Canadian Dollar'],
        ];
    }
}
