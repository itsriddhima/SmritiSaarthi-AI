"""
Data models for the intern-round prototype.

Scoped down from the full spec (Section 45): this covers only the
entities the prototype's endpoints actually use. AuditLog, Consent,
Device, SyncQueue, Doctor, VoiceSession etc. are deferred to the
next phase along with the features that need them.
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    preferred_name = Column(String)  # e.g. "Aita" — how Saathi addresses them
    preferred_language = Column(String, default="Assamese")
    status = Column(String, default="stable")  # stable | needs_attention | significant_change

    family_members = relationship("FamilyMember", back_populates="patient", cascade="all, delete-orphan")
    memories = relationship("Memory", back_populates="patient", cascade="all, delete-orphan")
    metrics = relationship("CognitiveMetric", back_populates="patient", cascade="all, delete-orphan")
    activity_results = relationship("ActivityResult", back_populates="patient", cascade="all, delete-orphan")
    timeline_events = relationship("TimelineEvent", back_populates="patient", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="patient", cascade="all, delete-orphan")


class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    name = Column(String, nullable=False)
    relation = Column(String, nullable=False)
    emoji = Column(String, default="🙂")  # stand-in for a real photo in this prototype
    short_bio = Column(Text)
    recognition_confidence = Column(Float, default=90.0)  # demo baseline confidence

    patient = relationship("Patient", back_populates="family_members")


class Memory(Base):
    __tablename__ = "memories"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    title = Column(String, nullable=False)
    place = Column(String)
    date_label = Column(String)  # free text ("2018", "Every week") — not a strict date
    description = Column(Text)
    emoji = Column(String, default="📸")

    patient = relationship("Patient", back_populates="memories")


class CognitiveMetric(Base):
    __tablename__ = "cognitive_metrics"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    period_label = Column(String)   # e.g. "Mon", "W1", "M1" — bucket label for the chart
    range_days = Column(Integer)    # 7 | 30 | 90 — which trend view this point belongs to
    memory_accuracy = Column(Float)
    recognition_accuracy = Column(Float)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="metrics")


class ActivityResult(Base):
    __tablename__ = "activity_results"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    activity_type = Column(String)   # "who_am_i" | "family_puzzle" | ...
    accuracy = Column(Float)
    response_time_seconds = Column(Float)
    hints_used = Column(Integer, default=0)
    completed = Column(Boolean, default=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="activity_results")


class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    icon = Column(String, default="🧠")
    title = Column(String, nullable=False)
    detail = Column(String)
    occurred_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="timeline_events")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    severity = Column(String, default="needs_attention")  # needs_attention | significant_change
    evidence = Column(Text)          # the explainable, numbers-based statement
    ai_observation = Column(Text)    # the careful non-diagnostic framing
    suggested_action = Column(String, default="Caregiver/clinician review suggested.")
    acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="alerts")


class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    reminder_type = Column(String, nullable=False)  # medicine | hydration | activity | appointment
    title = Column(String, nullable=False)
    time_label = Column(String, nullable=False)      # e.g., "08:30 AM", "12:00 PM"
    dosage_or_detail = Column(String)               # e.g., "1 tablet after breakfast (Amlodipine 5mg)"
    is_completed = Column(Boolean, default=False)
    priority = Column(String, default="normal")      # high | normal
    icon = Column(String, default="💊")
    last_completed_at = Column(DateTime, nullable=True)

    patient = relationship("Patient", backref="reminders")


class ClinicalNote(Base):
    __tablename__ = "clinical_notes"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    author_name = Column(String, default="Dr. B. Barua (Geriatrician)")
    author_role = Column(String, default="Consultant Geriatrician, GMCH")
    note_text = Column(Text, nullable=False)
    clinical_stage = Column(String, default="Mild Cognitive Impairment (MCI) - Stage 3")
    recommended_intervention = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", backref="clinical_notes")


class SyncQueue(Base):
    __tablename__ = "sync_queue"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    client_event_id = Column(String, unique=True, index=True)
    event_type = Column(String, nullable=False)   # activity_result | reminder_toggle | speech_event
    payload_json = Column(Text, nullable=False)
    synced_at = Column(DateTime, default=datetime.utcnow)

