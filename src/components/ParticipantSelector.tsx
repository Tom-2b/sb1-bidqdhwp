import React from 'react';
import { Select } from './ui/Select';
import { participants } from '../config/participants';
import { ParticipantRole } from '../types/chat';

interface ParticipantSelectorProps {
  value: ParticipantRole;
  onChange: (role: ParticipantRole) => void;
  disabled?: boolean;
}

export const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  value,
  onChange,
  disabled
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ParticipantRole);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={participants.map(p => ({ value: p.id, label: p.name }))}
      disabled={disabled}
      className="w-36"
    />
  );
};