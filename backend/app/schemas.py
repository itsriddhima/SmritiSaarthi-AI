from pydantic import BaseModel
from typing import Optional


class FamilyMemberOut(BaseModel):
    id: int
    name: str
    relation: str
    emoji: str
    short_bio: Optional[str] = None
    recognition_confidence: float

    class Config:
        from_attributes = True


class MemoryOut(BaseModel):
    id: int
    title: str
    place: Optional[str] = None
    date_label: Optional[str] = None
    description: Optional[str] = None
    emoji: str

    class Config:
        from_attributes = True


class PatientOut(BaseModel):
    id: int
    name: str
    preferred_name: Optional[str] = None
    preferred_language: str
    status: str

    class Config:
        from_attributes = True


class TrendPoint(BaseModel):
    label: str
    memory_accuracy: float
    recognition_accuracy: float


class MetricsOut(BaseModel):
    cognitive_activity: float
    family_recognition: float
    activity_completion: float
    conversations: int
    status: str


class TimelineEventOut(BaseModel):
    icon: str
    title: str
    detail: Optional[str] = None
    occurred_at: str

    class Config:
        from_attributes = True


class AlertOut(BaseModel):
    id: int
    severity: str
    evidence: str
    ai_observation: str
    suggested_action: str
    acknowledged: bool

    class Config:
        from_attributes = True


class ActivityResultIn(BaseModel):
    patient_id: int
    activity_type: str
    accuracy: float
    response_time_seconds: float
    hints_used: int = 0
    completed: bool = True


class RecognitionEventIn(BaseModel):
    patient_id: int
    family_member_id: int
    confidence: float


class ReminderOut(BaseModel):
    id: int
    patient_id: int
    reminder_type: str
    title: str
    time_label: str
    dosage_or_detail: Optional[str] = None
    is_completed: bool
    priority: str
    icon: str

    class Config:
        from_attributes = True


class ReminderIn(BaseModel):
    patient_id: int
    reminder_type: str
    title: str
    time_label: str
    dosage_or_detail: Optional[str] = None
    priority: str = "normal"
    icon: str = "💊"


class ClinicalNoteOut(BaseModel):
    id: int
    author_name: str
    author_role: str
    note_text: str
    clinical_stage: str
    recommended_intervention: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True


class ClinicalNoteIn(BaseModel):
    patient_id: int
    author_name: str = "Dr. B. Barua"
    author_role: str = "Consultant Geriatrician"
    note_text: str
    clinical_stage: str = "Mild Cognitive Impairment (MCI) - Stage 3"
    recommended_intervention: Optional[str] = None


class ClinicalSummaryOut(BaseModel):
    patient_id: int
    patient_name: str
    age: int
    primary_language: str
    clinical_stage: str
    mini_cog_score: str
    adherence_rate: float
    memory_index: float
    attention_index: float
    executive_index: float
    recent_notes: list[ClinicalNoteOut]
    recommendations: list[str]


class SyncItemIn(BaseModel):
    client_event_id: str
    event_type: str
    payload: Optional[dict] = None
    timestamp: Optional[str] = None


class SyncBatchIn(BaseModel):
    patient_id: Optional[int] = 1
    items: Optional[list[SyncItemIn]] = None
    events: Optional[list[SyncItemIn]] = None

