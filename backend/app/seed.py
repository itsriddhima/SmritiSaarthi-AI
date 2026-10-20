"""
Seeds realistic demo patient (Aita Devi), family members, memories, metrics,
reminders, clinical notes, and alerts so the app has a complete initial state.
"""
from datetime import datetime
from .database import SessionLocal
from .models import Patient, FamilyMember, Memory, CognitiveMetric, TimelineEvent, Alert, Reminder, ClinicalNote


def run():
    db = SessionLocal()
    try:
        aita = db.query(Patient).first()
        if not aita:
            aita = Patient(
                name="Aita Devi",
                preferred_name="Aita",
                preferred_language="Assamese",
                status="needs_attention",
            )
            db.add(aita)
            db.flush()  # get aita.id

            db.add_all([
                FamilyMember(patient_id=aita.id, name="Raj", relation="Son", emoji="🧑🏽",
                             short_bio="Your loving son who works in Guwahati. He visits every evening with fresh tea biscuits.", recognition_confidence=94),
                FamilyMember(patient_id=aita.id, name="Riya", relation="Granddaughter", emoji="👧🏽",
                             short_bio="Your bright 12-year-old granddaughter who visits during Bihu and decorated your veranda with marigolds.", recognition_confidence=96),
                FamilyMember(patient_id=aita.id, name="Ananya", relation="Daughter-in-law", emoji="👩🏽",
                             short_bio="Your caring daughter-in-law who cooks warm khar, prepares morning Assam tea, and helps with daily medicines.", recognition_confidence=88),
                FamilyMember(patient_id=aita.id, name="Pranab", relation="Late Husband", emoji="👴🏽",
                             short_bio="Your beloved husband of 48 years. You both shared boat rides across the Brahmaputra River to Umananda temple.", recognition_confidence=98),
                FamilyMember(patient_id=aita.id, name="Kakoli", relation="Sister", emoji="👵🏽",
                             short_bio="Your younger sister in Jorhat who calls every Sunday morning to exchange traditional pitha recipes.", recognition_confidence=84),
            ])

            db.add_all([
                Memory(patient_id=aita.id, title="Riya's Wedding", place="Guwahati", date_label="2018",
                       description="Riya and her family visited us. You wore your blue mekhela chador.", emoji="📸"),
                Memory(patient_id=aita.id, title="Bihu at Home", place="Home", date_label="2023",
                       description="Riya painted the veranda with marigolds and you danced together.", emoji="🌼"),
                Memory(patient_id=aita.id, title="Sunday Tea", place="Home", date_label="Every week",
                       description="Raj visits every Sunday afternoon with tea biscuits.", emoji="🍵"),
            ])

            # 7-day trend (declining, to demonstrate the alert/explainability flow)
            seven_day = [
                ("Mon", 80, 92), ("Tue", 78, 90), ("Wed", 75, 88), ("Thu", 71, 85),
                ("Fri", 69, 80), ("Sat", 68, 76), ("Sun", 67, 73),
            ]
            for label, mem, rec in seven_day:
                db.add(CognitiveMetric(patient_id=aita.id, period_label=label, range_days=7,
                                        memory_accuracy=mem, recognition_accuracy=rec))

            thirty_day = [("W1", 82, 91), ("W2", 79, 87), ("W3", 73, 82), ("W4", 67, 73)]
            for label, mem, rec in thirty_day:
                db.add(CognitiveMetric(patient_id=aita.id, period_label=label, range_days=30,
                                        memory_accuracy=mem, recognition_accuracy=rec))

            ninety_day = [("M1", 85, 93), ("M2", 80, 88), ("M3", 67, 73)]
            for label, mem, rec in ninety_day:
                db.add(CognitiveMetric(patient_id=aita.id, period_label=label, range_days=90,
                                        memory_accuracy=mem, recognition_accuracy=rec))

            db.add_all([
                TimelineEvent(patient_id=aita.id, icon="🧠", title="Memory Activity", detail="Accuracy: 80%"),
                TimelineEvent(patient_id=aita.id, icon="📸", title="Family Recognition",
                              detail="Riya recognized · Confidence 94%"),
                TimelineEvent(patient_id=aita.id, icon="🗣", title="Voice Conversation", detail="Assamese · 3 exchanges"),
                TimelineEvent(patient_id=aita.id, icon="🧩", title="Family Puzzle", detail="Completed"),
            ])

            db.add(Alert(
                patient_id=aita.id,
                severity="needs_attention",
                evidence="Memory activity accuracy decreased from 82% to 67% across the last 14 sessions.",
                ai_observation="Performance differs from Aita's recent personal baseline.",
                suggested_action="Caregiver/clinician review suggested.",
                acknowledged=False,
            ))

        # Check and seed reminders if missing
        if not db.query(Reminder).filter(Reminder.patient_id == aita.id).first():
            db.add_all([
                Reminder(
                    patient_id=aita.id,
                    reminder_type="medicine",
                    title="Morning Blood Pressure & Memory Meds",
                    time_label="08:30 AM",
                    dosage_or_detail="Donepezil 5mg + Amlodipine 5mg with water after breakfast",
                    is_completed=True,
                    priority="high",
                    icon="💊",
                    last_completed_at=datetime.utcnow(),
                ),
                Reminder(
                    patient_id=aita.id,
                    reminder_type="hydration",
                    title="Morning Warm Tulsi & Water",
                    time_label="10:30 AM",
                    dosage_or_detail="1 full glass of warm water (Target: 1.5L daily)",
                    is_completed=False,
                    priority="normal",
                    icon="💧",
                ),
                Reminder(
                    patient_id=aita.id,
                    reminder_type="activity",
                    title="Veranda Walk & Tulsi Watering",
                    time_label="04:30 PM",
                    dosage_or_detail="15 mins gentle walking with caregiver or Raj",
                    is_completed=False,
                    priority="normal",
                    icon="🌿",
                ),
                Reminder(
                    patient_id=aita.id,
                    reminder_type="medicine",
                    title="Evening Vitamin & Nerve Support",
                    time_label="08:00 PM",
                    dosage_or_detail="Vitamin B12 + Calcium after dinner",
                    is_completed=False,
                    priority="high",
                    icon="💊",
                ),
                Reminder(
                    patient_id=aita.id,
                    reminder_type="appointment",
                    title="GMCH Geriatric Clinic Checkup",
                    time_label="15th Next Month (10:00 AM)",
                    dosage_or_detail="Follow-up review with Dr. B. Barua, Geriatric OPD Guwahati",
                    is_completed=False,
                    priority="high",
                    icon="🩺",
                ),
            ])

        # Check and seed clinical notes if missing
        if not db.query(ClinicalNote).filter(ClinicalNote.patient_id == aita.id).first():
            db.add_all([
                ClinicalNote(
                    patient_id=aita.id,
                    author_name="Dr. B. Barua",
                    author_role="Consultant Geriatrician, GMCH Guwahati",
                    note_text="Patient demonstrates mild short-term episodic recall decline (CDR 0.5). Long-term semantic memories of family events (Bihu, Guwahati wedding) remain well preserved. Highly responsive to Assamese audio-visual cues.",
                    clinical_stage="Mild Cognitive Impairment (MCI) - GDS Stage 3",
                    recommended_intervention="Continue structured digital reminiscence twice daily. Maintain hydration and regular routine reminders. Caregiver to monitor evening confusion (sundowning).",
                ),
                ClinicalNote(
                    patient_id=aita.id,
                    author_name="Ananya Sarma (Caregiver)",
                    author_role="Primary Family Caregiver",
                    note_text="Aita enjoys talking to Saathi when hearing her name and Assamese greetings. Memory Garden visual progress keeps her engaged and enthusiastic.",
                    clinical_stage="Stable MCI with high engagement",
                    recommended_intervention="Keep morning memory games right after tea.",
                ),
            ])

        db.commit()
    finally:
        db.close()

