import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
DATA_FILE = "data/cern_hl_lhc_report.txt"
CHROMA_PERSIST_DIR = "chroma_db"

# Initialize embeddings (Local open source via HuggingFace)
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vector_store = None
qa_chain = None

def init_rag_system():
    global vector_store
    global qa_chain
    
    # 2.2) Vector DB Persistent Initialization
    if os.path.exists(CHROMA_PERSIST_DIR) and os.listdir(CHROMA_PERSIST_DIR):
        print("Mevcut ChromaDB yükleniyor...")
        vector_store = Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=embeddings)
    else:
        print("Yeni vektör veritabanı oluşturuluyor...")
        # 2.1) Text Splitter & Vector DB Creation
        if not os.path.exists(DATA_FILE):
            print(f"Uyarı: {DATA_FILE} bulunamadı. Lütfen analiz raporunu bu konuma yerleştirin.")
            os.makedirs("data", exist_ok=True)
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                f.write("CERN HL-LHC Rapor metni henüz yüklenmedi.\n")
                
        loader = TextLoader(DATA_FILE, encoding="utf-8")
        documents = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = text_splitter.split_documents(documents)
        
        vector_store = Chroma.from_documents(docs, embeddings, persist_directory=CHROMA_PERSIST_DIR)

# 2.3) Arama Fonksiyonu
async def process_chat_query(query: str):
    if vector_store is None:
        return {"status": "error", "message": "Vektör veritabanı başlatılamadı."}
    
    try:
        # Sadece Similarity Search ile vektör veritabanından bağlamı çekmek
        # (Bu aşamada sadece kaynak bulma (retriever) simüle ediliyor veya basit bir QA çalıştırılabilir.
        # Tam LLM üretim pipeline'ı için yerel HuggingFace modelleri oldukça büyüktür,
        # arama fonksiyonu hedeflenen "sadece veriden bilgi çek" (Retrieval) işlemi asıl gösterilendir.)
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})
        relevant_docs = retriever.invoke(query)
        
        contexts = [doc.page_content for doc in relevant_docs]
        
        # Basitçe çekilen bağlamı geri döndür
        return {
            "status": "success",
            "data": {
                "query": query,
                "retrieved_context": contexts
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
