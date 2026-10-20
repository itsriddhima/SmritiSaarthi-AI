from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models  # noqa: F401 — ensures models are registered before create_all
from . import seed
from .routers import patients, activities, alerts, reminders, sync, clinical

Base.metadata.create_all(bind=engine)
seed.run()

app = FastAPI(
    title="SmritiSaarthi AI — Cognitive Assistance Platform API",
    description="Backend API for SmritiSaarthi AI cognitive companion. "
                "Covers patients, family memories, cognitive games, reminders, "
                "clinical notes, alerts, and offline sync.",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

import os
from fastapi.staticfiles import StaticFiles

app.include_router(patients.router)
app.include_router(activities.router)
app.include_router(alerts.router)
app.include_router(reminders.router)
app.include_router(sync.router)
app.include_router(clinical.router)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "SmritiSaarthi AI Platform"}


# Mount built React frontend so http://localhost:8000/ serves the full web app
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="static_frontend")

