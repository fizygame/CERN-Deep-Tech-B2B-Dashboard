import React, { useState } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function RagChatbot() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Merhaba! CERN HL-LHC B2B Sektör metni ve ekosistem analiz raporu hakkında sorularınızı sorabilirsiniz.' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMsg = { role: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/api/v1/chat', { query: userMsg.text });

            let botText = "Üzgünüm, cevap bulunamadı.";
            if (res.data.status === "success" && res.data.data.retrieved_context) {
                // Retrieve edilen contexti birleştirip bot cevabı olarak sunalım 
                botText = "Bulunan Bağlam:\n" + res.data.data.retrieved_context.join("\n---\n");
            }

            setMessages(prev => [...prev, { role: 'bot', text: botText }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', text: "Hata oluştu. Vektör veritabanı aktif değil." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel flex flex-col h-[500px]">
            <div className="p-4 border-b border-deep-border font-bold text-lg flex items-center">
                <Bot className="mr-2 text-cern-accent" />
                AI Analiz Asistanı (RAG)
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-cern-blue text-white' : 'bg-deep-bg border border-deep-border text-gray-300 whitespace-pre-wrap'
                            }`}>
                            <div className="flex items-center mb-1 space-x-2 text-xs opacity-70">
                                {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                                <span>{m.role === 'user' ? 'Siz' : 'Sistem'}</span>
                            </div>
                            <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-deep-bg border border-deep-border text-gray-400 p-3 rounded-lg">
                            <Loader2 className="animate-spin" size={20} />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-deep-border bg-black bg-opacity-20 flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Örn: CAFEIN hangi hastanelerde kullanılıyor?"
                    className="flex-1 bg-deep-bg border border-deep-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cern-accent text-white"
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-cern-blue text-white p-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
