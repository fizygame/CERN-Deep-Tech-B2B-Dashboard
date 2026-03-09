import httpx
from datetime import datetime, timedelta
from core.config import settings

GITHUB_API_URL = "https://api.github.com"
REPOS = {
    "Rucio": "rucio/rucio",
    "hls4ml": "fastmachinelearning/hls4ml",
    "BioDynaMo": "BioDynaMo/biodynamo",
    "Geant4": "Geant4/geant4",
    "C2MON": "cern-c2mon/c2mon",
    "ROOT": "root-project/root",
    "White Rabbit": "white-rabbit/white-rabbit"
}

async def fetch_github_metrics():
    headers = {"Accept": "application/vnd.github.v3+json"}
    if settings.GITHUB_TOKEN:
        headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"

    results = {}
    last_month = (datetime.utcnow() - timedelta(days=30)).isoformat()

    async with httpx.AsyncClient(headers=headers) as client:
        for tech_name, repo_path in REPOS.items():
            try:
                repo_resp = await client.get(f"{GITHUB_API_URL}/repos/{repo_path}")
                
                # Rate limit (403) veya bulunamama (404) veya hata
                if repo_resp.status_code in (403, 404) or repo_resp.status_code != 200:
                    results[tech_name] = {"status": "error", "data": None}
                    continue
                
                repo_data = repo_resp.json()
                stars = repo_data.get("stargazers_count", 0)
                forks = repo_data.get("forks_count", 0)

                # Commit aktivitesi
                commits_resp = await client.get(
                    f"{GITHUB_API_URL}/repos/{repo_path}/commits",
                    params={"since": last_month, "per_page": 100}
                )
                
                if commits_resp.status_code == 200:
                    commits_count = len(commits_resp.json())
                else:
                    commits_count = "VERİ BULUNAMADI"

                results[tech_name] = {
                    "status": "success",
                    "data": {
                        "stars": stars,
                        "forks": forks,
                        "commits_last_30_days": commits_count
                    }
                }
            except Exception:
                results[tech_name] = {"status": "error", "data": None}

    return results
