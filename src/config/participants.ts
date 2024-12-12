import { Participant } from '../types/participant';

export const participants: Participant[] = [
  { 
    id: 'user',
    name: 'User',
    avatarColor: 'bg-blue-500',
    icon: 'user'
  },
  { 
    id: 'moderator',
    name: 'Moderator',
    avatarColor: 'bg-purple-500',
    icon: 'moderator'
  },
  { 
    id: 'ai1',
    name: 'AI 1',
    avatarColor: 'bg-green-500',
    icon: 'bot'
  },
  { 
    id: 'ai2',
    name: 'AI 2',
    avatarColor: 'bg-teal-500',
    icon: 'bot'
  },
  { 
    id: 'system',
    name: 'System',
    avatarColor: 'bg-red-500',
    icon: 'system'
  }
];