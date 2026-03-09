import React from 'react';
import { Activity, Zap } from 'lucide-react';

export default function Hero() {
    return (
        <div className="glass-panel p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Activity size={120} />
            </div>
            <div className="relative z-10">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cern-accent to-cern-blue mb-2">
                    CERN HL-LHC Run 3 Operasyonel Durum
                </h1>
                <p className="text-gray-400 mb-6 text-lg tracking-wide">
                    B2B Ticari Ekosistem ve Derin Teknoloji Analiz Platformu
                </p>

                <div className="flex gap-6">
                    <div className="bg-deep-bg rounded-lg p-4 border border-deep-border flex-1 flex items-center gap-4">
                        <div className="p-3 bg-cern-blue bg-opacity-20 rounded-full">
                            <Zap className="text-cern-accent" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Çarpışma Enerjisi</p>
                            <p className="text-2xl font-bold text-white">13.6 TeV</p>
                        </div>
                    </div>
                    <div className="bg-deep-bg rounded-lg p-4 border border-deep-border flex-1 flex items-center gap-4">
                        <div className="p-3 bg-cern-blue bg-opacity-20 rounded-full">
                            <Activity className="text-cern-accent" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Veri İşleme Hacmi</p>
                            <p className="text-2xl font-bold text-white">6799 GeV</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
