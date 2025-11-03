import React from 'react';
import { ChevronDownIcon, BellIcon, ArrowDownTrayIcon } from './icons/Icons';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-slate-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-slate-700">
          <span>Last 30 days</span>
          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
        </div>
        <button className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors" aria-label="Export data">
            <ArrowDownTrayIcon className="h-5 w-5 text-slate-300" />
        </button>
        <button className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors relative" aria-label="View notifications">
            <BellIcon className="h-5 w-5 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-800/80"></span>
        </button>
        <img
          src="https://picsum.photos/seed/user/40/40"
          alt="User Avatar"
          className="h-10 w-10 rounded-full border-2 border-slate-700"
        />
      </div>
    </header>
  );
};

export default Header;
