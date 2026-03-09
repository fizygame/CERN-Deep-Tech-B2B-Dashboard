from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.github_service import fetch_github_metrics
from services.literature_service import fetch_literature_trends
from services.rag_service import process_chat_query
from services.market_analysis_service import get_market_analysis, MarketAnalysisResponse
from typing import List

router = APIRouter()

class ChatQuery(BaseModel):
    query: str

@router.get("/tech-metrics")
async def get_tech_metrics(request: Request):
    try:
        data = await fetch_github_metrics()
        return data
    except Exception:
        return {"status": "error", "data": None}

@router.get("/literature-trends")
async def get_literature_trends(request: Request):
    try:
        data = await fetch_literature_trends()
        return data
    except Exception:
        return {"status": "error", "data": None}

@router.post("/chat")
async def chat_with_rag(request: Request, body: ChatQuery):
    try:
        response = await process_chat_query(body.query)
        if response.get("status") == "error":
            return {"status": "error", "data": None}
        return response
    except Exception:
        return {"status": "error", "data": None}

@router.get("/market-analysis", response_model=List[MarketAnalysisResponse])
async def market_analysis_endpoint(request: Request):
    try:
        data = await get_market_analysis()
        return data
    except Exception:
        # Hata durumunda model bozulmaması için boş liste döndür veya Pydantic'e uygun response at.
        # Guardrail'da istenen: sahte veri dönme, hata formatında json dön
        # Ancak response model List[MarketAnalysisResponse] olduğu için FastAPI 500 fırlatabilir.
        # İstek handler sayesinde formatlanacaktır.
        raise Exception("Veri analiz edilemedi")
