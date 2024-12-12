import { ParticipantRole } from './chat';

export interface Participant {
  id: ParticipantRole;
  name: string;
  avatarColor: string;
  icon: 'user' | 'bot' | 'moderator' | 'system';
}