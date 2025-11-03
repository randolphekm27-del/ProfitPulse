export interface ChannelPerformance {
  id: string;
  name: string;
  spend: number;
  revenue: number;
  profit: number;
  roi: number;
  color: string;
}

export interface AiRecommendation {
  channel: string;
  action: 'Increase Budget' | 'Decrease Budget' | 'Maintain Budget';
  changePercentage: number;
  reasoning: string;
  predictedProfitIncrease: string;
}

export interface ProfitData {
  name: string;
  profit: number;
}

export interface ProductPerformance {
  id: string;
  name: string;
  sales: number;
  cost: number;
  margin: number;
  profit: number;
}

export type IntegrationPlatform = 'meta' | 'google' | 'tiktok' | 'linkedin' | 'stripe' | 'shopify' | 'quickbooks';

export interface Integration {
  id: IntegrationPlatform;
  name: string;
  description: string;
  connected: boolean;
  type: 'Marketing' | 'Financial';
}
