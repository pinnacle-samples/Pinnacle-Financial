import { BaseAgent } from './baseAgent';
import { Pinnacle } from 'rcs-js';
import {
  business,
  recentPayments,
  statements,
  locations,
  cards as defaultCards,
  hours,
} from './brand/data';
import { Card } from './brand/types';

// Reusable quick reply buttons
const MAIN_MENU_BUTTON: Pinnacle.RichButton = {
  type: 'trigger',
  title: '🏠 Main Menu',
  payload: JSON.stringify({ action: 'showMainMenu' }),
};

const MY_CARD_BUTTON: Pinnacle.RichButton = {
  type: 'trigger',
  title: '💳 My Card',
  payload: JSON.stringify({ action: 'viewCard' }),
};

const NEARBY_LOCATION_BUTTON: Pinnacle.RichButton = {
  type: 'requestUserLocation',
  title: 'Nearby ATM/Branch',
};

export class Agent extends BaseAgent {
  private userCards: Map<string, Card[]> = new Map();

  private getUserCards(userId: string): Card[] {
    if (!this.userCards.has(userId)) {
      this.userCards.set(userId, JSON.parse(JSON.stringify(defaultCards)));
    }
    return this.userCards.get(userId)!;
  }

  private getCard(userId: string, cardId: string): Card | undefined {
    return this.getUserCards(userId).find((card) => card.id === cardId);
  }

  private updateCard(userId: string, cardId: string, updates: Partial<Card>): void {
    const card = this.getCard(userId, cardId);
    if (card) Object.assign(card, updates);
  }

