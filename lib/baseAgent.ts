import { rcsClient } from './rcsClient';
import { PinnacleClient } from 'rcs-js';

if (!process.env.PINNACLE_AGENT_ID) {
  throw new Error('PINNACLE_AGENT_ID environment variable is required');
}

export class BaseAgent {
  protected readonly client: PinnacleClient;
  protected readonly agentName: string;
  protected readonly TEST_MODE: boolean;

  constructor() {
    this.client = rcsClient;
    this.agentName = process.env.PINNACLE_AGENT_ID!;
    this.TEST_MODE = process.env.TEST_MODE === 'true';
  }

  async sendMessage(to: string, text: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text,
      quickReplies: [],
    });
  }

  async sendButtonOnlyMessage(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: 'This agent does not process text messages. Please use the buttons provided to interact.',
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  async sendStrictFormatMessage(to: string, formatInstructions: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: formatInstructions,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }
}
