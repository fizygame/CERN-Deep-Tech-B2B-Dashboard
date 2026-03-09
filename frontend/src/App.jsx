import React from 'react';
import Hero from './components/Hero';
import MarketMap from './components/MarketMap';
import RagChatbot from './components/RagChatbot';
import CvcTable from './components/CvcTable';

function App() {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Phase 4.2: Hero / Header */}
                <Hero />

                {/* Phase 4.2: Market Map (Sektör Matrisi) */}
                <MarketMap />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Phase 4.2: CVC Spin-off Tablosu */}
                    <CvcTable />

                    {/* Phase 4.2: RAG Chatbot Bileşeni */}
                    <RagChatbot />
                </div>
            </div>
        </div>
    );
}

export default App;
