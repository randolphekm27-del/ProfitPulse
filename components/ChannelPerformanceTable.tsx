import React from 'react';
import { ChannelPerformance } from '../types';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from './icons/Icons';

interface ChannelPerformanceTableProps {
  data: ChannelPerformance[];
}

const ChannelPerformanceTable: React.FC<ChannelPerformanceTableProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Channel Performance</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-700 text-sm text-slate-400">
            <tr>
              <th className="p-3">Channel</th>
              <th className="p-3 text-right">Spend</th>
              <th className="p-3 text-right">Revenue</th>
              <th className="p-3 text-right">Profit</th>
              <th className="p-3 text-right">Net ROI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((channel) => (
              <tr key={channel.id} className="border-b border-slate-800 hover:bg-slate-700/50 transition-colors">
                <td className="p-3 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${channel.color}`}></span>
                    {channel.name}
                  </div>
                </td>
                <td className="p-3 text-right text-slate-300">{formatCurrency(channel.spend)}</td>
                <td className="p-3 text-right text-slate-300">{formatCurrency(channel.revenue)}</td>
                <td className={`p-3 text-right font-semibold ${channel.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatCurrency(channel.profit)}
                </td>
                <td className="p-3 text-right">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    channel.roi >= 1 ? 'bg-emerald-500/10 text-emerald-400' : 
                    channel.roi > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {channel.roi >= 0 ? 
                      <ArrowTrendingUpIcon className="h-3 w-3" /> : 
                      <ArrowTrendingDownIcon className="h-3 w-3" />
                    }
                    {channel.roi.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChannelPerformanceTable;
