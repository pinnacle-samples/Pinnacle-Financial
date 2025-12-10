# Banking Services Chatbot

A banking services RCS chatbot that enables customers to view accounts, manage cards, view statements, and find ATM/branch locations through Rich Communication Services (RCS) messaging.


https://github.com/user-attachments/assets/c3974908-d8fe-4091-bbd0-734b2e4985fa


## Features

### Account Management

- View recent payments and transactions
- Access monthly statements
- Check account balances

### Card Management

- View card details and status
- Lock and unlock debit/credit cards
- Activate new cards
- Report fraudulent transactions

### ATM/Branch Finder

- Find nearby ATMs and branches
- Get directions via location sharing
- View branch operating hours

### Payments

- Make credit card payments
- Choose minimum or full balance payments
- View payment confirmation

## Project Structure

```
Banking-Services/
├── lib/
│   ├── rcsClient.ts          # Pinnacle RCS client configuration
│   ├── baseAgent.ts          # Base agent class with common functionality
│   ├── agent.ts              # Banking agent implementation
│   └── brand/
│       ├── data.ts           # Mock banking data (payments, statements, locations)
│       └── types.ts          # Business-specific type definitions
├── server.ts                 # Main Express server
├── router.ts                 # Express router for webhook handling
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment variables template
└── .gitignore                # Git ignore rules
```

## Setup

### Prerequisites

- Node.js 18+
- A Pinnacle API account
- RCS agent configured in Pinnacle

### Installation

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:

```env
PINNACLE_API_KEY=your_api_key_here
PINNACLE_AGENT_ID=your_agent_id_here
PINNACLE_SIGNING_SECRET=your_signing_secret_here
TEST_MODE=false
PORT=3000
```

5. Set up a public HTTPS URL for your webhook. For local development, you can use a tunneling service like [ngrok](https://ngrok.com):

   ```bash
   ngrok http 3000
   ```

   For production, deploy to your preferred hosting provider.

6. Connect your webhook to your RCS agent:
   - Go to the [Pinnacle Webhooks Dashboard](https://app.pinnacle.sh/dashboard/development/webhooks)
   - Add your public URL with the `/webhook` path (e.g., `https://your-domain.com/webhook`)
   - Select your RCS agent to receive messages at this endpoint
   - Copy the signing secret and add it to your `.env` file as `PINNACLE_SIGNING_SECRET`. The `process()` method uses this environment variable to verify the request signature.

7. Text "MENU" to the bot to see the main menu.

### Running the Application

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Configuration

### Environment Variables

| Variable                  | Description                                                            | Required            |
| ------------------------- | ---------------------------------------------------------------------- | ------------------- |
| `PINNACLE_API_KEY`        | Your Pinnacle API key                                                  | Yes                 |
| `PINNACLE_AGENT_ID`       | Your RCS agent ID from Pinnacle Dashboard                              | Yes                 |
| `PINNACLE_SIGNING_SECRET` | Webhook signing secret for verification                                | Yes                 |
| `TEST_MODE`               | Set to `true` for sending with a test RCS agent to whitelisted numbers | No (default: false) |
| `PORT`                    | Server port                                                            | No (default: 3000)  |

## Supported Actions

| Action           | Description                     |
| ---------------- | ------------------------------- |
| `showMainMenu`   | Display main banking menu       |
| `viewPayments`   | View recent transactions        |
| `viewStatements` | View monthly statements         |
| `viewLocations`  | Find nearby ATMs/branches       |
| `viewCard`       | View card details and status    |
| `lockCard`       | Lock a card                     |
| `unlockCard`     | Unlock a card                   |
| `activateCard`   | Activate a new card             |
| `reportFraud`    | Report a fraudulent transaction |
| `makePayment`    | Initiate credit card payment    |
| `processPayment` | Process payment amount          |
| `viewHours`      | View branch operating hours     |

## Development

### Adding New Features

1. Define action handlers in `lib/agent.ts`
2. Add mock data in `lib/brand/data.ts` if needed
3. Update types in `lib/brand/types.ts`
4. Update router in `router.ts` to handle new actions

## Technologies

- **TypeScript**: Type-safe development
- **Express**: Web framework for webhook handling
- **rcs-js**: Pinnacle RCS SDK v2.0.6+
- **tsx**: TypeScript execution and hot-reload

## Support

For issues related to:

- RCS functionality: Contact Pinnacle support
- Chatbot implementation: Refer to the code documentation
- Configuration: Check the `.env.example` file

## Resources

- **Dashboard**: Visit [Pinnacle Dashboard](https://app.pinnacle.sh)
- **Documentation**: Visit [Pinnacle Documentation](https://docs.pinnacle.sh)
- **Support**: Email [founders@trypinnacle.app](mailto:founders@trypinnacle.app)
