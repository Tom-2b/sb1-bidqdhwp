import React, { forwardRef } from 'react';
import { Input } from './ui/Input';

interface MessageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

export const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
  ({ value, onChange, disabled, error, className = '', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        disabled={disabled}
        error={error || undefined}
        className={className}
        {...props}
      />
    );
  }
);

MessageInput.displayName = 'MessageInput';