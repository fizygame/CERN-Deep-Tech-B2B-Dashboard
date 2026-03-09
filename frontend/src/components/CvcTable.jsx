import React from 'react';
import { Target, TrendingUp, CheckCircle2 } from 'lucide-react';

const COMPANIES = [
    {
        name: "Reshape Systems",
        sector: "Sanayi/Endüstri 4.0",
        techBase: "CERN HL-LHC",
        goal: "B2B Endüstriyel Verimlilik",
        status: "Aktif",
        badgeColor: "bg-green-500/20 text-green-400"
    },
    {
        name: "TIND",
        sector: "Bilgi Yönetimi",
        techBase: "Invenio (CERN)",
        goal: "Kurumsal Kütüphane Yzg.",
        status: "Scale-up",
        badgeColor: "bg-blue-500/20 text-blue-400"
    },
    {
        name: "UAP",
        sector: "Havacılık / Uzay",
        techBase: "Simülasyon / Sensörler",
        goal: "Radyasyon Test Sistemleri",
        status: "Ar-Ge Aşamasında",
        badgeColor: "bg-purple-500/20 text-purple-400"
    }
];

export default function CvcTable() {
    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center text-white">
                        <Target className="mr-2 text-cern-accent" />
                        CERN Venture Connect (CVC) Spin-off'ları
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Ticari ekosistemdeki derin teknoloji firmaları</p>
                </div>
                <div className="bg-cern-blue/20 p-2 rounded-lg">
                    <TrendingUp className="text-cern-accent" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-deep-bg/50 border-b border-deep-border">
                        <tr>
                            <th className="px-6 py-4">Şirket</th>
                            <th className="px-6 py-4">Sektör</th>
                            <th className="px-6 py-4">Hedef (B2B)</th>
                            <th className="px-6 py-4">Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {COMPANIES.map((company, index) => (
                            <tr key={index} className="border-b border-deep-border/50 hover:bg-deep-border/20 transition-colors">
                                <td className="px-6 py-4 font-semibold text-white">
                                    {company.name}
                                    <div className="font-normal text-xs text-gray-500 mt-1">{company.techBase}</div>
                                </td>
                                <td className="px-6 py-4">{company.sector}</td>
                                <td className="px-6 py-4">{company.goal}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center w-max ${company.badgeColor}`}>
                                        <CheckCircle2 size={12} className="mr-1" />
                                        {company.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
