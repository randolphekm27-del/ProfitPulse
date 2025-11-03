import { GoogleGenAI, Type } from '@google/genai';
import { ChannelPerformance, AiRecommendation } from '../types';

const getGeminiService = () => {
  if (!process.env.API_KEY) {
    // This is a fallback for environments where the key might not be set.
    // In the target runtime, process.env.API_KEY is expected to be available.
    console.warn("API_KEY environment variable not set.");
    // A mock implementation to allow UI development without a real key
    return {
      getOptimizationSuggestions: async (data: ChannelPerformance[]): Promise<AiRecommendation[]> => {
        console.log("Using mocked Gemini service. Data received:", data);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        return [
          {
            channel: 'TikTok Ads',
            action: 'Increase Budget',
            changePercentage: 25,
            reasoning: 'This channel has the highest ROI (2.0) and is highly profitable. Increasing the budget is likely to scale profits efficiently.',
            predictedProfitIncrease: '+$4,000'
          },
          {
            channel: 'LinkedIn Ads',
            action: 'Decrease Budget',
            changePercentage: 75,
            reasoning: 'This channel is currently unprofitable with a negative ROI (-0.1). The budget should be significantly reduced or cut entirely to stop cash burn.',
            predictedProfitIncrease: '+$375 (by reducing loss)'
          },
           {
            channel: 'Google Ads',
            action: 'Decrease Budget',
            changePercentage: 10,
            reasoning: 'While profitable, the ROI is below the target of 1.0. A slight budget reduction can free up capital for higher-performing channels like TikTok.',
            predictedProfitIncrease: '+$1,000 (reallocated)'
          },
        ];
      }
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const getOptimizationSuggestions = async (data: ChannelPerformance[]): Promise<AiRecommendation[]> => {
    const dataString = JSON.stringify(data.map(d => ({
        name: d.name,
        spend: d.spend,
        profit: d.profit,
        roi: d.roi
    })), null, 2);

    const prompt = `
      You are an expert marketing financial analyst for a SaaS called ProfitPulse.ai.
      Your task is to analyze marketing channel performance data and provide actionable budget optimization recommendations to increase overall net profit.

      Analyze the following marketing channel data:
      ${dataString}

      Based on this data, provide a list of recommendations. For each recommendation, specify the channel, the action to take (Increase Budget, Decrease Budget, or Maintain Budget), the percentage change you recommend, a clear reasoning based on the data (especially ROI and profit), and the predicted monthly profit increase from this action.

      Return the recommendations in a valid JSON array format. Do not include any other text or markdown formatting in your response.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            channel: {
                                type: Type.STRING,
                                description: 'The marketing channel to which the recommendation applies.',
                            },
                            action: {
                                type: Type.STRING,
                                description: 'The suggested action: "Increase Budget", "Decrease Budget", or "Maintain Budget".',
                            },
                            changePercentage: {
                                type: Type.NUMBER,
                                description: 'The recommended budget change in percentage (e.g., 20 for 20%).'
                            },
                            reasoning: {
                                type: Type.STRING,
                                description: 'A clear, data-driven explanation for the recommendation.',
                            },
                            predictedProfitIncrease: {
                                type: Type.STRING,
                                description: 'The estimated increase in monthly profit, formatted as a string (e.g., "+$5,000").'
                            }
                        },
                        required: ["channel", "action", "changePercentage", "reasoning", "predictedProfitIncrease"],
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const recommendations = JSON.parse(jsonText);
        return recommendations as AiRecommendation[];

    } catch (error) {
        console.error("Error fetching AI recommendations:", error);
        throw new Error("Failed to get insights from AI. Please try again.");
    }
  };
  
  return { getOptimizationSuggestions };
};

export const geminiService = getGeminiService();
