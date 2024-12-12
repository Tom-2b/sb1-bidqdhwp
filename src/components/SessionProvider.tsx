import React, { useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { useChatStore } from '../store/chatStore';

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const { userName } = useSessionStore();
  const { phases, currentPhaseId } = useChatStore();

  // Update system prompt with session context when phase changes
  useEffect(() => {
    if (currentPhaseId && userName) {
      const currentPhase = phases.find((p) => p.id === currentPhaseId);
      if (currentPhase) {
        // Update system prompt with user context
        const updatedPrompt = `${currentPhase.systemPrompt}\n\nCurrent user: ${userName}`;
        // TODO: Implement system prompt update logic
      }
    }
  }, [currentPhaseId, userName, phases]);

  return <>{children}</>;
}