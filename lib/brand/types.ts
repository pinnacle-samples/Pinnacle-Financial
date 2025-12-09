export interface Payment {
  id: string;
  merchant: string;
  amount: string;
  date: string;
  category: string;
  image: string;
}

export interface Statement {
  month: string;
  year: string;
  balance: string;
  transactions: number;
  downloadUrl: string;
}

export interface Location {
  name: string;
  type: 'branch' | 'atm';
  address: string;
  distance: string;
  image: string;
  lat: number;
  lng: number;
}

export interface Card {
  id: string;
  last4: string;
  type: string;
  cardType: 'debit' | 'credit';
  status: 'active' | 'locked' | 'inactive';
  balance: string;
}

import { Request } from 'express';
import { Pinnacle } from 'rcs-js';

export interface TriggerPayload {
  action: string;
  params?: Record<string, unknown>;
}

export interface RequestWithMessageEvent extends Request {
  messageEvent: Pinnacle.MessageEvent;
}