  async showMainMenu(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      cards: [
        {
          title: business.name,
          subtitle: business.tagline,
          media: business.image,
          buttons: [],
        },
      ],
      quickReplies: [
        {
          type: 'trigger',
          title: '🧾 Recent Payments',
          payload: JSON.stringify({ action: 'viewPayments' }),
        },
        {
          type: 'trigger',
          title: '📄 View Statements',
          payload: JSON.stringify({ action: 'viewStatements' }),
        },
        MY_CARD_BUTTON,
        NEARBY_LOCATION_BUTTON,
        {
          type: 'trigger',
          title: '🔚 End Demo',
          payload: 'END_DEMO',
        },
      ],
    });
  }

  async viewPayments(to: string) {
    const cards = recentPayments.map((payment) => ({
      title: payment.merchant,
      subtitle: `${payment.amount}\n${payment.date} • ${payment.category}`,
      media: payment.image,
      buttons: [
        {
          type: 'trigger' as const,
          title: '🚨 Report',
          payload: JSON.stringify({
            action: 'reportFraud',
            params: {
              merchant: payment.merchant,
              amount: payment.amount,
            },
          }),
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      cards,
      quickReplies: [
        {
          type: 'trigger',
          title: '📄 View Statements',
          payload: JSON.stringify({ action: 'viewStatements' }),
        },
        MY_CARD_BUTTON,
      ],
    });
  }

  async viewStatements(to: string) {
    const cards = statements.map((statement) => ({
      title: `${statement.month} ${statement.year}`,
      subtitle: `Balance: ${statement.balance}\n${statement.transactions} transactions`,
      media: statement.downloadUrl,
      buttons: [
        {
          type: 'openUrl' as const,
          title: 'View PDF',
          payload: statement.downloadUrl,
          webviewMode: 'FULL' as const,
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      cards,
      quickReplies: [
        {
          type: 'trigger',
          title: '🧾 Recent Payments',
          payload: JSON.stringify({ action: 'viewPayments' }),
        },
        NEARBY_LOCATION_BUTTON,
        {
          type: 'trigger',
          title: '📄 More Statements',
          payload: JSON.stringify({ action: 'moreStatements' }),
        },
        MY_CARD_BUTTON,
      ],
    });
  }

  async viewLocations(to: string) {
    const cards = locations.map((location) => ({
      title: location.name,
      subtitle: `${
        location.type === 'branch' ? '🏦' : '🏧'
      } ${location.type.toUpperCase()}\n${location.address}\n${location.distance} away`,
      media: location.image,
      buttons: [
        {
          type: 'sendLocation' as const,
          title: 'Get Directions',
          payload: location.address,
          latLong: { lat: location.lat, lng: location.lng },
        },
        {
          type: 'trigger' as const,
          title: '🕐 View Hours',
          payload: JSON.stringify({ action: 'viewHours' }),
        },
        {
          type: 'trigger' as const,
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'showMainMenu' }),
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      cards,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'showMainMenu' }),
        },
        {
          type: 'trigger',
          title: '🔚 End Demo',
          payload: 'END_DEMO',
        },
      ],
    });
  }

  async viewCard(to: string) {
    const userCards = this.getUserCards(to);

    const cards = userCards.map((card) => {
      const statusMap = {
        active: {
          emoji: '✅',
          text: 'Active',
          button: { title: '🔒 Lock Card', action: 'lockCard' },
        },
        locked: {
          emoji: '🔒',
          text: 'Locked',
          button: { title: '🔓 Unlock Card', action: 'unlockCard' },
        },
        inactive: {
          emoji: '⚠️',
          text: 'Inactive',
          button: { title: '✅ Activate Card', action: 'activateCard' },
        },
      };

      const status = statusMap[card.status];
      const cardTypeLabel = card.cardType === 'credit' ? 'Credit Card' : 'Debit Card';
      const balanceLabel = card.cardType === 'credit' ? 'Balance Due' : 'Available Balance';
      const cardImage =
        card.cardType === 'credit'
          ? 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/card-credit.png'
          : 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/pinnacle-financial/card-debit.png';

      return {
        title: `${card.type} •••• ${card.last4}`,
        subtitle: `${cardTypeLabel}\n${balanceLabel}: ${card.balance}\n${status.emoji} Status: ${status.text}`,
        media: cardImage,
        buttons: [
          {
            type: 'trigger' as const,
            title: status.button.title,
            payload: JSON.stringify({ action: status.button.action, params: { cardId: card.id } }),
          },
        ],
      };
    });

    const quickReplies: Pinnacle.RichButton[] = [NEARBY_LOCATION_BUTTON, MAIN_MENU_BUTTON];

    if (userCards.some((card) => card.cardType === 'credit' && card.status === 'active')) {
      quickReplies.unshift({
        type: 'trigger',
        title: '💰 Make Payment',
        payload: JSON.stringify({ action: 'makePayment' }),
      });
    }

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      cards,
      quickReplies,
    });
  }

  async lockCard(to: string, cardId: string) {
    const card = this.getCard(to, cardId);
    if (!card) return;

    this.updateCard(to, cardId, { status: 'locked' });

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `🔒 Card Locked Successfully\n\nYour ${card.type} ending in ${card.last4} has been locked.`,
      quickReplies: [
        { type: 'call', title: 'Call Support', payload: '+15125551234' },
        {
          type: 'trigger',
          title: '🔓 Unlock Card',
          payload: JSON.stringify({ action: 'unlockCard', params: { cardId } }),
        },
        MY_CARD_BUTTON,
        NEARBY_LOCATION_BUTTON,
        MAIN_MENU_BUTTON,
      ],
    });
  }

  async unlockCard(to: string, cardId: string) {
    const card = this.getCard(to, cardId);
    if (!card) return;

    this.updateCard(to, cardId, { status: 'active' });

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `✅ Card Unlocked Successfully\n\nYour ${card.type} ending in ${card.last4} is now active.`,
      quickReplies: [MY_CARD_BUTTON, NEARBY_LOCATION_BUTTON, MAIN_MENU_BUTTON],
    });
  }

  async activateCard(to: string, cardId: string) {
    const card = this.getCard(to, cardId);
    if (!card) return;

    this.updateCard(to, cardId, { status: 'active' });

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `✅ Card Activated Successfully\n\nYour ${card.type} ending in ${card.last4} is now active.`,
      quickReplies: [MY_CARD_BUTTON, NEARBY_LOCATION_BUTTON, MAIN_MENU_BUTTON],
    });
  }

  async reportFraud(to: string, merchant?: string, amount?: string) {
    const caseNumber = `FR-${Math.floor(100000 + Math.random() * 900000)}`;
    const transactionDetails = merchant && amount ? `Transaction: ${merchant} - ${amount}\n\n` : '';

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `🚨 Fraud Report Received\n\nCase Number: ${caseNumber}\n${transactionDetails}We take fraud seriously. Our team will investigate this within 5-10 business days. You'll receive an update via text.\n\nIf you need immediate assistance, please visit a nearby branch or call our fraud hotline.`,
      quickReplies: [
        { type: 'call', title: 'Fraud Hotline', payload: '+15125551234' },
        MY_CARD_BUTTON,
        MAIN_MENU_BUTTON,
      ],
    });
  }

  async moreStatements(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `📄 No Additional Statements Available\n\nYou opened your account in September 2025. All available statements have been shown.\n\nIf you need older statements or have questions, please contact customer support or visit a nearby branch.`,
      quickReplies: [
        { type: 'call', title: 'Call Support', payload: '+15125551234' },
        {
          type: 'trigger',
          title: '🧾 Recent Payments',
          payload: JSON.stringify({ action: 'viewPayments' }),
        },
        NEARBY_LOCATION_BUTTON,
        MAIN_MENU_BUTTON,
      ],
    });
  }

  async viewHours(to: string) {
    const cards = hours.map((hour) => ({
      title: hour.day,
      subtitle: hour.hours,
      media: hour.image,
      buttons: [],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      cards,
      quickReplies: [
        {
          type: 'trigger',
          title: '⬅️ Back',
          payload: JSON.stringify({ action: 'viewLocations' }),
        },
        MAIN_MENU_BUTTON,
      ],
    });
  }

  async makePayment(to: string) {
    const userCards = this.getUserCards(to);
    const creditCards = userCards.filter(
      (card) => card.cardType === 'credit' && card.status === 'active',
    );

    if (creditCards.length === 0) {
      return await this.client.messages.rcs.send({
        from: this.agentName,
        to,
        text: "⚠️ No Active Credit Cards\n\nYou don't have any active credit cards available for payment.",
        quickReplies: [MY_CARD_BUTTON, MAIN_MENU_BUTTON],
      });
    }

    const card = creditCards[0];

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `💰 Make a Payment\n\n${card.type} •••• ${card.last4}\nBalance Due: ${card.balance}\n\nChoose a payment option:`,
      quickReplies: [
        {
          type: 'trigger',
          title: '💵 Pay Minimum ($25.00)',
          payload: JSON.stringify({
            action: 'processPayment',
            params: { amount: 'minimum', cardId: card.id },
          }),
        },
        {
          type: 'trigger',
          title: '💳 Pay Full Balance',
          payload: JSON.stringify({
            action: 'processPayment',
            params: { amount: 'full', cardId: card.id },
          }),
        },
        MY_CARD_BUTTON,
        MAIN_MENU_BUTTON,
      ],
    });
  }

  async processPayment(to: string, amount: string, cardId: string) {
    const card = this.getCard(to, cardId);
    if (!card) return;

    const paymentAmount = amount === 'minimum' ? '$25.00' : card.balance;
    const confirmationNumber = `PAY-${Math.floor(100000 + Math.random() * 900000)}`;

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: `✅ Payment Processed\n\nConfirmation: ${confirmationNumber}\nAmount: ${paymentAmount}\nCard: ${card.type} •••• ${card.last4}\n\nYour payment will be processed within 1-2 business days. You'll receive a confirmation email shortly.`,
      quickReplies: [
        {
          type: 'trigger',
          title: '🧾 View Payments',
          payload: JSON.stringify({ action: 'viewPayments' }),
        },
        MY_CARD_BUTTON,
        MAIN_MENU_BUTTON,
      ],
    });
  }
}

export const agent = new Agent();
