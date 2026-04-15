import { Payment, Statement, Location, Card } from './types';

export const business = {
  name: 'Pinnacle Financial',
  tagline: 'Banking at the summit.',
  phone: '+18005551234',
  image:
    'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/logo.png',
};

export const recentPayments: Payment[] = [
  {
    id: 'txn_001',
    merchant: 'Whole Foods Market',
    amount: '$87.43',
    date: 'Oct 11, 2025',
    category: 'Groceries',
    image: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/payment-groceries.png',
  },
  {
    id: 'txn_002',
    merchant: 'Shell Gas Station',
    amount: '$52.18',
    date: 'Oct 10, 2025',
    category: 'Gas',
    image: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/payment-gas.png',
  },
  {
    id: 'txn_003',
    merchant: 'Netflix Subscription',
    amount: '$15.99',
    date: 'Oct 9, 2025',
    category: 'Entertainment',
    image: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/payment-streaming.png',
  },
  {
    id: 'txn_004',
    merchant: 'Starbucks Coffee',
    amount: '$6.75',
    date: 'Oct 8, 2025',
    category: 'Dining',
    image: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/payment-coffee.png',
  },
  {
    id: 'txn_005',
    merchant: 'Amazon Purchase',
    amount: '$124.50',
    date: 'Oct 7, 2025',
    category: 'Shopping',
    image: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/payment-shopping.png',
  },
];

export const statements: Statement[] = [
  {
    month: 'September',
    year: '2025',
    balance: '$12,847.35',
    transactions: 15,
    downloadUrl:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/statement-september.png',
  },
  {
    month: 'August',
    year: '2025',
    balance: '$11,923.18',
    transactions: 18,
    downloadUrl:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/statement-august.png',
  },
  {
    month: 'July',
    year: '2025',
    balance: '$13,201.67',
    transactions: 12,
    downloadUrl:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/statement-july.png',
  },
];

export const locations: Location[] = [
  {
    name: 'Pinnacle Financial Downtown Branch',
    type: 'branch',
    address: '123 Main Street, San Francisco, CA 94102',
    distance: '0.3 miles',
    image:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/location-downtown-branch.png',
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    name: 'Union Square ATM',
    type: 'atm',
    address: '456 Market Street, San Francisco, CA 94103',
    distance: '0.5 miles',
    image: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/location-union-square-atm.png',
    lat: 37.7879,
    lng: -122.4074,
  },
  {
    name: 'Pinnacle Financial Center',
    type: 'branch',
    address: '789 Montgomery St, San Francisco, CA 94104',
    distance: '0.8 miles',
    image:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/location-financial-center.png',
    lat: 37.7946,
    lng: -122.402,
  },
  {
    name: 'Ferry Building ATM',
    type: 'atm',
    address: 'One Ferry Building, San Francisco, CA 94111',
    distance: '1.1 miles',
    image:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/location-ferry-building-atm.png',
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

const hoursImg =
  'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/hours-sign.png';

export const hours = [
  {
    day: 'Monday',
    hours: '9:00 AM - 5:00 PM',
    image: hoursImg,
  },
  {
    day: 'Tuesday',
    hours: '9:00 AM - 5:00 PM',
    image: hoursImg,
  },
  {
    day: 'Wednesday',
    hours: '9:00 AM - 5:00 PM',
    image: hoursImg,
  },
  {
    day: 'Thursday',
    hours: '9:00 AM - 5:00 PM',
    image: hoursImg,
  },
  {
    day: 'Friday',
    hours: '9:00 AM - 5:00 PM',
    image: hoursImg,
  },
  {
    day: 'Saturday',
    hours: '9:00 AM - 5:00 PM',
    image: hoursImg,
  },
];
