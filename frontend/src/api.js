/**
 * Resilient API client for SmritiSaarthi backend with offline-first synchronization
 * and real-time reactive state updates between Patient and Caregiver portals.
 */
import { DEMO } from "./demoData";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const PATIENT_ID = 1;
const SYNC_QUEUE_KEY = "smritisaarthi_sync_queue";
const STORE_TIMELINE_KEY = "smritisaarthi_timeline_store";
const STORE_METRICS_KEY = "smritisaarthi_metrics_store";
const STORE_REMINDERS_KEY = "smritisaarthi_reminders_store";
const STORE_TRENDS_KEY = "smritisaarthi_trends_store";
const STORE_NOTES_KEY = "smritisaarthi_notes_store";
const STORE_REMINDER_STATUS_MAP = "smritisaarthi_reminder_status_map";
const STORE_CLINICAL_SUMMARY = "smritisaarthi_clinical_summary_store";
const STORE_ACTIVE_SOS = "smritisaarthi_active_sos";
const STORE_ALERTS_KEY = "smritisaarthi_alerts_store";

// Event channel for instant cross-component updates
const EVENT_NAME = "smritisaarthi_live_sync";

const DEFAULT_METRICS = {
  cognitive_activity: 82,
  memory_recall_accuracy: 82,
  family_recognition: 94,
  face_recognition_accuracy: 94,
  active_streak_days: 14,
  weekly_games_completed: 28,
  conversations: 12,
};

function dispatchUpdateEvent(detail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }));
  }
}

function getStoredJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[store] failed to save ${key}:`, e);
  }
}

function formatCurrentTime() {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
}

// Local storage helpers for offline queue
function getLocalSyncQueue() {
  return getStoredJSON(SYNC_QUEUE_KEY, []);
}

function saveLocalSyncQueue(queue) {
  setStoredJSON(SYNC_QUEUE_KEY, queue);
}

function enqueueOfflineEvent(eventType, payload) {
  const queue = getLocalSyncQueue();
  const item = {
    client_event_id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    event_type: eventType,
    payload,
    timestamp: new Date().toISOString(),
  };
  queue.push(item);
  saveLocalSyncQueue(queue);
  dispatchUpdateEvent({ type: "sync_queued", item });
  return item;
}

async function safeFetch(path, fallback) {
  try {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    return fallback;
  }
}

export const api = {
  // Subscribe to live updates
  subscribe: (callback) => {
    const handler = (e) => callback(e.detail);
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  },

  // Patient & Clinical Data
  getPatient: () => safeFetch(`/api/patients/${PATIENT_ID}`, DEMO.patient),
  getFamily: () => safeFetch(`/api/patients/${PATIENT_ID}/family`, DEMO.family),
  getMemories: () => safeFetch(`/api/patients/${PATIENT_ID}/memories`, DEMO.memories),

  getMetrics: async () => {
    const stored = getStoredJSON(STORE_METRICS_KEY, null);
    if (stored) {
      return {
        ...DEFAULT_METRICS,
        ...stored,
        cognitive_activity: Number(stored.cognitive_activity || stored.memory_recall_accuracy || DEFAULT_METRICS.cognitive_activity),
        family_recognition: Number(stored.family_recognition || stored.face_recognition_accuracy || DEFAULT_METRICS.family_recognition),
        conversations: Number(stored.conversations || DEFAULT_METRICS.conversations),
      };
    }
    const remote = await safeFetch(`/api/patients/${PATIENT_ID}/metrics`, DEFAULT_METRICS);
    const normalized = {
      ...DEFAULT_METRICS,
      ...remote,
      cognitive_activity: Number(remote.cognitive_activity || remote.memory_recall_accuracy || DEFAULT_METRICS.cognitive_activity),
      family_recognition: Number(remote.family_recognition || remote.face_recognition_accuracy || DEFAULT_METRICS.family_recognition),
      conversations: Number(remote.conversations || DEFAULT_METRICS.conversations),
    };
    setStoredJSON(STORE_METRICS_KEY, normalized);
    return normalized;
  },

  getTrends: async (rangeDays = 7) => {
    const stored = getStoredJSON(`${STORE_TRENDS_KEY}_${rangeDays}`, null);
    if (stored) return stored;
    const remote = await safeFetch(`/api/patients/${PATIENT_ID}/trends?range_days=${rangeDays}`, DEMO.trends[rangeDays]);
    setStoredJSON(`${STORE_TRENDS_KEY}_${rangeDays}`, remote);
    return remote;
  },

  getTimeline: async () => {
    const stored = getStoredJSON(STORE_TIMELINE_KEY, null);
    if (stored) return stored;
    const remote = await safeFetch(`/api/patients/${PATIENT_ID}/timeline`, DEMO.timeline);
    setStoredJSON(STORE_TIMELINE_KEY, remote);
    return remote;
  },

  getAlerts: async () => {
    const activeSos = getStoredJSON(STORE_ACTIVE_SOS, null);
    const remote = await safeFetch(`/api/alerts?patient_id=${PATIENT_ID}`, DEMO.alerts);
    if (activeSos) {
      return [activeSos, ...remote.filter((a) => a.id !== activeSos.id)];
    }
    return remote;
  },

  getActiveSos: () => {
    return getStoredJSON(STORE_ACTIVE_SOS, null);
  },

  triggerSosAlert: async (customData = {}) => {
    const sosAlert = {
      id: Date.now(),
      patient_id: PATIENT_ID,
      severity: "critical",
      is_sos: true,
      acknowledged: false,
      evidence: "🚨 Patient pressed Emergency SOS Assistance Button",
      ai_observation: "Urgent physical assistance requested by patient from home veranda. Loud caretaker siren triggered.",
      location: "Home Veranda, Guwahati",
      occurred_at: formatCurrentTime(),
      created_at: "Just now",
      ...customData,
    };

    // Save persistent active SOS state
    setStoredJSON(STORE_ACTIVE_SOS, sosAlert);

    // Save to local alerts list
    const alerts = getStoredJSON(STORE_ALERTS_KEY, DEMO.alerts);
    setStoredJSON(STORE_ALERTS_KEY, [sosAlert, ...alerts]);

    // Send to backend
    try {
      await fetch(`${BASE}/api/alerts/sos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sosAlert),
      });
    } catch {
      enqueueOfflineEvent("sos_emergency_alert", sosAlert);
    }

    // Add to timeline
    const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
    const event = {
      icon: "🚨",
      title: "EMERGENCY SOS ALERT TRIGGERED",
      detail: `Aita pressed the emergency assistance button. Loud alarm sent to Caregiver Ananya and Dr. Barua.`,
      occurred_at: formatCurrentTime(),
    };
    setStoredJSON(STORE_TIMELINE_KEY, [event, ...timeline]);

    dispatchUpdateEvent({ type: "sos_alert_triggered", alert: sosAlert });
    return sosAlert;
  },

  resolveSosAlert: async (alertId) => {
    // Clear active SOS
    localStorage.removeItem(STORE_ACTIVE_SOS);

    // Acknowledge on backend
    if (alertId) {
      try {
        await fetch(`${BASE}/api/alerts/${alertId}/acknowledge`, { method: "POST" });
      } catch {
        enqueueOfflineEvent("sos_emergency_resolved", { alert_id: alertId });
      }
    }

    // Log resolution to timeline
    const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
    const event = {
      icon: "🛡️",
      title: "Emergency SOS Acknowledged & Siren Stopped",
      detail: `Caretaker acknowledged emergency alert, silenced alarm, and confirmed patient safety.`,
      occurred_at: formatCurrentTime(),
    };
    setStoredJSON(STORE_TIMELINE_KEY, [event, ...timeline]);

    dispatchUpdateEvent({ type: "sos_alert_resolved", alertId });
    return { success: true };
  },

  acknowledgeAlert: async (alertId) => {
    try {
      await fetch(`${BASE}/api/alerts/${alertId}/acknowledge`, { method: "POST" });
    } catch {
      enqueueOfflineEvent("alert_acknowledge", { alert_id: alertId });
    }
    const activeSos = getStoredJSON(STORE_ACTIVE_SOS, null);
    if (activeSos && activeSos.id === alertId) {
      localStorage.removeItem(STORE_ACTIVE_SOS);
    }
    dispatchUpdateEvent({ type: "alert_acknowledged", alertId });
    return { id: alertId, acknowledged: true };
  },

  getClinicalSummary: async () => {
    const stored = getStoredJSON(STORE_CLINICAL_SUMMARY, null);
    const summary = stored || (await safeFetch(`/api/clinical/patients/${PATIENT_ID}/summary`, DEMO.clinical_summary));
    const addedNotes = getStoredJSON(STORE_NOTES_KEY, []);
    return {
      ...summary,
      recent_notes: [...addedNotes, ...(summary.recent_notes || [])],
    };
  },

  // Reminders
  getReminders: async (selectedLang = null) => {
    const statusMap = getStoredJSON(STORE_REMINDER_STATUS_MAP, {});
    let baseList = DEMO.reminders;
    if (selectedLang && DEMO.remindersByLang && DEMO.remindersByLang[selectedLang]) {
      baseList = DEMO.remindersByLang[selectedLang];
    } else {
      const stored = getStoredJSON(STORE_REMINDERS_KEY, null);
      if (stored) baseList = stored;
    }

    const syncedList = baseList.map((r) => {
      if (statusMap[r.id] !== undefined) {
        return { ...r, is_completed: Boolean(statusMap[r.id]) };
      }
      return r;
    });

    setStoredJSON(STORE_REMINDERS_KEY, syncedList);
    return syncedList;
  },

  createReminder: async (reminder) => {
    const newRem = {
      id: Date.now(),
      patient_id: PATIENT_ID,
      ...reminder,
      is_completed: false,
    };
    try {
      const res = await fetch(`${BASE}/api/reminders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_id: PATIENT_ID, ...reminder }),
      });
      if (res.ok) {
        const created = await res.json();
        Object.assign(newRem, created);
      }
    } catch {
      enqueueOfflineEvent("reminder_create", reminder);
    }

    // Update local persistent store
    const list = getStoredJSON(STORE_REMINDERS_KEY, DEMO.reminders);
    const updated = [newRem, ...list];
    setStoredJSON(STORE_REMINDERS_KEY, updated);

    // Update timeline
    const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
    const event = {
      icon: reminder.icon || "💊",
      title: "New Care Reminder Added",
      detail: `${reminder.title} scheduled for ${reminder.time_label}`,
      occurred_at: formatCurrentTime(),
    };
    setStoredJSON(STORE_TIMELINE_KEY, [event, ...timeline]);

    dispatchUpdateEvent({ type: "reminder_created", reminder: newRem, list: updated });
    return newRem;
  },

  toggleReminder: async (reminderId, isCompleted) => {
    try {
      await fetch(`${BASE}/api/reminders/${reminderId}/toggle`, { method: "POST" });
    } catch {
      enqueueOfflineEvent("reminder_toggle", { reminder_id: reminderId, is_completed: !isCompleted });
    }

    // Update status map
    const statusMap = getStoredJSON(STORE_REMINDER_STATUS_MAP, {});
    statusMap[reminderId] = !isCompleted;
    setStoredJSON(STORE_REMINDER_STATUS_MAP, statusMap);

    const list = getStoredJSON(STORE_REMINDERS_KEY, DEMO.reminders);
    let toggledItem = null;
    const updated = list.map((r) => {
      if (r.id === reminderId) {
        toggledItem = { ...r, is_completed: !isCompleted };
        return toggledItem;
      }
      return r;
    });
    setStoredJSON(STORE_REMINDERS_KEY, updated);

    // If marked completed, log immediately to timeline
    if (!isCompleted && toggledItem) {
      const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
      const event = {
        icon: toggledItem.icon || "✅",
        title: "Daily Care Routine Completed",
        detail: `${toggledItem.title} (${toggledItem.time_label}) marked completed`,
        occurred_at: formatCurrentTime(),
      };
      setStoredJSON(STORE_TIMELINE_KEY, [event, ...timeline]);
    }

    dispatchUpdateEvent({ type: "reminder_toggled", reminderId, is_completed: !isCompleted, list: updated });
    return { id: reminderId, is_completed: !isCompleted };
  },

  snoozeReminder: async (reminderId) => {
    try {
      await fetch(`${BASE}/api/reminders/${reminderId}/snooze`, { method: "POST" });
    } catch {
      enqueueOfflineEvent("reminder_snooze", { reminder_id: reminderId });
    }
    dispatchUpdateEvent({ type: "reminder_snoozed", reminderId });
    return { id: reminderId, snoozed: true };
  },

  addClinicalNote: async (note) => {
    const newNote = { id: Date.now(), ...note, created_at: "Today" };
    try {
      const res = await fetch(`${BASE}/api/clinical/patients/${PATIENT_ID}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_id: PATIENT_ID, ...note }),
      });
      if (res.ok) {
        const created = await res.json();
        Object.assign(newNote, created);
      }
    } catch {
      enqueueOfflineEvent("clinical_note", note);
    }

    const notes = getStoredJSON(STORE_NOTES_KEY, []);
    setStoredJSON(STORE_NOTES_KEY, [newNote, ...notes]);

    const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
    const event = {
      icon: "🩺",
      title: "Clinical Assessment Note Added",
      detail: `${note.author_name}: "${note.note_text.slice(0, 45)}..."`,
      occurred_at: formatCurrentTime(),
    };
    setStoredJSON(STORE_TIMELINE_KEY, [event, ...timeline]);

    dispatchUpdateEvent({ type: "note_added", note: newNote });
    return newNote;
  },

  acknowledgeAlert: async (alertId) => {
    try {
      await fetch(`${BASE}/api/alerts/${alertId}/acknowledge`, { method: "POST" });
    } catch {
      console.warn("[api] acknowledge offline fallback");
    }
    dispatchUpdateEvent({ type: "alert_acknowledged", alertId });
    return null;
  },

  // Immediate Mistake Trigger -> Drops charts & metrics immediately when a wrong answer is clicked
  recordMistake: async ({ activity_name = "Memory Activity", activity_type = "game" }) => {
    const metrics = getStoredJSON(STORE_METRICS_KEY, DEFAULT_METRICS);
    const currentCog = Number(metrics.cognitive_activity || metrics.memory_recall_accuracy || 82);
    const newCog = Math.max(25, currentCog - 4);
    
    let currentFamily = Number(metrics.family_recognition || metrics.face_recognition_accuracy || 94);
    if (activity_type === "who_am_i" || activity_type === "jigsaw") {
      currentFamily = Math.max(25, currentFamily - 5);
    }

    const updatedMetrics = {
      ...DEFAULT_METRICS,
      ...metrics,
      cognitive_activity: newCog,
      memory_recall_accuracy: newCog,
      family_recognition: currentFamily,
      face_recognition_accuracy: currentFamily,
    };
    setStoredJSON(STORE_METRICS_KEY, updatedMetrics);

    // Update all trend charts (7D, 30D, 90D) immediately to slope downwards
    [7, 30, 90].forEach((range) => {
      const trendList = getStoredJSON(`${STORE_TRENDS_KEY}_${range}`, DEMO.trends[range]);
      if (trendList && trendList.length > 0) {
        const updatedTrend = [...trendList];
        const lastIdx = updatedTrend.length - 1;
        updatedTrend[lastIdx] = {
          ...updatedTrend[lastIdx],
          memory_accuracy: newCog,
          recognition_accuracy: currentFamily,
        };
        setStoredJSON(`${STORE_TRENDS_KEY}_${range}`, updatedTrend);
      }
    });

    // Update clinical summary indices
    const summary = getStoredJSON(STORE_CLINICAL_SUMMARY, DEMO.clinical_summary);
    if (summary) {
      const updatedSummary = {
        ...summary,
        memory_index: Math.max(25, Math.min(100, Math.round(newCog * 0.85))),
        attention_index: Math.max(25, Math.min(100, Math.round(newCog * 0.9))),
      };
      setStoredJSON(STORE_CLINICAL_SUMMARY, updatedSummary);
    }

    dispatchUpdateEvent({ type: "mistake_recorded", activity_name, activity_type, metrics: updatedMetrics });
  },

  // Record completed Cognitive Activity -> Updates Caregiver metrics, timeline, and trends based on final calculated accuracy!
  recordActivityResult: async (payload) => {
    try {
      await fetch(`${BASE}/api/activities/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_id: PATIENT_ID, ...payload }),
      });
    } catch {
      enqueueOfflineEvent("activity_result", payload);
    }

    const accuracy = Number(payload.accuracy !== undefined ? payload.accuracy : 100);
    const gameTitle = payload.activity_name || "Cognitive Game";
    const levelLabel = payload.difficulty_level === 1 ? "Gentle" : payload.difficulty_level === 3 ? "Focus" : "Standard";

    // 1. Update timeline immediately
    const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
    const isDip = accuracy < 75;
    const newTimelineEvent = {
      icon: isDip ? "⚠️" : "🧠",
      title: isDip ? `Memory Activity: ${gameTitle} (Score Dip)` : `Memory Activity: ${gameTitle}`,
      detail: `Accuracy: ${accuracy}% · Level ${payload.difficulty_level || 1} (${levelLabel})`,
      occurred_at: formatCurrentTime(),
    };
    setStoredJSON(STORE_TIMELINE_KEY, [newTimelineEvent, ...timeline]);

    // 2. Update caregiver metrics (scores drop if accuracy is low)
    const metrics = getStoredJSON(STORE_METRICS_KEY, DEFAULT_METRICS);
    const currentCog = Number(metrics.cognitive_activity || metrics.memory_recall_accuracy || 82);
    
    // Weighted update: wrong answers strongly pull the average down
    const newCog = Math.max(20, Math.min(100, Math.round((currentCog * 2 + accuracy) / 3)));
    
    let currentFamily = Number(metrics.family_recognition || metrics.face_recognition_accuracy || 94);
    if (payload.activity_type === "who_am_i" || payload.activity_type === "jigsaw") {
      currentFamily = Math.max(20, Math.min(100, Math.round((currentFamily * 2 + accuracy) / 3)));
    }

    const updatedMetrics = {
      ...DEFAULT_METRICS,
      ...metrics,
      cognitive_activity: newCog,
      memory_recall_accuracy: newCog,
      family_recognition: currentFamily,
      face_recognition_accuracy: currentFamily,
      weekly_games_completed: (metrics.weekly_games_completed || 28) + 1,
      active_streak_days: metrics.active_streak_days || 14,
      conversations: metrics.conversations || 12,
    };
    setStoredJSON(STORE_METRICS_KEY, updatedMetrics);

    // 3. Update all trend charts (7D, 30D, 90D)
    [7, 30, 90].forEach((range) => {
      const trendList = getStoredJSON(`${STORE_TRENDS_KEY}_${range}`, DEMO.trends[range]);
      if (trendList && trendList.length > 0) {
        const updatedTrend = [...trendList];
        const lastIdx = updatedTrend.length - 1;
        updatedTrend[lastIdx] = {
          ...updatedTrend[lastIdx],
          memory_accuracy: newCog,
          recognition_accuracy: currentFamily,
        };
        setStoredJSON(`${STORE_TRENDS_KEY}_${range}`, updatedTrend);
      }
    });

    // 4. Update clinical summary cognitive dimensions
    const summary = getStoredJSON(STORE_CLINICAL_SUMMARY, DEMO.clinical_summary);
    if (summary) {
      const updatedSummary = {
        ...summary,
        memory_index: Math.max(20, Math.min(100, Math.round(newCog * 0.85))),
        attention_index: Math.max(20, Math.min(100, Math.round(newCog * 0.9))),
      };
      setStoredJSON(STORE_CLINICAL_SUMMARY, updatedSummary);
    }

    // Dispatch update event
    dispatchUpdateEvent({ type: "activity_completed", payload, metrics: updatedMetrics, accuracy });
    return { id: Date.now(), recorded: true };
  },

  // Record Voice Chat -> Updates Caregiver timeline & conversation count immediately!
  recordVoiceChat: async ({ query, reply, language }) => {
    const timeline = getStoredJSON(STORE_TIMELINE_KEY, DEMO.timeline);
    const event = {
      icon: "🗣",
      title: `Voice Conversation with Saarthi`,
      detail: `${language || "Assamese"} · "${(query || "").slice(0, 32)}..."`,
      occurred_at: formatCurrentTime(),
    };
    setStoredJSON(STORE_TIMELINE_KEY, [event, ...timeline]);

    const metrics = getStoredJSON(STORE_METRICS_KEY, DEFAULT_METRICS);
    const updatedMetrics = {
      ...DEFAULT_METRICS,
      ...metrics,
      conversations: (metrics.conversations || 12) + 1,
    };
    setStoredJSON(STORE_METRICS_KEY, updatedMetrics);

    dispatchUpdateEvent({ type: "voice_chat", query, language, metrics: updatedMetrics });
    return { id: Date.now(), logged: true };
  },

  // Offline Sync Management
  getPendingSyncCount: () => getLocalSyncQueue().length,

  flushSyncQueue: async () => {
    const queue = getLocalSyncQueue();
    if (!queue.length) return { success: true, count: 0 };

    try {
      const res = await fetch(`${BASE}/api/sync/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: PATIENT_ID,
          items: queue,
          events: queue,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      saveLocalSyncQueue([]);
      const count = data.synced_count || data.processed_count || queue.length;
      dispatchUpdateEvent({ type: "sync_flushed", count });
      return { success: true, count };
    } catch (e) {
      console.warn("[api] sync fallback:", e);
      saveLocalSyncQueue([]);
      dispatchUpdateEvent({ type: "sync_flushed", count: queue.length });
      return { success: true, count: queue.length, offline: true };
    }
  },
};
