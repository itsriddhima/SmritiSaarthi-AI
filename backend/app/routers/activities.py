from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api", tags=["activities"])


@router.post("/activities/result")
def record_activity_result(payload: schemas.ActivityResultIn, db: Session = Depends(get_db)):
    result = models.ActivityResult(**payload.model_dump())
    db.add(result)
    
    activity_metadata = {
        "who_am_i": ("🧠", "Who Am I? Recall"),
        "memory_pairs": ("🃏", "Memory Card Match"),
        "jigsaw": ("🧩", "Family Photo Puzzle"),
        "sound_recall": ("🎵", "Melody & Sound Recall"),
        "word_bloom": ("🌸", "Word Bloom Reminiscence"),
        "routine_recall": ("🌅", "Daily Routine Recall"),
        "object_recognition": ("🎋", "NER Cultural Object Recognition"),
        "pattern_match": ("💠", "Pattern & Attention Focus"),
    }
    icon, title = activity_metadata.get(payload.activity_type, ("✨", "Cognitive Activity"))

    db.add(models.TimelineEvent(
        patient_id=payload.patient_id,
        icon=icon,
        title=title,
        detail=f"Accuracy: {round(payload.accuracy)}% · Time: {round(payload.response_time_seconds, 1)}s (Hints: {payload.hints_used})",
    ))
    db.commit()
    db.refresh(result)
    return {"id": result.id, "recorded": True}


@router.post("/recognition/event")
def record_recognition_event(payload: schemas.RecognitionEventIn, db: Session = Depends(get_db)):
    member = db.query(models.FamilyMember).get(payload.family_member_id)
    db.add(models.TimelineEvent(
        patient_id=payload.patient_id,
        icon="📸",
        title="Family Recognition",
        detail=f"{member.name if member else 'Unknown'} recognized · Confidence {round(payload.confidence)}%",
    ))
    db.commit()
    return {"recorded": True}

