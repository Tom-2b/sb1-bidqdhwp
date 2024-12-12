import { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { createChatCompletion } from '../lib/openai';
import { ParticipantRole } from '../types/chat';
import { logger } from '../utils/logger';
import { useCommandProcessor } from './useCommandProcessor';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentPhaseId, addMessage, phases } = useChatStore();
  const { processMessage, isProcessing } = useCommandProcessor();

  const sendMessage = async (content: string, role: ParticipantRole = 'user') => {
    if (!currentPhaseId || !content.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      logger.debug('Sending message', { role, content });
      
      // Process commands first
      const shouldContinue = await processMessage(content, role);
      if (!shouldContinue) {
        setIsLoading(false);
        return;
      }

      // Add the original message
      addMessage(currentPhaseId, content.trim(), role);
      logger.message(role, content.trim());

      const currentPhase = phases.find(p => p.id === currentPhaseId);
      if (!currentPhase) throw new Error('Phase not found');

      // Get moderator response for all messages except from the moderator
      if (role !== 'moderator') {
        const moderatorResponse = await createChatCompletion(currentPhase, content);
        if (moderatorResponse) {
          addMessage(currentPhaseId, moderatorResponse, 'moderator');
          logger.message('moderator', moderatorResponse);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      logger.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading: isLoading || isProcessing,
    error,
  };
}