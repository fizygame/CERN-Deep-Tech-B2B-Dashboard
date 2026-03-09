<div align="center">
  <img src="https://img.shields.io/badge/CERN-HL--LHC-blue?style=for-the-badge&logo=cern" alt="CERN HL-LHC" />
  <img src="https://img.shields.io/badge/Status-Beta-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License: MIT" />
</div>

<br />

# 🌌 CERN Deep Tech B2B Dashboard 

> **Açık Kaynak İstihbarat (OSINT) ve Yapay Zeka (RAG) Destekli CERN HL-LHC Teknolojileri Ticari İzleme Paneli.**

Bu proje, CERN'in Yüksek Parlaklıklı Büyük Hadron Çarpıştırıcısı (HL-LHC) kapsamında geliştirilen derin teknolojilerin (Deep Tech) ve bu teknolojiler üzerine kurulan B2B şirketlerin güncel durumlarını analiz etmek, ticari hazır bulunuşluk düzeylerini (TRL - Technology Readiness Level) canlı GitHub istatistikleriyle ölçümlemek için tasarlanmıştır. 

Proje, yatırımcılar (VC) ve teknoloji öncüleri için şık bir "Dark Mode" arayüzü ve yerleşik bir AI (Yapay Zeka) chatbot sunar.

![Dashboard Preview](https://via.placeholder.com/1000x500.png?text=Dashboard+Preview) *(Buraya kendi projenizin ekran görüntüsünü ekleyin)*

---

## 🚀 Özellikler (Features)

1. **Canlı TRL (Teknoloji Hazırlık Seviyesi) Hesaplaması:**
   - **Rucio, hls4ml, Geant4, BioDynaMo, C2MON, ROOT, White Rabbit** ağlarının GitHub repository verilerini (Stars, Forks, Aylık Commits) eşzamanlı çeker.
   - Tüm bu Açık Kaynak verilerini bir araya getirerek matematiksel bir ağırlıklandırma (Weighted Matrix) algoritması ile her bir araç için 1'den 9'a kadar bir ticari **TRL skoru** hesaplar.

2. **CERN Venture Connect (CVC) Sektör Matrisi:**
   - Şirketleri Fintech, MedTech, IIoT, Telecom gibi sektörlere göre izler. **Reshape Systems, TIND, UAP** gibi şirketlerin B2B hedeflerini analiz eder.

3. **Tamamen Lokal Çalışan Yapay Zeka (Local RAG):**
   - Panel içerisindeki AI Bot (Chatbot), CERN analiz raporlarını okuyup anlayacak şekilde LangChain ve açık kaynaklı HuggingFace (`all-MiniLM-L6-v2`) modelleri kullanılarak inşa edilmiştir.
   - Sorduğunuz soruya en yakın bağlam, internette dolaşmadan lokal **ChromaDB** vektör veritabanından getirilir. 100% KVKK ve Güvenlik prensiplerine uyar, **veri sızıntısı yapmaz.**

4. **Sıfır Halüsinasyon (Zero Hallucination) Garantisi:**
   - Sistem bir API'den limit aldığı (Rate limit) takdirde uydurma veri yerleştirmek yerine derhal "YETERLİ KANIT YOK" veya "N/A" ibarelerini yerleştirerek kurumsal doğruluktan (%100 Ground Truth) asla sapmaz.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

### Backend (Data Engine & AI)
- **Python / FastAPI:** Asenkron veri çekme (async/await)
- **LangChain & ChromaDB:** RAG (Retrieval-Augmented Generation)
- **HuggingFace:** Yerel (Local) Sentence-Transformers Embeddings
- **OpenAlex & GitHub API:** Canlı ve limitsiz istihbarat verileri.

### Frontend (UI/UX)
- **React.js & Vite:** Hızlı yapılandırma
- **Tailwind CSS:** Modern 'Glassmorphism' paneller ve B2B Dark Theme.
- **Lucide Icons:** Semantik ikonografiler.

---

## 📦 Kurulum ve Çalıştırma (Get Started)

> **ÖNEMLİ (AI Model Veritabanı İçin):** RAG sisteminin çalışması için projenin ana dizininde `data/` isimli bir klasör oluşturun ve içine **CERN analiz metninizi/raporunuzu** `cern_hl_lhc_report.txt` ismiyle kaydedin. Sistem ilk açılışta o okuyup vektörlere bölecektir.

Kurulum için iki seçeneğiniz vardır: **Docker (Önerilen)** veya **Manuel (Lokal)** kullanım. 

### Seçenek 1: Docker (Tek Tıkla Kurulum)

Makinenizde Docker yüklüyse, Terminal'den proje ana dizinine gelip şu komutu vermeniz yeterlidir:
```bash
docker-compose up --build
```
Sistem, `http://localhost:3000` portundan Frontend'i, `http://localhost:8000` üzerinden API'yi yayına alacaktır.

### Seçenek 2: Manuel Çalıştırma (Geliştiriciler İçin)

#### 1️. Backend'i (API & RAG) Başlatma
Proje kök dizininde bir sanal ortam oluşturup paketleri indirin:
```bash
python -m venv venv
# Ortamı aktifleştirin (Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
```

*(Opsiyonel ama Önerilen)* Proje ana dizininde bir `.env` dosyası açıp `GITHUB_TOKEN=sizin_tokeniniz` eklerseniz, GitHub'ın uyguladığı API limitlerine takılmazsınız.

Sunucuyu başlatın:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
API Dokümantasyonu şu an `http://localhost:8000/docs` adresinde hazır.

#### 2️. Frontend'i (Arayüzü) Başlatma
Yeni bir Terminal penceresi açın ve Frontend klasörüne girin:
```bash
cd frontend
npm install
npm run dev
```
Uygulamayı `http://localhost:3000` adresinde kullanmaya başlayabilirsiniz!

---

## 🪪 Lisans

Bu proje **MIT** lisansı altında dağıtılmaktadır. Kodları tamamen dilediğiniz gibi kullanabilir, değiştirebilir ve kendi ticari projelerinizde (ücretsiz) değerlendirebilirsiniz. Detaylar için `LICENSE` dosyasına göz atın.

💸 **Hiçbir Bulut Bağımlılığı Yoktur:** Analiz ve bot işlemleri HuggingFace üzerinden %100 lokal PC içinde yürütülür, OpenAI veya herhangi bir bulut sistemine ödeme yapmanız gerekmez. Açık veri (Open Data) prensibiyle çalışır.

---
**Geliştirici:** Nuri Demir  
*Data Engineering & Deep Tech OSINT Architecture*
