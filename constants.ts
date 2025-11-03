import { ChannelPerformance, ProfitData, ProductPerformance, Integration } from './types';

export const MOCK_CHANNEL_DATA: ChannelPerformance[] = [
  {
    id: 'meta',
    name: 'Meta Ads',
    spend: 12000,
    revenue: 45000,
    profit: 15000,
    roi: 1.25,
    color: 'bg-blue-500',
  },
  {
    id: 'google',
    name: 'Google Ads',
    spend: 25000,
    revenue: 70000,
    profit: 22000,
    roi: 0.88,
    color: 'bg-green-500',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    spend: 8000,
    revenue: 32000,
    profit: 16000,
    roi: 2.0,
    color: 'bg-purple-500',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    spend: 5000,
    revenue: 9000,
    profit: -500,
    roi: -0.1,
    color: 'bg-sky-500',
  },
];

export const MOCK_PROFIT_DATA: ProfitData[] = [
  { name: 'Jan', profit: 21000 },
  { name: 'Feb', profit: 25000 },
  { name: 'Mar', profit: 23000 },
  { name: 'Apr', profit: 31000 },
  { name: 'May', profit: 35000 },
  { name: 'Jun', profit: 42000 },
  { name: 'Jul', profit: 40000 },
  { name: 'Aug', profit: 48000 },
];

export const MOCK_PRODUCT_DATA: ProductPerformance[] = [
  { id: 'prod-1', name: 'SaaS Pro Plan', sales: 65000, cost: 5000, margin: 0.92, profit: 60000 },
  { id: 'prod-2', name: 'SaaS Starter Plan', sales: 35000, cost: 3000, margin: 0.91, profit: 32000 },
  { id: 'prod-3', name: 'API Access Key', sales: 18000, cost: 1000, margin: 0.94, profit: 17000 },
  { id: 'prod-4', name: 'One-time Setup Fee', sales: 7000, cost: 2500, margin: 0.64, profit: 4500 },
];

export const MOCK_INTEGRATIONS_DATA: Integration[] = [
    { id: 'meta', name: 'Meta Ads', description: 'Ad spend & conversions', connected: true, type: 'Marketing' },
    { id: 'google', name: 'Google Ads', description: 'Ad spend & conversions', connected: true, type: 'Marketing' },
    { id: 'tiktok', name: 'TikTok Ads', description: 'Ad spend & conversions', connected: true, type: 'Marketing' },
    { id: 'linkedin', name: 'LinkedIn Ads', description: 'Ad spend & conversions', connected: false, type: 'Marketing' },
    { id: 'stripe', name: 'Stripe', description: 'Sales & revenue data', connected: true, type: 'Financial' },
    { id: 'shopify', name: 'Shopify', description: 'Sales & product costs', connected: false, type: 'Financial' },
    { id: 'quickbooks', name: 'QuickBooks', description: 'Expenses & accounting', connected: false, type: 'Financial' },
];
