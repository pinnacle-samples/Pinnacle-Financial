# Banking Services

A banking services RCS chatbot that enables customers to view accounts, manage cards, view statements, and find ATM/branch locations through an interactive messaging interface.

## Features

- **Account Overview** - View recent payments and transactions
- **Statement Access** - View and download monthly statements
- **Card Management** - Lock, unlock, and activate debit/credit cards
- **ATM/Branch Finder** - Find nearby ATMs and branches with directions
- **Fraud Reporting** - Report suspicious transactions
- **Credit Card Payments** - Make minimum or full balance payments
- **Business Hours** - View branch operating hours

## Prerequisites

- Node.js 18+
- A Pinnacle API account with RCS capabilities
- An RCS-enabled agent configured in your Pinnacle dashboard

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/pinnacle-samples/Banking-Services.git
   cd Banking-Services
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   - `PINNACLE_API_KEY` - Your Pinnacle API key
   - `PINNACLE_AGENT_NAME` - Your RCS agent identifier
   - `TEST_MODE` - Set to `true` for testing

## Usage

Start the development server:
```bash
npm run dev
```

Or build and run:
```bash
npm run build
npm start
```

## Webhook Configuration

Configure your Pinnacle webhook to point to this server's POST `/` endpoint. The router handles:

- `RCS_BUTTON_DATA` - Interactive button triggers for navigation
- `RCS_LOCATION_DATA` - User location for finding nearby ATMs/branches
- `RCS_TEXT` - Text messages (START, MENU, SUBSCRIBE commands)

## Project Structure

```
├── router.ts                  # Express router handling RCS webhook events
├── lib/
│   ├── agent.ts               # Banking agent class with RCS messaging logic
│   ├── brand/
│   │   ├── data.ts            # Mock banking data (payments, statements, locations)
│   │   └── types.ts           # TypeScript type definitions
│   └── shared/
│       ├── baseAgent.ts       # Base agent class for RCS messaging
│       ├── rcsClient.ts       # Pinnacle RCS client initialization
│       └── types.ts           # Shared type definitions
├── package.json
└── .env.example
```

## Available Actions

| Action | Description |
|--------|-------------|
| `showMainMenu` | Display main banking menu |
| `viewPayments` | View recent transactions |
| `viewStatements` | View monthly statements |
| `viewLocations` | Find nearby ATMs/branches |
| `viewCard` | View card details and status |
| `lockCard` | Lock a card |
| `unlockCard` | Unlock a card |
| `activateCard` | Activate a new card |
| `reportFraud` | Report a fraudulent transaction |
| `makePayment` | Initiate credit card payment |
| `processPayment` | Process payment amount |
| `viewHours` | View branch operating hours |

## License

MIT
