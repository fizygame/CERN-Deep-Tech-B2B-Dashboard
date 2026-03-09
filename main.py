from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from api.v1.endpoints import router as api_v1_router
from services.rag_service import init_rag_system

# Rate limiting mekanizması kurulumu
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="CERN HL-LHC Tech Ecosystem API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 404, 403 ve 500 hataları için { "status": "error", "data": null } formatı
@app.exception_handler(404)
async def custom_404_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"status": "error", "data": None}
    )

@app.exception_handler(403)
async def custom_403_handler(request: Request, exc):
    return JSONResponse(
        status_code=403,
        content={"status": "error", "data": None}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={"status": "error", "data": None}
    )

# Başlangıçta RAG sistemini yükle
@app.on_event("startup")
async def startup_event():
    init_rag_system()

app.include_router(api_v1_router, prefix="/api/v1")

# SlowAPI global wrapper kaldırıldı çünkü iç rotaları (openapi/docs) bozuyor. 
# Endpoints içinde özel rate limitler kullanılmalıdır.
