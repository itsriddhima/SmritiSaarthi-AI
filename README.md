# SmritiSaarthi AI

**A cognitive care companion for older adults living with dementia, designed to support memory, familiar connections, and caregiver awareness.**

SmritiSaarthi combines a patient-facing interface with a caregiver dashboard to make everyday care more connected and easier to monitor.

## Features

- **Patient Experience:** Simplified interface for family memories and cognitive engagement.
- **Family Memories:** Family profiles and associated personal memories.
- **Cognitive Activity:** Interactive *Who Am I?* memory game.
- **Caregiver Dashboard:** Patient metrics, historical trends, daily timeline, and care alerts.
- **Alert Management:** View and acknowledge alerts.
- **Persistent Backend:** Patient data, memories, activity results, metrics, timeline events, and alerts stored using FastAPI and SQLite.
- **Demo Fallback:** Bundled demo data keeps supported frontend views usable when the backend is unavailable.

## Application Preview

### Patient Portal
<img src="https://github.com/user-attachments/assets/90b67e86-82bd-4c78-84d6-6373bada361c" alt="SmritiSaarthi AI Patient Portal" width="600">

### Caregiver Dashboard
<img src="https://github.com/user-attachments/assets/cc50e2e1-5cac-4093-b203-ceed65b5bc57" alt="SmritiSaarthi AI Caregiver Dashboard" width="600">


## Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Python, FastAPI  
**Database:** SQLite, SQLAlchemy  
**Validation:** Pydantic

## Architecture

```text
React + Vite
     |
  API Client ------ Demo Data Fallback
     |
  FastAPI
     |
 SQLAlchemy
     |
   SQLite
```

## Getting Started

### Prerequisites

- Python
- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/itsriddhima/SmritiSaarthi-AI.git
cd SmritiSaarthi-AI
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv
```

Activate the environment.

**Windows PowerShell:**
```powershell
.\.venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

Install dependencies and run the API:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 3. Start the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Create your local environment file:

**Windows PowerShell:**
```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

Ensure `VITE_API_BASE_URL` points to your local backend, then run:

```bash
npm run dev
```

Open the local URL shown by Vite, typically `http://localhost:5173`.

## Implementation Notes

- Voice interaction uses predefined phrases rather than live speech recognition or synthesis.
- Face recognition is simulated using seeded family data.
- *Who Am I?* is interactive; other cognitive activities may be placeholders.
- Supported frontend views fall back to bundled demo data when the backend is unavailable.

SmritiSaarthi is a care-support application, not a diagnostic tool or a replacement for professional medical care.

