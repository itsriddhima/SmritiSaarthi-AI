# SmritiSaarthi AI — Intern Round Prototype

A scoped-down, runnable prototype of SmritiSaarthi AI (SIH26003): an AI cognitive
companion for elderly dementia patients, with a caregiver dashboard.

This covers the patient experience, caregiver dashboard, a real FastAPI +
SQLite backend, and demo data — enough for a live intern-round demo.
**Deferred to a later phase:** live voice/vision AI models, the doctor view,
offline sync, and multi-patient support (see `master-prompt.md` for the
full original scope).

## What's real vs. simulated in this prototype

| Feature | This prototype |
|---|---|
| Family list, memories, metrics, trends, timeline, alerts | Real FastAPI + SQLite backend |
| "Talk to Saarthi" voice conversation | Simulated (tap-to-speak canned phrases) — no live ASR/TTS yet |
| "Who Is This?" face recognition | Simulated (random pick from seeded family) — no live CV model yet |
| Cognitive activities | One real interactive activity ("Who Am I?"); others stubbed |
| Doctor dashboard | Not built yet |

The frontend never breaks if the backend isn't running — every API call
falls back to local demo data (`frontend/src/demoData.js`), matching the
original spec's "never let a missing API break the demo" principle.

## Project layout

```
smritisaarthi/
├── backend/           FastAPI + SQLite API
│   └── app/
│       ├── main.py         App entrypoint, CORS, seeding on startup
│       ├── database.py     SQLAlchemy engine/session
│       ├── models.py       Patient, FamilyMember, Memory, CognitiveMetric,
│       │                   ActivityResult, TimelineEvent, Alert
│       ├── schemas.py       Pydantic response/request models
│       ├── seed.py          One demo patient (Aita Devi) seeded on first run
│       └── routers/
│           ├── patients.py     /api/patients/... (family, memories, metrics, trends, timeline)
│           ├── activities.py   /api/activities/result, /api/recognition/event
│           └── alerts.py       /api/alerts, /api/alerts/{id}/acknowledge
└── frontend/          React + Vite + Tailwind
    └── src/
        ├── App.jsx                    Top nav + view routing
        ├── api.js                     Fetch client with demo-data fallback
        ├── demoData.js                 Offline fallback data
        ├── theme.jsx                   Shared design tokens
        └── components/
            ├── Landing.jsx
            ├── PatientExperience.jsx
            └── CaregiverDashboard.jsx
```

## Running the backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # optional but recommended
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

This creates `smritisaarthi.db` (SQLite) and seeds one demo patient on first
run. API docs are auto-generated at `http://127.0.0.1:8000/docs`.

## Running the frontend

```bash
cd frontend
npm install
cp .env.example .env      # points the app at http://127.0.0.1:8000 by default
npm run dev
```

Open the printed local URL (usually `http://127.0.0.1:5173`). The frontend
works even with no backend running — it just falls back to the bundled demo
data — but starting the backend lets you see the acknowledge-alert and
activity-logging flows actually persist.

## Demo flow suggestion (3–5 minutes)

1. Open the landing page, briefly frame the problem.
2. Switch to **Patient** → show the home screen, "Talk to Saarthi" (tap a
   phrase), then "Recognize Someone" (tap to scan → reveals a family member
   and a memory).
3. Play "Who Am I?" to completion — the Memory Garden grows.
4. Switch to **Caregiver** → walk through the metrics, the 7/30/90-day trend
   chart, today's timeline, and the explainable alert card. Acknowledge the
   alert.
5. Close on the framing line: *"She doesn't need to understand AI. AI needs
   to understand her."*

## Next phase (not in this prototype)

- Real ASR/TTS/translation pipeline (BHASHINI / AI4Bharat-style) for
  Assamese, Bodo, Manipuri
- On-device face recognition (MobileFaceNet / FaceNet-style) and object
  recognition
- Audio-driven avatar (MuseTalk/Wav2Lip-style)
- Offline-first mobile app with local SQLite + sync queue
- Doctor dashboard with longitudinal evidence views
- Multi-patient support, auth, and role-based access
