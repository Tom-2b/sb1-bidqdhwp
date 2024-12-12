import { useState } from 'react';
import { parseCommand } from '../lib/commands/parser';
import { CommandProcessor } from '../lib/commands/processor';
import { useChatStore } from '../store/chatStore';
import { logger } from '../utils/logger';

export function useCommandProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentPhaseId, addMessage } = useChatStore();

  const processMessage = async (content: string, role: string) => {
    if (role !== 'moderator') {
      if (content.startsWith('/')) {
        // If non-moderator tries to use a command, send error message
        addMessage(currentPhaseId!, 'Commands can only be used by the moderator.', 'system');
        return false;
      }
      return true;
    }

    const command = parseCommand(content);
    if (!command) return true;

    setIsProcessing(true);
    try {
      logger.debug('Processing command', command);
      const result = await CommandProcessor.processCommand(command);
      
      // Add system message with command result
      addMessage(
        currentPhaseId!,
        result.success ? result.message : `Error: ${result.message}`,
        'system'
      );

      return false; // Don't process as regular message
    } catch (error) {
      logger.error('Command processing error', error);
      addMessage(
        currentPhaseId!,
        'An error occurred while processing the command.',
        'system'
      );
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processMessage,
    isProcessing
  };
}