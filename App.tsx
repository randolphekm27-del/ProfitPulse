import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IntegrationsPage from './components/IntegrationsPage';

export type View = 'dashboard' | 'reports' | 'integrations' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'integrations':
        return <IntegrationsPage />;
      case 'dashboard':
      case 'reports': // Reports will show dashboard for now
      case 'settings': // Settings will show dashboard for now
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
