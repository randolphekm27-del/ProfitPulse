import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+') || !change.startsWith('-');
  const changeColor = isPositive ? 'text-emerald-400' : 'text-red-400';

  return (
    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 flex flex-col justify-between hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <p className="text-slate-400 text-sm">{title}</p>
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <p className={`text-sm font-semibold ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
};

export default MetricCard;
