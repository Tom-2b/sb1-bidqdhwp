import { Phase, Message, ParticipantRole } from '../types/chat';

const COLORS = {
  user: '#3B82F6',      // blue
  moderator: '#8B5CF6', // purple
  ai1: '#10B981',       // green
  ai2: '#14B8A6',       // teal
  system: '#EF4444',    // red
  debug: '#6B7280',     // gray
  error: '#DC2626',     // red
};

export const logger = {
  message: (role: ParticipantRole, content: string) => {
    console.log(
      `%c${role.toUpperCase()}%c ${content}`,
      `background: ${COLORS[role]}; color: white; padding: 2px 4px; border-radius: 4px; font-weight: bold;`,
      'color: inherit;'
    );
  },

  phase: (phase: Phase) => {
    console.group(`%cPhase: ${phase.name}`, 'font-weight: bold;');
    console.log('ID:', phase.id);
    console.log('System Prompt:', phase.systemPrompt);
    console.log('Messages:', phase.messages);
    console.groupEnd();
  },

  error: (error: Error | string) => {
    console.error(
      `%cERROR%c ${error instanceof Error ? error.message : error}`,
      `background: ${COLORS.error}; color: white; padding: 2px 4px; border-radius: 4px; font-weight: bold;`,
      'color: inherit;'
    );
  },

  debug: (label: string, data?: any) => {
    console.log(
      `%cDEBUG%c ${label}`,
      `background: ${COLORS.debug}; color: white; padding: 2px 4px; border-radius: 4px; font-weight: bold;`,
      'color: inherit;',
      data
    );
  }
};