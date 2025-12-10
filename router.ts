import { Router, Request, Response } from 'express';
import { TriggerPayload } from './lib/brand/types';
import { agent } from './lib/agent';
import { rcsClient } from './lib/rcsClient';

const pinnacleOneRouter = Router();

pinnacleOneRouter.post('/', async (req: Request, res: Response) => {
  try {
    const messageEvent = await rcsClient.messages.process(req);
    if (!('message' in messageEvent)) {
      return res.status(200).json({ message: 'No message found' });
    }
    const message = messageEvent.message;
    const from = messageEvent.conversation.from;

    // Handle button actions
    if (
      message.type === 'RCS_BUTTON_DATA' &&
      typeof message.button.raw === 'object' &&
      message.button.raw.type == 'trigger'
    ) {
      const payload: TriggerPayload = JSON.parse(message.button.raw.payload);

      switch (payload.action) {
        case 'viewPayments':
          await agent.viewPayments(from);
          return res.status(200).json({ message: 'Payments sent' });

        case 'viewStatements':
          await agent.viewStatements(from);
          return res.status(200).json({ message: 'Statements sent' });

        case 'viewLocations':
          await agent.viewLocations(from);
          return res.status(200).json({ message: 'Locations sent' });

        case 'viewCard':
          await agent.viewCard(from);
          return res.status(200).json({ message: 'Card sent' });

        case 'lockCard':
          if (!payload.params?.cardId) {
            console.error('[PinnacleOne]: Missing cardId', payload);
            return res.status(400).json({ error: 'Missing cardId' });
          }
          await agent.lockCard(from, payload.params.cardId as string);
          return res.status(200).json({ message: 'Card locked' });

        case 'unlockCard':
          if (!payload.params?.cardId) {
            console.error('[PinnacleOne]: Missing cardId', payload);
            return res.status(400).json({ error: 'Missing cardId' });
          }
          await agent.unlockCard(from, payload.params.cardId as string);
          return res.status(200).json({ message: 'Card unlocked' });

        case 'activateCard':
          if (!payload.params?.cardId) {
            console.error('[PinnacleOne]: Missing cardId', payload);
            return res.status(400).json({ error: 'Missing cardId' });
          }
          await agent.activateCard(from, payload.params.cardId as string);
          return res.status(200).json({ message: 'Card activated' });

        case 'showMainMenu':
          await agent.showMainMenu(from);
          return res.status(200).json({ message: 'Main menu sent' });

        case 'viewHours':
          await agent.viewHours(from);
          return res.status(200).json({ message: 'Hours sent' });

        case 'moreStatements':
          await agent.moreStatements(from);
          return res.status(200).json({ message: 'More statements message sent' });

        case 'reportFraud':
          await agent.reportFraud(
            from,
            payload.params?.merchant as string,
            payload.params?.amount as string,
          );
          return res.status(200).json({ message: 'Fraud report sent' });

        case 'makePayment':
          await agent.makePayment(from);
          return res.status(200).json({ message: 'Payment options sent' });

        case 'processPayment':
          if (!payload.params?.amount || !payload.params?.cardId) {
            console.error('[PinnacleOne]: Missing payment params', payload);
            return res.status(400).json({ error: 'Missing payment parameters' });
          }
          await agent.processPayment(
            from,
            payload.params.amount as string,
            payload.params.cardId as string,
          );
          return res.status(200).json({ message: 'Payment processed' });

        default:
          console.error('[PinnacleOne]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message,
          });
      }
    }

    // Handle location messages
    if (message.type === 'RCS_LOCATION_DATA') {
      return await agent.viewLocations(from);
    }

    // Handle text messages
    if (message.type === 'RCS_TEXT') {
      const text = message.text.trim();

      if (text === 'START' || text === 'SUBSCRIBE' || text === 'MENU') {
        await agent.showMainMenu(from);
        return res.status(200).json({ message: 'Main menu sent' });
      }

      // Notify user that text messages are not processed
      await agent.sendButtonOnlyMessage(from);
      return res.status(200).json({ message: 'Text message skipped, sent notice to user.' });
    }

    // Message or event was not captured by handler
    return res.status(200).json({
      message: 'Unhandled message type',
    });
  } catch (error) {
    console.error('[PinnacleOne]: Internal server error', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default pinnacleOneRouter;
