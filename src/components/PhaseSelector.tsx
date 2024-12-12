import React from 'react';
import { useChatStore } from '../store/chatStore';

export const PhaseSelector: React.FC = () => {
  const { phases, currentPhaseId } = useChatStore();
  const currentPhase = phases.find(phase => phase.id === currentPhaseId);

  if (!currentPhase) return null;

  return (
    <div className="flex items-center p-4 border-b">
      <h2 className="text-lg font-semibold text-gray-700">
        {currentPhase.name}
      </h2>
    </div>
  );
};