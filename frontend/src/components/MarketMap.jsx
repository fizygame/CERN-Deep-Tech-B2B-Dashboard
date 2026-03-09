import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, Star, GitBranch, BookOpen, AlertCircle } from 'lucide-react';

const API_URL = "http://localhost:8000/api/v1/market-analysis";

export default function MarketMap() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const TABS = ["Fintech", "MedTech", "IIoT", "Telecom", "Cloud/Exascale"];
    const [activeTab, setActiveTab] = useState("Fintech");

    const TECH_MAPPING = {
        "Fintech": ["hls4ml"],
        "MedTech": ["Geant4", "BioDynaMo", "CAFEIN"],
        "IIoT": ["C2MON", "ROOT"],
        "Telecom": ["White Rabbit"],
        "Cloud/Exascale": ["Rucio"]
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError("Veri çekilemedi. Bağlantıyı kontrol edin.");
            setLoading(false);
        }
    };

    const activeTechs = TECH_MAPPING[activeTab] || [];
    const displayData = data.filter(d => activeTechs.some(t => d.tech_name.toLowerCase() === t.toLowerCase()));

    return (
        <div className="glass-panel p-6 mb-8">
            <div className="flex border-b border-deep-border mb-6 overflow-x-auto">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === tab
                                ? 'text-cern-accent border-b-2 border-cern-accent'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px]">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-24 bg-deep-bg rounded-lg w-full"></div>
                        <div className="h-24 bg-deep-bg rounded-lg w-full"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center p-8 text-red-400 bg-red-900 bg-opacity-20 rounded-lg">
                        <AlertCircle className="mr-2" />
                        <p>{error}</p>
                    </div>
                ) : displayData.length === 0 ? (
                    <div className="flex items-center justify-center p-8 text-gray-500">
                        <p>Bu sektör için canlı veri bekleniyor veya "N/A" durumunda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayData.map((tech, idx) => (
                            <div key={idx} className="bg-deep-bg p-5 rounded-lg border border-deep-border hover:border-cern-blue transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-white">{tech.tech_name}</h3>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cern-blue bg-opacity-20 text-cern-accent font-bold">
                                        T{tech.estimated_trl}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-300">
                                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                        <span>Stars: <span className="font-semibold text-white">{tech.github_stars}</span></span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <GitBranch className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Forks: <span className="font-semibold text-white">{tech.github_forks}</span></span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <BarChart3 className="w-4 h-4 mr-2 text-cern-accent" />
                                        <span>Son 30 Gün Komit: <span className="font-semibold text-white">{tech.commits_last_30_days}</span></span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <BookOpen className="w-4 h-4 mr-2 text-purple-400" />
                                        <span>Yayın İvmesi: <span className="font-semibold text-white">{Object.keys(tech.publications_trend).length > 0 ? 'Mevcut' : 'Yetersiz'}</span></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
