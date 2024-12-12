import React, { useState } from 'react';
import { DecisionPane } from './DecisionPane';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDecisionPaneCollapsed, setIsDecisionPaneCollapsed] = useState(false);

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto px-4">
      <div className="bg-white shadow-sm rounded-lg my-8 flex h-[calc(100vh-8rem)] divide-x divide-gray-300">
        <DecisionPane
          isCollapsed={isDecisionPaneCollapsed}
          onToggle={() => setIsDecisionPaneCollapsed(!isDecisionPaneCollapsed)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
};