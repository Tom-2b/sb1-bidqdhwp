export type ParticipantRole = 'user' | 'moderator' | 'ai1' | 'ai2' | 'system' | 'assistant';

export interface Participant {
  id: ParticipantRole;
  name: string;
  avatarColor: string;
}

export interface Message {
  id: string;
  content: string;
  role: ParticipantRole;
  timestamp: number;
}

export interface Phase {
  id: string;
  name: string;
  messages: Message[];
  systemPrompt: string;
}