import { create } from 'zustand';
import { SessionState } from '../types/session';
import { logger } from '../utils/logger';

const initialState: SessionState = {
  userName: '',
  decision: {
    text: '',
    optionA: '',
    optionB: '',
  },
  context: [],
  dimensions: [],
};

interface SessionStore extends SessionState {
  setUserName: (name: string) => void;
  setDecision: (text: string, optionA: string, optionB: string) => void;
  setContext: (context: string[]) => void;
  addContext: (item: string) => void;
  removeContext: (item: string) => void;
  setDimensions: (dimensions: string[]) => void;
  addDimension: (dimension: string) => void;
  removeDimension: (dimension: string) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,

  setUserName: (name) => {
    logger.debug('Setting username', { name });
    set({ userName: name });
  },

  setDecision: (text, optionA, optionB) => {
    logger.debug('Setting decision', { text, optionA, optionB });
    set({ decision: { text, optionA, optionB } });
  },

  setContext: (context) => {
    logger.debug('Setting context', { context });
    set({ context });
  },

  addContext: (item) => {
    logger.debug('Adding context item', { item });
    set((state) => ({
      context: [...state.context, item],
    }));
  },

  removeContext: (item) => {
    logger.debug('Removing context item', { item });
    set((state) => ({
      context: state.context.filter((i) => i !== item),
    }));
  },

  setDimensions: (dimensions) => {
    logger.debug('Setting dimensions', { dimensions });
    set({ dimensions });
  },

  addDimension: (dimension) => {
    logger.debug('Adding dimension', { dimension });
    set((state) => ({
      dimensions: [...state.dimensions, dimension],
    }));
  },

  removeDimension: (dimension) => {
    logger.debug('Removing dimension', { dimension });
    set((state) => ({
      dimensions: state.dimensions.filter((d) => d !== dimension),
    }));
  },

  reset: () => {
    logger.debug('Resetting session state');
    set(initialState);
  },
}));