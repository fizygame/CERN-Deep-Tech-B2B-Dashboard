import httpx

OPENALEX_API_URL = "https://api.openalex.org/works"
QUERIES = [
    "hls4ml AND High Frequency Trading",
    "Geant4 AND radiotherapy"
]

async def fetch_literature_trends():
    results = {}
    async with httpx.AsyncClient() as client:
        for query in QUERIES:
            try:
                # Sadece Open Access, yıllara göre gruplanmış sonuç
                params = {
                    "search": query,
                    "filter": "is_oa:true",
                    "group_by": "publication_year"
                }
                resp = await client.get(OPENALEX_API_URL, params=params)
                
                if resp.status_code in (403, 404) or resp.status_code != 200:
                    results[query] = {"status": "error", "data": None}
                    continue
                
                data = resp.json()
                group_by_data = data.get("group_by", [])
                
                if not group_by_data:
                    results[query] = {"status": "success", "data": "YETERLİ KANIT YOK"}
                    continue
                    
                trend = {str(item["key"]): item["count"] for item in group_by_data}
                
                results[query] = {
                    "status": "success",
                    "data": {
                        "open_access_trend_by_year": trend
                    }
                }
            except Exception:
                results[query] = {"status": "error", "data": None}

    return results
