from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api", tags=["reminders"])


@router.get("/patients/{patient_id}/reminders", response_model=list[schemas.ReminderOut])
def get_patient_reminders(patient_id: int, db: Session = Depends(get_db)):
    reminders = db.query(models.Reminder).filter(models.Reminder.patient_id == patient_id).all()
    return reminders


@router.post("/reminders", response_model=schemas.ReminderOut)
def create_reminder(payload: schemas.ReminderIn, db: Session = Depends(get_db)):
    reminder = models.Reminder(**payload.model_dump())
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder


@router.post("/reminders/{reminder_id}/toggle")
def toggle_reminder(reminder_id: int, db: Session = Depends(get_db)):
    reminder = db.query(models.Reminder).get(reminder_id)
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    reminder.is_completed = not reminder.is_completed
    reminder.last_completed_at = datetime.utcnow() if reminder.is_completed else None
    
    if reminder.is_completed:
        # Add to timeline
        action_name = "Medication Taken" if reminder.reminder_type == "medicine" else f"Completed {reminder.title}"
        db.add(models.TimelineEvent(
            patient_id=reminder.patient_id,
            icon=reminder.icon,
            title=action_name,
            detail=f"{reminder.title} ({reminder.time_label})",
        ))
        
    db.commit()
    return {"id": reminder.id, "is_completed": reminder.is_completed}


@router.post("/reminders/{reminder_id}/snooze")
def snooze_reminder(reminder_id: int, db: Session = Depends(get_db)):
    reminder = db.query(models.Reminder).get(reminder_id)
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    db.add(models.TimelineEvent(
        patient_id=reminder.patient_id,
        icon="⏰",
        title="Reminder Snoozed",
        detail=f"{reminder.title} snoozed by 15 mins",
    ))
    db.commit()
    return {"id": reminder.id, "snoozed": True}
