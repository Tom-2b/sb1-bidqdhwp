import { config } from '../config/env';
import { Phase, Message, ParticipantRole } from '../types/chat';
import { logger } from '../utils/logger';

export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Map our custom roles to OpenAI's supported roles
function mapRoleToOpenAI(role: ParticipantRole): 'system' | 'user' | 'assistant' {
  switch (role) {
    case 'system':
      return 'system';
    case 'moderator':
    case 'ai1':
    case 'ai2':
      return 'assistant';
    case 'user':
    default:
      return 'user';
  }
}

function formatMessages(phase: Phase, message: string): ChatMessage[] {
  const messages: ChatMessage[] = [
    { role: 'system', content: phase.systemPrompt }
  ];

  // Add context from previous messages
  phase.messages.forEach(msg => {
    messages.push({
      role: mapRoleToOpenAI(msg.role),
      content: `${msg.role.toUpperCase()}: ${msg.content}`
    });
  });

  // Add the current message
  messages.push({ role: 'user', content: message });

  return messages;
}

export async function createChatCompletion(phase: Phase, message: string): Promise<string | null> {
  if (!config.openai.apiKey) {
    logger.error('OpenAI API key is not configured');
    throw new OpenAIError('OpenAI API key is not configured');
  }

  try {
    logger.debug('Making OpenAI API request', {
      model: config.openai.model || 'gpt-3.5-turbo',
      messageCount: phase.messages.length + 1
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: config.openai.model || 'gpt-3.5-turbo',
        messages: formatMessages(phase, message),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      logger.error(`OpenAI API error: ${error.error?.message}`);
      throw new OpenAIError(error.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || null;
    
    logger.debug('OpenAI API response received', { content });
    return content;
  } catch (error) {
    if (error instanceof OpenAIError) throw error;
    logger.error('Failed to communicate with OpenAI');
    throw new OpenAIError('Failed to communicate with OpenAI');
  }
}