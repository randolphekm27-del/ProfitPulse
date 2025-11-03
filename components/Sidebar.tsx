import React from 'react';
import { ChartPieIcon, Cog6ToothIcon, CommandLineIcon, Squares2X2Icon, WalletIcon } from './icons/Icons';
import { View } from '../App';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
}

const NavLink: React.FC<{
    view: View;
    currentView: View;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ view, currentView, onClick, icon, label }) => {
    const isActive = view === currentView;
    const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer";
    const activeClasses = "bg-emerald-500/10 text-emerald-400 font-semibold";
    const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-white";

    return (
        <a onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {icon}
            {label}
        </a>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 bg-slate-800/50 p-6 hidden md:flex flex-col flex-shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <WalletIcon className="h-8 w-8 text-emerald-400" />
        <h1 className="text-2xl font-bold text-white tracking-tighter">ProfitPulse.ai</h1>
      </div>
      <nav className="flex flex-col gap-2">
         <NavLink 
            view="dashboard" 
            currentView={currentView} 
            onClick={() => setCurrentView('dashboard')} 
            icon={<Squares2X2Icon className="h-5 w-5" />} 
            label="Dashboard" 
        />
        <NavLink 
            view="reports" 
            currentView={currentView} 
            onClick={() => setCurrentView('reports')} 
            icon={<ChartPieIcon className="h-5 w-5" />} 
            label="Reports" 
        />
        <NavLink 
            view="integrations" 
            currentView={currentView} 
            onClick={() => setCurrentView('integrations')} 
            icon={<CommandLineIcon className="h-5 w-5" />} 
            label="Integrations" 
        />
      </nav>
      <div className="mt-auto">
        <NavLink 
            view="settings" 
            currentView={currentView} 
            onClick={() => setCurrentView('settings')} 
            icon={<Cog6ToothIcon className="h-5 w-5" />} 
            label="Settings" 
        />
      </div>
    </aside>
  );
};

export default Sidebar;
