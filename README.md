# Pinnacle Financial — RCS Banking Services Chatbot

A banking services chatbot that runs over RCS. Customers can view recent payments, manage their cards (lock, unlock, activate, report fraud), pull recent statements, make a payment, view branch hours, and find ATM and branch locations — all from inside the messages app.

> **Live guide:** https://pinnacle.sh/samples/pinnacle-financial

https://github.com/user-attachments/assets/c3974908-d8fe-4091-bbd0-734b2e4985fa

> Note: the visuals in this demo recording have since been refreshed with sharper brand assets. The conversation flow is identical to what you'll get from a fresh clone.

## What's inside

- View account balance, recent payments, and credit/debit cards
- Lock, unlock, activate, and report fraud on cards inline
- Pull recent monthly statements with downloadable PDFs
- Make a payment + transaction history flow
- ATM and branch finder with hours and location cards
- All brand assets (logo, cards, statement PDFs) editable from one file

## Prerequisites

- Node.js 18+
- A Pinnacle account — [sign up](https://app.pinnacle.sh/auth/sign-up)
- An RCS [test agent](https://docs.pinnacle.sh/guides/branded-test-agents) for development
- A Pinnacle [API key](https://app.pinnacle.sh/dashboard/development/api-keys) and [webhook signing secret](https://app.pinnacle.sh/dashboard/development/webhooks)

## Quick start

```bash
git clone https://github.com/pinnacle-samples/Pinnacle-Financial
cd Pinnacle-Financial
npm install
cp .env.example .env
# fill in PINNACLE_API_KEY, PINNACLE_AGENT_ID, PINNACLE_SIGNING_SECRET
npm run dev
```

Expose your webhook with [ngrok](https://ngrok.com):

```bash
ngrok http 3000
```

Then in the [Pinnacle Webhooks dashboard](https://app.pinnacle.sh/dashboard/development/webhooks):

1. Add `https://<your-tunnel-domain>/webhook`
2. Attach it to your RCS agent
3. Copy the signing secret into `PINNACLE_SIGNING_SECRET`

Send `MENU` or `START` to your agent — you'll see the Pinnacle Financial main menu with **My Card**, **Payments**, **Statements**, **Branches & ATMs**, and more.

## Environment variables

```env
PINNACLE_API_KEY=your_pinnacle_api_key_here
PINNACLE_AGENT_ID=your_agent_id_here
PINNACLE_SIGNING_SECRET=your_pinnacle_signing_secret_here
TEST_MODE=false
PORT=3000
```

Brand assets (logo, card images, statement PDFs, branch photos) are all hardcoded in `lib/brand/data.ts`. Edit that file directly to swap in your own URLs.

## Project structure

```
Pinnacle-Financial/
├── server.ts              # Express bootstrap
├── router.ts              # /webhook POST — verifies + dispatches
└── lib/
    ├── rcsClient.ts       # PinnacleClient instance
    ├── baseAgent.ts       # Shared send + typing helpers
    ├── typing.ts          # Fire-and-forget typing indicator
    ├── agent.ts           # Agent — every action handler
    └── brand/
        ├── data.ts        # Business info, payments, statements, locations, cards
        └── types.ts       # Card, Payment, Statement, Location
```

## Action handlers

| Action | What it does |
| --- | --- |
| `showMainMenu` | Landing card with all entry points |
| `viewCard` | Active card carousel |
| `lockCard` / `unlockCard` / `activateCard` | Card state mutations |
| `reportFraud` | Fraud report flow |
| `viewPayments` | Recent transactions |
| `makePayment` / `processPayment` | Bill / transfer payment flow |
| `viewStatements` / `moreStatements` | Statement list with pagination |
| `viewLocations` / `viewHours` | ATM and branch finder + hours |

## Customize the bank brand

Everything brand-specific lives in `lib/brand/data.ts`:

- `business` — bank name, logo, address
- `recentPayments` — seed data for transaction history
- `statements` — monthly statement metadata + PDF URLs
- `locations` — ATMs and branches with hours and lat/lng
- `cards` — credit and debit cards with last-4 and lock state
- `hours` — branch hours image used in the location cards

## Going to production

- **NEVER** transmit real account numbers, balances, or PII without a signed BAA / DPA
- Wire the cards/statements/payments to your core banking platform via authenticated API calls
- Set `TEST_MODE=false` and submit your agent for [carrier approval](https://docs.pinnacle.sh/guides/campaigns/rcs)
- Replace the in-memory state with your real customer database
- Add hard authentication (OTP or biometric step-up) before showing balances

## Resources

- **Live guide:** https://pinnacle.sh/samples/pinnacle-financial
- **Pinnacle docs:** https://docs.pinnacle.sh/documentation/introduction
- **Pinnacle dashboard:** https://app.pinnacle.sh
- **Support:** founders@trypinnacle.app
