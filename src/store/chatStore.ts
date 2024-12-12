import { create } from 'zustand';
import { Message, Phase, ParticipantRole } from '../types/chat';
import { logger } from '../utils/logger';

const DEFAULT_PHASE: Phase = {
  id: crypto.randomUUID(),
  name: 'Phase 1',
  systemPrompt: `You are a moderator in a multi-agent conversation. 
The conversation includes multiple participants:
- User: The human user
- Moderator: An AI moderator (you)
- AI1: First AI assistant
- AI2: Second AI assistant
- System: System messages

Your role is to:
1. Facilitate discussion between all participants
2. Provide brief, relevant responses to each message from any participant
3. Keep the conversation focused and productive
4. Maintain a professional and helpful tone
5. Respond to both human and AI participants equally
6. Help bridge understanding between different AI perspectives when AI1 and AI2 contribute

Remember to:
- Acknowledge and engage with AI1 and AI2's contributions
- Help synthesize different viewpoints
- Keep the conversation balanced between all participants

Respond naturally and professionally while staying in character as the moderator.`,
  messages: []
};

interface ChatState {
  phases: Phase[];
  currentPhaseId: string | null;
  addMessage: (phaseId: string, content: string, role: ParticipantRole) => void;
  setCurrentPhase: (phaseId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  phases: [DEFAULT_PHASE],
  currentPhaseId: DEFAULT_PHASE.id,
  
  addMessage: (phaseId, content, role) => {
    logger.debug('Adding message', { phaseId, role, content });
    set((state) => ({
      phases: state.phases.map(phase => 
        phase.id === phaseId
          ? {
              ...phase,
              messages: [...phase.messages, {
                id: crypto.randomUUID(),
                content,
                role,
                timestamp: Date.now()
              }]
            }
          : phase
      )
    }));
  },

  setCurrentPhase: (phaseId) => {
    logger.debug('Setting current phase', phaseId);
    const phase = get().phases.find(p => p.id === phaseId);
    if (phase) {
      set({ currentPhaseId: phaseId });
      logger.phase(phase);
    }
  }
}));