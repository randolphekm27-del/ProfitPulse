import React from 'react';
import Header from './Header';
import MetricCard from './MetricCard';
import ProfitabilityChart from './ProfitabilityChart';
import ChannelPerformanceTable from './ChannelPerformanceTable';
import AiOptimizer from './AiOptimizer';
import ProductPerformanceTable from './ProductPerformanceTable';
import { MOCK_CHANNEL_DATA, MOCK_PROFIT_DATA, MOCK_PRODUCT_DATA } from '../constants';
import { BanknotesIcon, ChartBarIcon, ScaleIcon, SparklesIcon } from './icons/Icons';

const Dashboard: React.FC = () => {
  const totalProfit = MOCK_CHANNEL_DATA.reduce((sum, channel) => sum + channel.profit, 0);
  const totalSpend = MOCK_CHANNEL_DATA.reduce((sum, channel) => sum + channel.spend, 0);
  const totalRevenue = MOCK_CHANNEL_DATA.reduce((sum, channel) => sum + channel.revenue, 0);
  const netROI = totalSpend > 0 ? (totalProfit / totalSpend) * 100 : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Profitability Dashboard" subtitle="Welcome back, here's your real-time profitability overview." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Total Net Profit" 
          value={`$${totalProfit.toLocaleString()}`} 
          change="+15.2%" 
          icon={<BanknotesIcon className="h-7 w-7 text-emerald-400" />} />
        <MetricCard 
          title="Net ROI" 
          value={`${netROI.toFixed(1)}%`} 
          change="+3.1%" 
          icon={<ScaleIcon className="h-7 w-7 text-sky-400" />} />
        <MetricCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          change="+18.9%"
          icon={<ChartBarIcon className="h-7 w-7 text-amber-400" />} />
        <MetricCard 
          title="AI Suggestions" 
          value="3 Active" 
          change="New"
          icon={<SparklesIcon className="h-7 w-7 text-purple-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <ProfitabilityChart data={MOCK_PROFIT_DATA} />
        </div>
        <div className="lg:col-span-1">
          <AiOptimizer channelData={MOCK_CHANNEL_DATA} />
        </div>
        <div className="lg:col-span-3">
          <ChannelPerformanceTable data={MOCK_CHANNEL_DATA} />
        </div>
        <div className="lg:col-span-3">
          <ProductPerformanceTable data={MOCK_PRODUCT_DATA} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
