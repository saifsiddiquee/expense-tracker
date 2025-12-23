# Personal Expense Tracker

A modern expense tracking application built with Laravel and React (Inertia.js).

## Features

- **Expense Management**: Track all your expenses with categories, dates, and descriptions
- **Income Tracking**: Log income sources separately from expenses
- **Category System**: Create custom categories with colors for organizing transactions
- **Budgeting**: Set weekly or monthly budgets per category with real-time tracking
- **Dashboard**: View summary statistics, category breakdowns, and budget status
- **Multi-Currency**: Configurable currency with Bangladeshi Taka (৳) as default

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18 with TypeScript
- **Routing**: Inertia.js
- **Authentication**: Laravel Breeze
- **Database**: SQLite (default) / MySQL
- **Styling**: Tailwind CSS

## Requirements

- PHP 8.2+
- Node.js 18+
- Composer
- MySQL (optional, SQLite works by default)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-1
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database** (optional - for MySQL)
   
   Edit `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=expense_tracker
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed default data** (optional)
   ```bash
   php artisan db:seed
   ```

8. **Build frontend assets**
   ```bash
   npm run build
   ```

## Development

Run the development servers:

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

Access the application at: `http://localhost:8000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_CONNECTION` | Database driver | sqlite |
| `DB_DATABASE` | Database name | database/database.sqlite |
| `APP_URL` | Application URL | http://localhost |

## Architecture

### Backend

- **Controllers**: Thin controllers following Laravel conventions
- **Form Requests**: Validation in dedicated request classes
- **Policies**: Authorization using Laravel policies
- **Models**: Eloquent with relationships and soft deletes

### Frontend

- **Pages**: Inertia-powered React pages
- **Components**: Reusable UI components
- **Types**: Full TypeScript type definitions

### Database Schema

```
users
├── categories (hasMany)
├── expenses (hasMany)
├── incomes (hasMany)
└── budgets (hasMany)

categories
├── expenses (hasMany)
└── budgets (hasMany)
```

## Default Categories

When users register, they receive these default categories:
- Food, Travel, Rent, Utilities, Entertainment, Healthcare, Shopping, Other

## License

MIT
