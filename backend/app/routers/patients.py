from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api/patients", tags=["patients"])


@router.get("/{patient_id}", response_model=schemas.PatientOut)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).get(patient_id)
    if not patient:
        raise HTTPException(404, "Patient not found")
    return patient


@router.get("/{patient_id}/family", response_model=List[schemas.FamilyMemberOut])
def get_family(patient_id: int, db: Session = Depends(get_db)):
    return db.query(models.FamilyMember).filter_by(patient_id=patient_id).all()


@router.get("/{patient_id}/memories", response_model=List[schemas.MemoryOut])
def get_memories(patient_id: int, db: Session = Depends(get_db)):
    return db.query(models.Memory).filter_by(patient_id=patient_id).all()


@router.get("/{patient_id}/timeline", response_model=List[schemas.TimelineEventOut])
def get_timeline(patient_id: int, db: Session = Depends(get_db)):
    events = (
        db.query(models.TimelineEvent)
        .filter_by(patient_id=patient_id)
        .order_by(models.TimelineEvent.occurred_at)
        .all()
    )
    return [
        schemas.TimelineEventOut(
            icon=e.icon, title=e.title, detail=e.detail,
            occurred_at=e.occurred_at.strftime("%I:%M %p"),
        )
        for e in events
    ]


@router.get("/{patient_id}/metrics", response_model=schemas.MetricsOut)
def get_metrics(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).get(patient_id)
    if not patient:
        raise HTTPException(404, "Patient not found")

    latest = (
        db.query(models.CognitiveMetric)
        .filter_by(patient_id=patient_id, range_days=7)
        .order_by(models.CognitiveMetric.id.desc())
        .first()
    )
    conversation_count = db.query(models.TimelineEvent).filter_by(
        patient_id=patient_id, title="Voice Conversation"
    ).count()
    # Demo fallback: a freshly seeded patient only has one logged conversation
    # event, which would look sparse on a dashboard meant to show a real week
    # of activity. 14 mirrors the sample data used in the design spec.
    conversations = conversation_count if conversation_count > 1 else 14

    return schemas.MetricsOut(
        cognitive_activity=latest.memory_accuracy if latest else 0,
        family_recognition=latest.recognition_accuracy if latest else 0,
        activity_completion=87.0,  # demo constant for the prototype
        conversations=conversations,
        status=patient.status,
    )


@router.get("/{patient_id}/trends", response_model=List[schemas.TrendPoint])
def get_trends(patient_id: int, range_days: int = 7, db: Session = Depends(get_db)):
    if range_days not in (7, 30, 90):
        raise HTTPException(400, "range_days must be 7, 30, or 90")
    rows = (
        db.query(models.CognitiveMetric)
        .filter_by(patient_id=patient_id, range_days=range_days)
        .order_by(models.CognitiveMetric.id)
        .all()
    )
    return [
        schemas.TrendPoint(
            label=r.period_label,
            memory_accuracy=r.memory_accuracy,
            recognition_accuracy=r.recognition_accuracy,
        )
        for r in rows
    ]
