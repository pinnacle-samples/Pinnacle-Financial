import { Payment, Statement, Location, Card } from './types';

// Image URLs - replace with your own hosted images or set via environment variables
const IMAGES = {
  logo: process.env.BANK_LOGO_URL || 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800',
  statementSept: process.env.STATEMENT_SEPT_URL || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  statementAug: process.env.STATEMENT_AUG_URL || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  statementJuly: process.env.STATEMENT_JULY_URL || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  bankBranch: process.env.BANK_BRANCH_URL || 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800',
  hours: process.env.HOURS_IMAGE_URL || 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800',
  creditCard: process.env.CREDIT_CARD_URL || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  debitCard: process.env.DEBIT_CARD_URL || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
};

export const business = {
  name: 'Pinnacle Bank',
  tagline: 'Banking made simple',
  phone: '+18005551234',
  image: IMAGES.logo,
};

export const recentPayments: Payment[] = [
  {
    id: 'txn_001',
    merchant: 'Whole Foods Market',
    amount: '$87.43',
    date: 'Oct 11, 2025',
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
  },
  {
    id: 'txn_002',
    merchant: 'Shell Gas Station',
    amount: '$52.18',
    date: 'Oct 10, 2025',
    category: 'Gas',
    image: 'https://images.unsplash.com/photo-1545458838-3c0c267f75a7?w=800',
  },
  {
    id: 'txn_003',
    merchant: 'Netflix Subscription',
    amount: '$15.99',
    date: 'Oct 9, 2025',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
  },
  {
    id: 'txn_004',
    merchant: 'Starbucks Coffee',
    amount: '$6.75',
    date: 'Oct 8, 2025',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
  },
  {
    id: 'txn_005',
    merchant: 'Amazon Purchase',
    amount: '$124.50',
    date: 'Oct 7, 2025',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800',
  },
];

export const statements: Statement[] = [
  {
    month: 'September',
    year: '2025',
    balance: '$12,847.35',
    transactions: 15,
    downloadUrl: IMAGES.statementSept,
  },
  {
    month: 'August',
    year: '2025',
    balance: '$11,923.18',
    transactions: 18,
    downloadUrl: IMAGES.statementAug,
  },
  {
    month: 'July',
    year: '2025',
    balance: '$13,201.67',
    transactions: 12,
    downloadUrl: IMAGES.statementJuly,
  },
];

export const locations: Location[] = [
  {
    name: 'PinnacleOne Downtown Branch',
    type: 'branch',
    address: '123 Main Street, San Francisco, CA 94102',
    distance: '0.3 miles',
    image: IMAGES.bankBranch,
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    name: 'Union Square ATM',
    type: 'atm',
    address: '456 Market Street, San Francisco, CA 94103',
    distance: '0.5 miles',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800',
    lat: 37.7879,
    lng: -122.4074,
  },
  {
    name: 'PinnacleOne Financial Center',
    type: 'branch',
    address: '789 Montgomery St, San Francisco, CA 94104',
    distance: '0.8 miles',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    lat: 37.7946,
    lng: -122.402,
  },
  {
    name: 'Ferry Building ATM',
    type: 'atm',
    address: 'One Ferry Building, San Francisco, CA 94111',
    distance: '1.1 miles',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800',
    lat: 37.7955,
    lng: -122.3937,
  },
];

export const cards: Card[] = [
  {
    id: 'card_001',
    last4: '4532',
    type: 'Visa Platinum',
    cardType: 'credit',
    status: 'active',
    balance: '$2,847.50',
  },
  {
    id: 'card_002',
    last4: '8821',
    type: 'Mastercard Gold',
    cardType: 'debit',
    status: 'locked',
    balance: '$12,847.35',
  },
  {
    id: 'card_003',
    last4: '1234',
    type: 'Visa Signature',
    cardType: 'credit',
    status: 'inactive',
    balance: '$0.00',
  },
];

export { IMAGES };

export const hours = [
  {
    day: 'Monday',
    hours: '9:00 AM - 5:00 PM',
    image: IMAGES.hours,
  },
  {
    day: 'Tuesday',
    hours: '9:00 AM - 5:00 PM',
    image: IMAGES.hours,
  },
  {
    day: 'Wednesday',
    hours: '9:00 AM - 5:00 PM',
    image: IMAGES.hours,
  },
  {
    day: 'Thursday',
    hours: '9:00 AM - 5:00 PM',
    image: IMAGES.hours,
  },
  {
    day: 'Friday',
    hours: '9:00 AM - 5:00 PM',
    image: IMAGES.hours,
  },
  {
    day: 'Saturday',
    hours: '9:00 AM - 5:00 PM',
    image: IMAGES.hours,
  },
];
