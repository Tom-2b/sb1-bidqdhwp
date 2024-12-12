import React from 'react';
import { PhaseSelector } from './components/PhaseSelector';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SessionProvider } from './components/SessionProvider';
import { MainLayout } from './components/MainLayout';
import { useChatStore } from './store/chatStore';
import { Brain } from 'lucide-react';

export function App() {
  const { phases, currentPhaseId } = useChatStore();
  const currentPhase = phases.find(phase => phase.id === currentPhaseId);

  return (
    <ErrorBoundary>
      <SessionProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-blue-500" />
                <h1 className="text-xl font-bold">twobrains.ai</h1>
              </div>
            </div>
          </header>

          <MainLayout>
            <PhaseSelector />
            <ChatContainer phase={currentPhase} />
            <ChatInput />
          </MainLayout>
        </div>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default App;