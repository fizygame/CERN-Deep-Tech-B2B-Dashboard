<div align="center">
  <img src="https://img.shields.io/badge/CERN-HL--LHC-blue?style=for-the-badge&logo=cern" alt="CERN HL-LHC" />
  <img src="https://img.shields.io/badge/Status-Beta-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License: MIT" />
</div>

<br />

# 🌌 CERN Deep Tech B2B Dashboard 

> **An Open Source Intelligence (OSINT) and AI (RAG) Powered Commercial Tracking Dashboard for CERN HL-LHC Technologies.**

This project is designed to analyze the current status of deep technologies developed within the scope of CERN's High-Luminosity Large Hadron Collider (HL-LHC) and the B2B companies founded upon these technologies. It measures their commercial Technology Readiness Levels (TRL) using live GitHub statistics.

The project offers a sleek "Dark Mode" interface and a built-in AI chatbot tailored for Venture Capitalists (VCs) and technology pioneers.



---

## 🚀 Features

1. **Live TRL (Technology Readiness Level) Calculation:**
   - Simultaneously fetches GitHub repository data (Stars, Forks, Monthly Commits) of networks like **Rucio, hls4ml, Geant4, BioDynaMo, C2MON, ROOT, White Rabbit**.
   - Aggregates all this Open Source data using a mathematical Weighted Matrix algorithm to calculate a commercial **TRL score** from 1 to 9 for each tool.

2. **CERN Venture Connect (CVC) Sector Matrix:**
   - Tracks companies across sectors such as Fintech, MedTech, IIoT, and Telecom. Analyzes the B2B targets of companies like **Reshape Systems, TIND, UAP**.

3. **Fully Local Artificial Intelligence (Local RAG):**
   - The AI Bot (Chatbot) within the dashboard is built using LangChain and open-source HuggingFace (`all-MiniLM-L6-v2`) models, specifically tailored to read and comprehend CERN analysis reports.
   - The most relevant context for your queries is retrieved from the local **ChromaDB** vector database without browsing the internet. It complies 100% with GDPR and security principles, ensuring **no data leakage.**

4. **Zero Hallucination Guarantee:**
   - If the system encounters an API limit (Rate limit), rather than inserting fabricated data, it immediately displays "NOT ENOUGH EVIDENCE" or "N/A", never deviating from corporate accuracy (100% Ground Truth).

---

## 🛠️ Tech Stack

### Backend (Data Engine & AI)
- **Python / FastAPI:** Asynchronous data fetching (async/await)
- **LangChain & ChromaDB:** RAG (Retrieval-Augmented Generation)
- **HuggingFace:** Local Sentence-Transformers Embeddings
- **OpenAlex & GitHub API:** Live and unlimited intelligence data.

### Frontend (UI/UX)
- **React.js & Vite:** Rapid configuration
- **Tailwind CSS:** Modern 'Glassmorphism' panels and B2B Dark Theme.
- **Lucide Icons:** Semantic iconography.

---

## 📦 Installation and Setup (Get Started)

> **IMPORTANT (For AI Model Database):** For the RAG system to work, create a folder named `data/` in the project's root directory and save your **CERN analysis text/report** inside it as `cern_hl_lhc_report.txt`. The system will read and split it into vectors upon the first launch.

You have two options for installation: **Docker (Recommended)** or **Manual (Local)** usage.

### Option 1: Docker (One-Click Setup)

If Docker is installed on your machine, simply navigate to the project root directory from your Terminal and run this command:
```bash
docker-compose up --build
```
The system will deploy the Frontend on `http://localhost:3000` and the API on `http://localhost:8000`.

### Option 2: Manual Setup (For Developers)

#### 1️. Starting the Backend (API & RAG)
Create a virtual environment in the project root directory and install the packages:
```bash
python -m venv venv
# Activate the environment (Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
```

*(Optional but Recommended)* If you create a `.env` file in the project root directory and add `GITHUB_TOKEN=your_token_here`, you will circumvent GitHub's API rate limits.

Start the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
API Documentation is currently ready at `http://localhost:8000/docs`.

#### 2️. Starting the Frontend (UI)
Open a new Terminal window and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
You can start using the application at `http://localhost:3000`!

---

## 🪪 License

This project is distributed under the **MIT** license. You can freely use, modify, and incorporate the codes into your own commercial projects (for free) as you wish. Check the `LICENSE` file for details.

💸 **No Cloud Dependency:** Analysis and bot operations are executed 100% locally on your PC via HuggingFace; you do not need to pay OpenAI or any cloud system. It operates on the Open Data principle.

---
**Developer:** Nuri Demir  
*Data Engineering & Deep Tech OSINT Architecture*
