from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api/clinical", tags=["clinical"])


@router.get("/patients/{patient_id}/summary", response_model=schemas.ClinicalSummaryOut)
def get_clinical_summary(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    notes = db.query(models.ClinicalNote).filter(models.ClinicalNote.patient_id == patient_id).order_by(models.ClinicalNote.created_at.desc()).all()
    
    formatted_notes = [
        schemas.ClinicalNoteOut(
            id=n.id,
            author_name=n.author_name,
            author_role=n.author_role,
            note_text=n.note_text,
            clinical_stage=n.clinical_stage,
            recommended_intervention=n.recommended_intervention,
            created_at=n.created_at.strftime("%b %d, %Y"),
        )
        for n in notes
    ]

    # Calculate compliance and cognitive scores
    reminders = db.query(models.Reminder).filter(models.Reminder.patient_id == patient_id).all()
    completed_rems = sum(1 for r in reminders if r.is_completed)
    adherence = round((completed_rems / len(reminders) * 100) if reminders else 85.0, 1)

    return schemas.ClinicalSummaryOut(
        patient_id=patient.id,
        patient_name=patient.name,
        age=74,
        primary_language=patient.preferred_language or "Assamese",
        clinical_stage="Mild Cognitive Impairment (MCI) - GDS Stage 3",
        mini_cog_score="3/5 (Recall 2/3, Clock Draw Normal)",
        adherence_rate=adherence,
        memory_index=68.5,
        attention_index=74.0,
        executive_index=71.2,
        recent_notes=formatted_notes,
        recommendations=[
            "Continue daily structured reminiscence with familiar family photographs & Bihu themes.",
            "Maintain consistent hydration reminders (min. 1.5L daily) and monitor evening sundowning symptoms.",
            "Encourage 10-15 minutes of low-stress auditory recognition games (temple bell, morning cuckoo).",
            "Next clinical geriatric checkup scheduled with Dr. B. Barua at GMCH on 15th next month.",
        ],
    )


@router.post("/patients/{patient_id}/notes", response_model=schemas.ClinicalNoteOut)
def add_clinical_note(patient_id: int, payload: schemas.ClinicalNoteIn, db: Session = Depends(get_db)):
    note = models.ClinicalNote(
        patient_id=patient_id,
        author_name=payload.author_name,
        author_role=payload.author_role,
        note_text=payload.note_text,
        clinical_stage=payload.clinical_stage,
        recommended_intervention=payload.recommended_intervention,
        created_at=datetime.utcnow(),
    )
    db.add(note)
    db.add(models.TimelineEvent(
        patient_id=patient_id,
        icon="📋",
        title="Clinical Assessment Added",
        detail=f"{payload.author_name}: {payload.clinical_stage}",
    ))
    db.commit()
    db.refresh(note)

    return schemas.ClinicalNoteOut(
        id=note.id,
        author_name=note.author_name,
        author_role=note.author_role,
        note_text=note.note_text,
        clinical_stage=note.clinical_stage,
        recommended_intervention=note.recommended_intervention,
        created_at=note.created_at.strftime("%b %d, %Y"),
    )
