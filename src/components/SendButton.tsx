import React from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/Button';

interface SendButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ disabled, isLoading }) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      isLoading={isLoading}
      className="flex-shrink-0 w-12 h-10 p-0 flex items-center justify-center"
    >
      <Send className="w-5 h-5" />
    </Button>
  );
};