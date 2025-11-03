import React, { useState, useCallback } from 'react';
import { ChannelPerformance, AiRecommendation } from '../types';
import { geminiService } from '../services/geminiService';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, SparklesIcon, CheckCircleIcon } from './icons/Icons';

interface AiOptimizerProps {
  channelData: ChannelPerformance[];
}

const RecommendationCard: React.FC<{ rec: AiRecommendation, onApply: () => void, applied: boolean }> = ({ rec, onApply, applied }) => {
    const isIncrease = rec.action === 'Increase Budget';
    const Icon = isIncrease ? ArrowUpCircleIcon : ArrowDownCircleIcon;
    const iconColor = isIncrease ? 'text-emerald-400' : 'text-red-400';
    const bgColor = isIncrease ? 'bg-emerald-500/10' : 'bg-red-500/10';

    return (
        <div className={`p-4 rounded-lg ${bgColor} border ${applied ? 'border-emerald-500/50' : 'border-transparent'}`}>
            <div className="flex items-start gap-3">
                <Icon className={`h-6 w-6 ${iconColor} mt-1 flex-shrink-0`} />
                <div>
                    <h4 className="font-bold text-white">{rec.action} on {rec.channel} by {rec.changePercentage}%</h4>
                    <p className="text-sm text-slate-300 mt-1">{rec.reasoning}</p>
                    <p className="text-sm font-semibold text-emerald-400 mt-2">Predicted Profit: <span className="font-bold">{rec.predictedProfitIncrease}</span></p>
                    <div className="mt-3">
                       {applied ? (
                            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                                <CheckCircleIcon className="h-5 w-5" />
                                <span>Applied</span>
                            </div>
                        ) : (
                            <button onClick={onApply} className="text-xs bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors">
                                Apply Suggestion
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AiOptimizer: React.FC<AiOptimizerProps> = ({ channelData }) => {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const [appliedRecs, setAppliedRecs] = useState<number[]>([]);
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAppliedRecs([]);
    try {
      const result = await geminiService.getOptimizationSuggestions(channelData);
      setRecommendations(result);
      setIsAnalyzed(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [channelData]);

  const handleApply = (index: number) => {
    setAppliedRecs(prev => [...prev, index]);
  };

  return (
    <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">AI Budget Optimizer</h3>
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="auto-optimize-toggle" className={`text-xs font-medium cursor-pointer ${autoOptimize ? 'text-emerald-400' : 'text-slate-400'}`}>Auto-Optimize</label>
            <button id="auto-optimize-toggle" onClick={() => setAutoOptimize(!autoOptimize)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoOptimize ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${autoOptimize ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
        </div>
      </div>
      
      {!isAnalyzed ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 mb-4">Get AI-powered recommendations to reallocate your budget for maximum profitability.</p>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Generate Insights'
              )}
            </button>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {recommendations.length > 0 && recommendations.map((rec, index) => (
            <RecommendationCard 
                key={index} 
                rec={rec} 
                onApply={() => handleApply(index)}
                applied={appliedRecs.includes(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AiOptimizer;
