import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api/sync", tags=["sync"])


@router.post("/batch")
def sync_offline_batch(payload: schemas.SyncBatchIn, db: Session = Depends(get_db)):
    synced_count = 0
    errors = []
    items = payload.items or payload.events or []
    patient_id = payload.patient_id or 1

    for item in items:
        # Check if already processed in SyncQueue
        existing = db.query(models.SyncQueue).filter(models.SyncQueue.client_event_id == item.client_event_id).first()
        if existing:
            synced_count += 1
            continue

        try:
            p = item.payload or {}
            if item.event_type == "activity_result":
                result = models.ActivityResult(
                    patient_id=patient_id,
                    activity_type=p.get("activity_type", "general"),
                    accuracy=float(p.get("accuracy", 100.0)),
                    response_time_seconds=float(p.get("response_time_seconds", 3.0)),
                    hints_used=int(p.get("hints_used", 0)),
                    completed=bool(p.get("completed", True)),
                )
                db.add(result)
                db.add(models.TimelineEvent(
                    patient_id=patient_id,
                    icon="🧠",
                    title=f"Offline Synced: {p.get('activity_name', p.get('activity_type', 'Activity'))}",
                    detail=f"Accuracy: {round(float(p.get('accuracy', 100)))}% · Synced from Field Device",
                ))

            elif item.event_type == "reminder_toggle":
                r_id = p.get("reminder_id")
                reminder = db.query(models.Reminder).get(r_id)
                if reminder:
                    reminder.is_completed = bool(p.get("is_completed", True))
                    reminder.last_completed_at = datetime.utcnow()

            elif item.event_type == "reminder_create":
                new_rem = models.Reminder(
                    patient_id=patient_id,
                    reminder_type=p.get("reminder_type", "medicine"),
                    title=p.get("title", "Daily Care"),
                    time_label=p.get("time_label", "12:00 PM"),
                    dosage_or_detail=p.get("dosage_or_detail"),
                    is_completed=False,
                    priority=p.get("priority", "normal"),
                    icon=p.get("icon", "💊"),
                )
                db.add(new_rem)

            elif item.event_type == "clinical_note":
                new_note = models.ClinicalNote(
                    patient_id=patient_id,
                    author_name=p.get("author_name", "Clinical Caregiver"),
                    author_role=p.get("author_role", "Caregiver"),
                    note_text=p.get("note_text", ""),
                    clinical_stage=p.get("clinical_stage", "MCI Stage 3"),
                    recommended_intervention=p.get("recommended_intervention"),
                )
                db.add(new_note)

            # Record in SyncQueue table to prevent duplicates
            db.add(models.SyncQueue(
                patient_id=patient_id,
                client_event_id=item.client_event_id,
                event_type=item.event_type,
                payload_json=json.dumps(p),
                synced_at=datetime.utcnow(),
            ))
            synced_count += 1
        except Exception as e:
            errors.append({"client_event_id": item.client_event_id, "error": str(e)})

    db.commit()
    return {
        "success": True,
        "synced_count": synced_count,
        "processed_count": synced_count,
        "errors": errors,
        "server_time": datetime.utcnow().isoformat(),
    }
