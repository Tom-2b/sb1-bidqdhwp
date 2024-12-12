import React, { useState, useRef, useEffect } from 'react';
import { ParticipantSelector } from './ParticipantSelector';
import { MessageInput } from './MessageInput';
import { SendButton } from './SendButton';
import { useChat } from '../hooks/useChat';
import { useChatStore } from '../store/chatStore';
import { ParticipantRole } from '../types/chat';

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState<ParticipantRole>('user');
  const { currentPhaseId } = useChatStore();
  const { sendMessage, isLoading, error } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentPhaseId || isLoading) return;

    try {
      await sendMessage(message, selectedRole);
      setMessage('');
      if (selectedRole !== 'user') {
        setSelectedRole('user');
      }
    } catch (error) {
      // Error handling is done in useChat
    } finally {
      inputRef.current?.focus();
    }
  };

  const handleRoleChange = (role: ParticipantRole) => {
    setSelectedRole(role);
    inputRef.current?.focus();
  };

  // Focus input on mount and phase change
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentPhaseId]);

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex items-center gap-2 max-w-6xl mx-auto">
        <ParticipantSelector
          value={selectedRole}
          onChange={handleRoleChange}
          disabled={!currentPhaseId || isLoading}
        />
        <div className="flex-1">
          <MessageInput
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!currentPhaseId || isLoading}
            error={error}
            placeholder="Type your message..."
            autoComplete="off"
          />
        </div>
        <SendButton
          disabled={!message.trim() || !currentPhaseId || isLoading}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};