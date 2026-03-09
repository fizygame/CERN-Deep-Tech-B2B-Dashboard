from pydantic import BaseModel
from typing import Dict, Any, List
from services.github_service import fetch_github_metrics
from services.literature_service import fetch_literature_trends

class MarketAnalysisResponse(BaseModel):
    tech_name: str
    github_stars: int
    github_forks: int
    commits_last_30_days: Any
    publications_trend: Dict[str, int]
    estimated_trl: int

# Adım 3.1: Tahmini TRL (Technology Readiness Level) Hesaplama Fonksiyonu
def calculate_trl(github_data: dict, literature_data: dict) -> int:
    """
    Katsayılar ve Mantık:
    TRL 1-3: Temel araştırma, deneysel kanıt (Github aktivitesi düşük, ancak akademik yayınlar yeni başlıyor)
    TRL 4-6: Prototip ve doğrulama (Düzenli komit aktivitesi, artan akademik kabul ve atıf/yayın)
    TRL 7-9: Gerçek dünya sistemlerinde ispat, ticarileşme. (Yüksek fork/star oranı, çok yoğun komit aktivitesi).
    
    Ağırlıklandırma matrisi:
    - Son 30 gün commit sayısı (0-100+) -> max 3 TRL puanı
    - Akademik yayın ivmesi (Son yıllarda sürekli artış) -> max 3 TRL puanı
    - Reponun genel popülaritesi (Stars > 500, Forks > 100) -> max 3 TRL puanı
    Toplam: 9'a kadar puan (min 1).
    """
    trl = 1
    
    commits = github_data.get("commits_last_30_days", 0)
    stars = github_data.get("stars", 0)
    forks = github_data.get("forks", 0)
    
    # 1. Commit Aktivitesi
    if isinstance(commits, int):
        if commits > 50:
            trl += 3
        elif commits > 15:
            trl += 2
        elif commits > 0:
            trl += 1
            
    # 2. Topluluk ve Popülerlik
    if stars > 1000 and forks > 200:
        trl += 3
    elif stars > 300:
        trl += 2
    elif stars > 50:
        trl += 1

    # 3. Yayın İvmesi (Açık Erişim)
    pub_trend = 0
    if literature_data and isinstance(literature_data, dict):
        total_pubs = sum(literature_data.values())
        if total_pubs > 50:
            pub_trend = 3
        elif total_pubs > 10:
            pub_trend = 2
        elif total_pubs > 0:
            pub_trend = 1
            
    trl += pub_trend
    
    # Sınırlandırma (Max 9, Min 1)
    return max(1, min(9, trl))

async def get_market_analysis() -> List[MarketAnalysisResponse]:
    # Phase 1 verilerini asenkron olarak topla
    github_metrics = await fetch_github_metrics()
    literature_trends = await fetch_literature_trends()
    
    results = []
    
    # GitHub'dan gelen teknolojiler üzerinde döngü kuruyorum
    for tech_name, gh_info in github_metrics.items():
        if gh_info.get("status") != "success":
            continue
            
        gh_data = gh_info.get("data", {})
        
        # Literatur verisini teknoloji adına göre eşleştir (Örnek eşleştirme)
        # Gerçekte literature query'lerinde ismi geçenleri yakalamaya çalışıyoruz.
        lit_data = {}
        for query, lit_info in literature_trends.items():
            if tech_name.lower() in query.lower() and lit_info.get("status") == "success":
                lit_data = lit_info.get("data", {}).get("open_access_trend_by_year", {})
                break
                
        # TRL Hesapla
        trl_score = calculate_trl(gh_data, lit_data)
        
        # Model yapısına uydur
        analysis = MarketAnalysisResponse(
            tech_name=tech_name,
            github_stars=gh_data.get("stars", 0),
            github_forks=gh_data.get("forks", 0),
            commits_last_30_days=gh_data.get("commits_last_30_days", "N/A"),
            publications_trend=lit_data,
            estimated_trl=trl_score
        )
        results.append(analysis)
        
    return results
