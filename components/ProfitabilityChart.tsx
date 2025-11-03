import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';
import { ProfitData } from '../types';

interface ProfitabilityChartProps {
  data: ProfitData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 rounded-lg border border-slate-600">
        <p className="label text-slate-300">{`${label}`}</p>
        <p className="intro text-emerald-400 font-bold">{`Profit : $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const ProfitabilityChart: React.FC<ProfitabilityChartProps> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50 h-[380px]">
        <h3 className="text-lg font-semibold text-white mb-4">Profit Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
            </defs>
            <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
            />
            <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#34d399" 
                fillOpacity={1} 
                fill="url(#colorProfit)" 
                strokeWidth={2}
            />
        </AreaChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ProfitabilityChart;
