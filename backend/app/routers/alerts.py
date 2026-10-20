from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api/alerts", tags=["alerts"])


@router.get("", response_model=List[schemas.AlertOut])
def list_alerts(patient_id: Optional[int] = None, db: Session = Depends(get_db)):
    q = db.query(models.Alert)
    if patient_id is not None:
        q = q.filter_by(patient_id=patient_id)
    return q.order_by(models.Alert.created_at.desc()).all()


@router.post("/sos", response_model=schemas.AlertOut)
def trigger_sos(db: Session = Depends(get_db)):
    sos = models.Alert(
        patient_id=1,
        severity="critical",
        evidence="🚨 Emergency SOS Assistance Triggered by Patient",
        ai_observation="Urgent physical assistance requested by patient from home veranda. Loud caretaker siren triggered.",
        acknowledged=False,
    )
    db.add(sos)
    db.commit()
    db.refresh(sos)
    return sos


@router.post("/{alert_id}/acknowledge", response_model=schemas.AlertOut)
def acknowledge_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(models.Alert).get(alert_id)
    if not alert:
        raise HTTPException(404, "Alert not found")
    alert.acknowledged = True
    db.commit()
    db.refresh(alert)
    return alert
