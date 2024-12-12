import { useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { logger } from '../utils/logger';

export function useSession() {
  const {
    userName,
    decision,
    context,
    dimensions,
    setUserName,
    setDecision,
    setContext,
    setDimensions,
    reset,
  } = useSessionStore();

  // Initialize session on mount
  useEffect(() => {
    if (!userName) {
      logger.debug('Initializing session');
      reset();
    }
  }, [userName, reset]);

  return {
    userName,
    decision,
    context,
    dimensions,
    setUserName,
    setDecision,
    setContext,
    setDimensions,
    reset,
  };
}