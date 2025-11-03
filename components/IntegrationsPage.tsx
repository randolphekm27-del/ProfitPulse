import React from 'react';
import Header from './Header';
import { MOCK_INTEGRATIONS_DATA } from '../constants';
import { Integration } from '../types';
import { CheckCircleIcon, PlusCircleIcon } from './icons/Icons';

const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => {
    return (
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 flex items-center justify-between hover:border-slate-600 transition-colors">
            <div>
                <h4 className="text-lg font-bold text-white">{integration.name}</h4>
                <p className="text-sm text-slate-400">{integration.description}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${integration.type === 'Marketing' ? 'bg-sky-500/10 text-sky-400' : 'bg-purple-500/10 text-purple-400'}`}>{integration.type}</span>
            </div>
            {integration.connected ? (
                <button className="flex items-center gap-2 text-emerald-400 font-semibold text-sm cursor-default">
                    <CheckCircleIcon className="h-5 w-5" />
                    Connected
                </button>
            ) : (
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    <PlusCircleIcon className="h-5 w-5" />
                    Connect
                </button>
            )}
        </div>
    );
};


const IntegrationsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Header title="Integrations" subtitle="Connect your marketing and financial platforms."/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_INTEGRATIONS_DATA.map(integration => (
                    <IntegrationCard key={integration.id} integration={integration} />
                ))}
            </div>
        </div>
    );
};

export default IntegrationsPage;
