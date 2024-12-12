import React from 'react';
import { ChatMessage } from './ChatMessage';
import { useAutoscroll } from '../hooks/useAutoscroll';
import { Phase } from '../types/chat';

interface ChatContainerProps {
  phase: Phase | undefined;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ phase }) => {
  const chatContainerRef = useAutoscroll<HTMLDivElement>([phase?.messages.length]);

  if (!phase) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Create a new phase to start chatting
      </div>
    );
  }

  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto divide-y">
        {phase.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};