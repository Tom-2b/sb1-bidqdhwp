import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSession } from '../hooks/useSession';

interface DecisionPaneProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const DecisionPane: React.FC<DecisionPaneProps> = ({ isCollapsed, onToggle }) => {
  const { userName, decision, context, dimensions } = useSession();

  return (
    <div className={`bg-white border-r border-gray-300 relative transition-all duration-300 ${
      isCollapsed ? 'w-0' : 'w-80'
    }`}>
      <button
        onClick={onToggle}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow-sm hover:bg-gray-50 z-10"
        aria-label={isCollapsed ? 'Expand decision pane' : 'Collapse decision pane'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className={`overflow-hidden ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Decision Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">User Name</h3>
              <p className="text-gray-900">{userName || 'undefined'}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Decision</h3>
              <div className="space-y-2">
                <p className="text-gray-900">{decision.text || 'undefined'}</p>
                <div className="pl-4">
                  <p className="text-gray-700">A: {decision.optionA || 'undefined'}</p>
                  <p className="text-gray-700">B: {decision.optionB || 'undefined'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Context</h3>
              {context.length > 0 ? (
                <ul className="list-disc pl-4 text-gray-900">
                  {context.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-900">undefined</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Dimensions</h3>
              {dimensions.length > 0 ? (
                <ul className="list-disc pl-4 text-gray-900">
                  {dimensions.map((dimension, index) => (
                    <li key={index}>{dimension}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-900">undefined</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};