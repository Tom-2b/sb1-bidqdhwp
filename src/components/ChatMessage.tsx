import React from 'react';
import { Message } from '../types/chat';
import { Bot, User, MessageSquare } from 'lucide-react';
import { participants } from '../config/participants';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const participant = participants.find(p => p.id === message.role) || participants[0];
  
  const getIcon = () => {
    switch (message.role) {
      case 'user':
        return <User className="w-5 h-5 text-white" />;
      case 'ai1':
      case 'ai2':
        return <Bot className="w-5 h-5 text-white" />;
      default:
        return <MessageSquare className="w-5 h-5 text-white" />;
    }
  };
  
  return (
    <div className={`flex gap-4 p-4 ${message.role !== 'user' ? 'bg-gray-50' : ''}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 ${participant.avatarColor} rounded-full flex items-center justify-center`}>
          {getIcon()}
        </div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-500 mb-1">
          {participant.name}
        </div>
        <div className="prose max-w-none">
          {message.content}
        </div>
      </div>
    </div>
  );
};