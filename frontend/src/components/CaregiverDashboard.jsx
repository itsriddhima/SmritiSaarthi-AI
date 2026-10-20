import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Activity,
  Brain,
  Users,
  CheckCircle2,
  MessageCircle,
  AlertTriangle,
  FileText,
  Clock,
  PlusCircle,
  Stethoscope,
  ShieldCheck,
  RefreshCw,
  Bell,
  CheckCircle,
  Info,
  Calendar,
  Sparkles,
} from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, Pill } from "../theme";
import { api } from "../api";
import { DEMO } from "../demoData";
import { playEmergencyAlarm, stopEmergencyAlarm } from "../speechUtils";

function MetricCard({ label, value, subtext, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl p-4 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
      <div className="flex items-center justify-between mb-2">
        <span style={{ ...fontBody, color: C.inkSoft }} className="text-xs font-semibold">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${tone}15` }}>
          <Icon size={16} color={tone} />
        </div>
      </div>
      <p style={{ ...fontDisplay, color: C.ink }} className="text-2xl font-bold">{value}</p>
      {subtext && <p className="text-[11px] opacity-60 mt-0.5" style={fontBody}>{subtext}</p>}
    </div>
  );
}

export default function CaregiverDashboard({ caretaker, onSignOut }) {
  const currentCaretaker = caretaker || DEMO.caretakers[0];
  const isDoctor = currentCaretaker.role_type === "doctor";
  const [activeTab, setActiveTab] = useState(isDoctor ? "clinical" : "overview"); // overview | clinical | reminders
  const [range, setRange] = useState(7);
  const [patient, setPatient] = useState(DEMO.patient);
  const [metrics, setMetrics] = useState(DEMO.metrics);
  const [trend, setTrend] = useState(DEMO.trends[7]);
  const [timeline, setTimeline] = useState(DEMO.timeline);
  const [alerts, setAlerts] = useState(DEMO.alerts);
  const [reminders, setReminders] = useState(DEMO.reminders);
  const [clinicalSummary, setClinicalSummary] = useState(DEMO.clinical_summary);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [syncStatusMsg, setSyncStatusMsg] = useState(null);
  const [activeSos, setActiveSos] = useState(() => api.getActiveSos());

  // Modals / Quick forms
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    reminder_type: "medicine",
    time_label: "12:00 PM",
    dosage_or_detail: "",
    priority: "normal",
    icon: "💊",
  });

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({
    author_name: isDoctor ? currentCaretaker.name : "Dr. B. Barua, MD",
    author_role: isDoctor ? currentCaretaker.role : "Consultant Geriatrician, GMCH",
    note_text: "",
    clinical_stage: "Mild Cognitive Impairment (MCI) - GDS Stage 3",
    recommended_intervention: "",
  });

  const [recentLiveEvent, setRecentLiveEvent] = useState(null);

  const refreshData = () => {
    api.getPatient().then(setPatient);
    api.getMetrics().then(setMetrics);
    api.getTimeline().then(setTimeline);
    api.getAlerts().then(setAlerts);
    api.getReminders().then(setReminders);
    api.getClinicalSummary().then(setClinicalSummary);
    setPendingSyncCount(api.getPendingSyncCount());
    setActiveSos(api.getActiveSos());
  };

  useEffect(() => {
    if (activeSos) {
      playEmergencyAlarm();
    } else {
      stopEmergencyAlarm();
    }
    return () => {
      stopEmergencyAlarm();
    };
  }, [activeSos]);

  useEffect(() => {
    refreshData();
    // Subscribe to live events (SOS trigger, game completion, reminder checked, voice chat)
    const unsubscribe = api.subscribe((eventDetail) => {
      refreshData();
      if (eventDetail && eventDetail.type === "sos_alert_triggered") {
        setActiveSos(eventDetail.alert || api.getActiveSos());
        playEmergencyAlarm();
        setRecentLiveEvent("🚨 CRITICAL: Emergency SOS Triggered by Patient!");
      } else if (eventDetail && eventDetail.type === "sos_alert_resolved") {
        setActiveSos(null);
        stopEmergencyAlarm();
      } else if (eventDetail && (eventDetail.type === "activity_completed" || eventDetail.type === "reminder_toggled" || eventDetail.type === "voice_chat")) {
        setRecentLiveEvent("Live activity recorded from patient portal!");
        setTimeout(() => setRecentLiveEvent(null), 4000);
      }
    });
    return () => {
      unsubscribe();
      stopEmergencyAlarm();
    };
  }, []);

  useEffect(() => {
    api.getTrends(range).then(setTrend);
  }, [range]);

  const alert = alerts[0];

  const acknowledge = async () => {
    if (!alert) return;
    await api.acknowledgeAlert(alert.id);
    setAlerts((a) => a.map((x) => (x.id === alert.id ? { ...x, acknowledged: true } : x)));
  };

  const handleTurnOffSos = async () => {
    stopEmergencyAlarm();
    if (activeSos) {
      await api.resolveSosAlert(activeSos.id);
    }
    setActiveSos(null);
    refreshData();
    setRecentLiveEvent("✅ SOS Emergency Alarm turned off & marked resolved.");
    setTimeout(() => setRecentLiveEvent(null), 4500);
  };

  const handleSyncNow = async () => {
    setSyncStatusMsg("Syncing queue to cloud…");
    const res = await api.flushSyncQueue();
    if (res.success) {
      setSyncStatusMsg(`Successfully synced ${res.count} items!`);
      setPendingSyncCount(0);
      refreshData();
      setTimeout(() => setSyncStatusMsg(null), 3000);
    } else {
      setSyncStatusMsg(`Sync pending: offline fallback stored locally.`);
      setTimeout(() => setSyncStatusMsg(null), 3500);
    }
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!newReminder.title) return;
    const created = await api.createReminder(newReminder);
    setReminders((r) => [...r, created]);
    setShowAddReminderModal(false);
    setNewReminder({ title: "", reminder_type: "medicine", time_label: "12:00 PM", dosage_or_detail: "", priority: "normal", icon: "💊" });
    refreshData();
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.note_text) return;
    const created = await api.addClinicalNote(newNote);
    setClinicalSummary((prev) => ({
      ...prev,
      recent_notes: [created, ...(prev.recent_notes || [])],
    }));
    setShowAddNoteModal(false);
    setNewNote({ author_name: isDoctor ? currentCaretaker.name : "Dr. B. Barua, MD", author_role: isDoctor ? currentCaretaker.role : "Consultant Geriatrician, GMCH", note_text: "", clinical_stage: "Mild Cognitive Impairment (MCI)", recommended_intervention: "" });
    refreshData();
  };

  const drop = trend && trend.length ? trend[0].memory_accuracy - trend[trend.length - 1].memory_accuracy : 0;
  const completedReminders = (reminders || []).filter((r) => r.is_completed).length;
  const totalReminders = (reminders && reminders.length) ? reminders.length : 4;
  const adherencePercent = totalReminders > 0 ? Math.round((completedReminders / totalReminders) * 100) : 0;

  const safeCognitive = Number(metrics.cognitive_activity || metrics.memory_recall_accuracy || 82);
  const safeFamily = Number(metrics.family_recognition || metrics.family_recall_accuracy || metrics.face_recognition_accuracy || 94);
  const safeConversations = Number(metrics.conversations || metrics.voice_interactions_count || 12);

  const safeClinical = {
    clinical_stage: (clinicalSummary && clinicalSummary.clinical_stage) || (DEMO.clinical_summary && DEMO.clinical_summary.clinical_stage) || "Mild Cognitive Impairment (MCI) · GDS Stage 3",
    mini_cog_score: (clinicalSummary && clinicalSummary.mini_cog_score) || (DEMO.clinical_summary && DEMO.clinical_summary.mini_cog_score) || "3 / 5 (Mild Recall Latency)",
    primary_language: (clinicalSummary && clinicalSummary.primary_language) || (DEMO.clinical_summary && DEMO.clinical_summary.primary_language) || "Assamese (অসমীয়া)",
    memory_index: (clinicalSummary && clinicalSummary.memory_index) || 68.5,
    attention_index: (clinicalSummary && clinicalSummary.attention_index) || 74.0,
    executive_index: (clinicalSummary && clinicalSummary.executive_index) || 71.2,
    recommendations: (clinicalSummary && Array.isArray(clinicalSummary.recommendations) && clinicalSummary.recommendations.length > 0)
      ? clinicalSummary.recommendations
      : (DEMO.clinical_summary && DEMO.clinical_summary.recommendations) || [
          "Continue daily structured reminiscence with familiar family photographs & Bihu themes.",
          "Maintain consistent hydration reminders (min. 1.5L daily) and monitor evening sundowning symptoms.",
          "Encourage 10-15 minutes of low-stress auditory recognition games (temple bell, morning cuckoo).",
          "Next clinical geriatric checkup scheduled with Dr. B. Barua at GMCH on 15th next month.",
        ],
    recent_notes: (clinicalSummary && Array.isArray(clinicalSummary.recent_notes) && clinicalSummary.recent_notes.length > 0)
      ? clinicalSummary.recent_notes
      : (DEMO.clinical_summary && DEMO.clinical_summary.recent_notes) || [],
  };

  return (
    <div className="rounded-3xl p-6 shadow-sm" style={{ background: C.paperDeep }}>
      {/* Header Info Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="text-3xl w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: C.white }}>
            {currentCaretaker.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 style={{ ...fontDisplay, color: C.ink }} className="text-2xl font-bold">
                Good morning, {currentCaretaker.name}
              </h2>
              <Pill tone={currentCaretaker.badge_color || "sage"}>{currentCaretaker.role}</Pill>
            </div>
            <p className="text-xs opacity-75 mt-0.5" style={fontBody}>
              {currentCaretaker.hospital} · Monitoring <strong>{patient.name}</strong> (Age 74) · {safeClinical.clinical_stage}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
              style={fontBody}
            >
              Sign Out / Switch Portal
            </button>
          )}

          {pendingSyncCount > 0 && (
            <button
              onClick={handleSyncNow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold animate-pulse shadow-sm"
              style={{ background: C.goldSoft, color: "#8A6416" }}
            >
              <RefreshCw size={13} /> {pendingSyncCount} Offline Events · Tap to Sync
            </button>
          )}

          <Pill tone={drop > 10 ? "rose" : "sage"}>
            {drop > 10 ? "⚠️ Longitudinal Decline Alert" : "✓ Longitudinal Status Stable"}
          </Pill>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="mb-4 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-900 text-white flex items-center gap-2 animate-fade-in shadow-sm">
          <Sparkles size={14} className="text-amber-300" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* Live Event Notification Pill */}
      {recentLiveEvent && (
        <div className="mb-4 px-4 py-2.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="font-semibold">Live Patient Portal Activity Sync:</span>
            <span>{typeof recentLiveEvent === "string" ? recentLiveEvent : (recentLiveEvent && recentLiveEvent.summary) || "Live activity recorded from patient portal!"}</span>
          </div>
          <span className="text-[10px] opacity-70 font-mono">Just Now</span>
        </div>
      )}

      {/* PERSISTENT CRITICAL EMERGENCY SOS BANNER */}
      {activeSos && (
        <div className="mb-6 p-5 rounded-3xl text-white shadow-2xl border-4 border-rose-300 animate-pulse relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 50%, #7F1D1D 100%)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0 shadow-inner">
                <span className="text-3xl animate-bounce">🚨</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 style={fontDisplay} className="text-lg font-black tracking-wide uppercase text-white">
                    CRITICAL: Patient SOS Emergency Active!
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-red-900 font-extrabold text-[11px] uppercase tracking-wider animate-pulse shadow-sm">
                    🔊 Siren Active
                  </span>
                </div>
                <p className="text-xs text-rose-100 mt-1 font-medium leading-relaxed" style={fontBody}>
                  <strong>Aita Devi Barua</strong> triggered the Emergency Assistance SOS button from <strong>{activeSos.location || "Home Veranda, Guwahati"}</strong>.
                </p>
                <div className="flex items-center gap-4 mt-2 text-[11px] text-rose-200">
                  <span>⏰ Time: <strong>{activeSos.occurred_at || "Just now"}</strong></span>
                  <span>📍 Status: <strong>Immediate Caregiver Attention Required</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Call & Turn Off */}
            <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-end">
              <a
                href="tel:+919854098765"
                className="px-4 py-2.5 rounded-xl bg-white text-red-900 font-bold text-xs shadow-md hover:bg-rose-50 transition-all flex items-center gap-1.5 active:scale-95"
                style={fontBody}
              >
                📞 Call Son Raj (+91 98540 98765)
              </a>
              <a
                href="tel:108"
                className="px-4 py-2.5 rounded-xl bg-red-950 text-white font-bold text-xs border border-red-800 shadow-md hover:bg-black transition-all flex items-center gap-1.5 active:scale-95"
                style={fontBody}
              >
                🚑 Call 108 Ambulance
              </a>
              <button
                onClick={handleTurnOffSos}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 border-2 border-emerald-300"
                style={fontBody}
              >
                <CheckCircle size={16} />
                🔕 Acknowledge & Turn Off SOS Alarm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3 flex-wrap">
        {[
          { id: "overview", label: "Caregiver Overview", icon: Activity },
          { id: "clinical", label: "Clinical & Geriatric Summary", icon: Stethoscope },
          { id: "reminders", label: "Care & Medication Tracker", icon: Clock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-2xs"
            style={{
              background: activeTab === tab.id ? C.tealDeep : C.white,
              color: activeTab === tab.id ? C.white : C.inkSoft,
              border: `1px solid ${activeTab === tab.id ? C.tealDeep : C.paperDeep}`,
              ...fontBody,
            }}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              icon={Brain}
              label="Cognitive Activity"
              value={`${Math.round(safeCognitive)}%`}
              subtext="Daily target: 70%"
              tone={C.teal}
            />
            <MetricCard
              icon={Users}
              label="Family Recall"
              value={`${Math.round(safeFamily)}%`}
              subtext="Multi-sensory recognition"
              tone={C.gold}
            />
            <MetricCard
              icon={Clock}
              label="Care Adherence"
              value={`${adherencePercent}%`}
              subtext={`${completedReminders} of ${totalReminders} routine tasks done`}
              tone={adherencePercent >= 75 ? C.sage : C.rose}
            />
            <MetricCard
              icon={MessageCircle}
              label="Voice Saarthi Chats"
              value={`${safeConversations}`}
              subtext="Emotional reassurance queries"
              tone={C.rose}
            />
          </div>

          {/* Trend Chart (7, 30, 90 Days) */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <p style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-base">Longitudinal Cognitive Retention</p>
                <p className="text-xs opacity-60" style={fontBody}>Tracking autobiographical memory vs. family face recall</p>
              </div>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-full text-xs">
                {[7, 30, 90].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRange(r);
                      api.getTrends(r).then(setTrend);
                    }}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      range === r ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {r} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.teal} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={C.teal} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRecog" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.gold} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={C.gold} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis domain={[40, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: C.white, borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="memory_accuracy" name="Memory Recall %" stroke={C.teal} strokeWidth={2.5} fill="url(#colorMemory)" />
                  <Area type="monotone" dataKey="recognition_accuracy" name="Family Recall %" stroke={C.gold} strokeWidth={2} strokeDasharray="4 4" fill="url(#colorRecog)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cognitive Breakdown & Clinical Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
              <div className="flex items-center gap-2 mb-3">
                <Brain size={18} color={C.teal} />
                <h3 style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-base">Cognitive Dimension Indices</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Episodic Autobiographical Memory", score: safeClinical.memory_index, max: 100, color: C.teal },
                  { name: "Auditory Attention & Response", score: safeClinical.attention_index, max: 100, color: C.gold },
                  { name: "Executive Routine Following", score: safeClinical.executive_index, max: 100, color: "#7B8E71" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium" style={fontBody}>
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-bold font-mono">{Math.round(item.score)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%`, background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainable Care Alert Card */}
            {alert && (
              <div
                className="rounded-2xl p-5 shadow-sm border transition-all"
                style={{
                  background: alert.acknowledged ? C.white : C.roseSoft,
                  borderColor: alert.acknowledged ? C.paperDeep : C.rose,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} color={alert.acknowledged ? C.inkSoft : C.rose} />
                    <p style={{ ...fontDisplay, color: C.ink }} className="font-bold text-sm">
                      Clinical Pattern Alert
                    </p>
                  </div>
                  <Pill tone={alert.acknowledged ? "sage" : "rose"}>
                    {alert.acknowledged ? "✓ Acknowledged" : `Severity: ${alert.severity}`}
                  </Pill>
                </div>

                <p className="text-xs font-semibold mt-2" style={{ ...fontBody, color: C.ink }}>
                  {alert.title}
                </p>
                <p className="text-xs opacity-75 mt-1 leading-relaxed" style={fontBody}>
                  {alert.explanation}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-white/80 border border-slate-200">
                  <p className="text-[11px] font-bold text-teal-900 uppercase tracking-wide">💡 AI Recommendation:</p>
                  <p className="text-xs text-slate-700 mt-0.5" style={fontBody}>
                    {alert.suggested_action}
                  </p>
                </div>

                {!alert.acknowledged && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={acknowledge}
                      className="text-xs px-4 py-2 rounded-full font-semibold text-white shadow-sm transition-transform active:scale-95"
                      style={{ background: C.tealDeep, ...fontBody }}
                    >
                      Acknowledge & Mark Reviewed
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Today's Activity Journey Timeline */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
            <p style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-base mb-3">Today's Patient Activity Journey</p>
            <div className="space-y-3">
              {(timeline || []).map((t, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2.5 last:border-0 border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{t.icon}</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ ...fontBody, color: C.ink }}>{t.title}</p>
                      <p className="text-[11px] opacity-60" style={fontBody}>{t.detail}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono opacity-50">{t.occurred_at}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLINICAL & GERIATRICIAN SUMMARY */}
      {activeTab === "clinical" && (
        <div className="space-y-6">
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <Stethoscope size={22} color={C.teal} />
                <div>
                  <h3 style={{ ...fontDisplay, color: C.ink }} className="font-bold text-lg">Geriatric Assessment Overview</h3>
                  <p className="text-xs opacity-60" style={fontBody}>GMCH Geriatric Memory Clinic · Dr. B. Barua</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddNoteModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-transform active:scale-95"
                style={{ background: C.tealDeep }}
              >
                <PlusCircle size={14} /> Add Clinical Note
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl p-3.5" style={{ background: C.paper }}>
                <p className="text-[11px] opacity-60 uppercase font-semibold" style={fontBody}>Clinical Diagnosis</p>
                <p className="text-sm font-bold text-teal-900 mt-1">{safeClinical.clinical_stage}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: C.paper }}>
                <p className="text-[11px] opacity-60 uppercase font-semibold" style={fontBody}>Mini-Cog Baseline Score</p>
                <p className="text-sm font-bold text-teal-900 mt-1">{safeClinical.mini_cog_score}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: C.paper }}>
                <p className="text-[11px] opacity-60 uppercase font-semibold" style={fontBody}>Preferred Language</p>
                <p className="text-sm font-bold text-teal-900 mt-1">{safeClinical.primary_language}</p>
              </div>
            </div>

            {/* Doctor's Care Directives */}
            <div className="rounded-xl p-4 mb-5" style={{ background: C.sageSoft }}>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-950 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={16} color={C.teal} /> Clinician Recommendations for Home Care:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-800 list-disc list-inside leading-relaxed" style={fontBody}>
                {safeClinical.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* Assessment History */}
            <h4 style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-sm mb-3">Clinical Notes & Observations History:</h4>
            <div className="space-y-3">
              {safeClinical.recent_notes.map((note) => (
                <div key={note.id} className="rounded-xl p-4 border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: C.ink }}>{note.author_name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">{note.author_role}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{note.created_at}</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed" style={fontBody}>{note.note_text}</p>
                  {note.recommended_intervention && (
                    <p className="text-xs font-semibold text-teal-800 mt-1">
                      💡 Intervention: {note.recommended_intervention}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CARE & MEDICATION TRACKER */}
      {activeTab === "reminders" && (
        <div className="space-y-6">
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 style={{ ...fontDisplay, color: C.ink }} className="font-bold text-lg">Daily Care & Medication Adherence</h3>
                <p className="text-xs opacity-60" style={fontBody}>Overall Adherence: {adherencePercent}% ({completedReminders} of {reminders.length} completed)</p>
              </div>
              <button
                onClick={() => setShowAddReminderModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-transform active:scale-95"
                style={{ background: C.tealDeep }}
              >
                <PlusCircle size={14} /> Add Reminder
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reminders.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl p-4 border transition-all"
                  style={{
                    background: r.is_completed ? C.sageSoft : C.paper,
                    borderColor: r.is_completed ? C.sage : C.paperDeep,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{r.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold" style={{ color: C.ink }}>{r.title}</p>
                          {r.priority === "high" && <Pill tone="rose">High</Pill>}
                        </div>
                        <p className="text-xs text-teal-800 font-semibold mt-0.5">{r.time_label}</p>
                        {r.dosage_or_detail && <p className="text-[11px] opacity-70 mt-1">{r.dosage_or_detail}</p>}
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        await api.toggleReminder(r.id, r.is_completed);
                        refreshData();
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg font-semibold transition-transform active:scale-95 shadow-2xs"
                      style={{
                        background: r.is_completed ? C.tealDeep : C.white,
                        color: r.is_completed ? C.white : C.inkSoft,
                        border: `1px solid ${r.is_completed ? C.tealDeep : C.paperDeep}`,
                        ...fontBody,
                      }}
                    >
                      {r.is_completed ? "✓ Done" : "Mark Done"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Reminder */}
      {showAddReminderModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="rounded-3xl p-6 max-w-md w-full shadow-2xl" style={{ background: C.white }}>
            <h3 style={{ ...fontDisplay, color: C.ink }} className="font-bold text-lg mb-3">Add Care Reminder</h3>
            <form onSubmit={handleAddReminder} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Reminder Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Hydration (Warm Water)"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold block mb-1">Type</label>
                  <select
                    value={newReminder.reminder_type}
                    onChange={(e) => {
                      const t = e.target.value;
                      const iconMap = { medicine: "💊", hydration: "💧", activity: "🌿", appointment: "🩺" };
                      setNewReminder({ ...newReminder, reminder_type: t, icon: iconMap[t] || "⏰" });
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                  >
                    <option value="medicine">Medicine</option>
                    <option value="hydration">Hydration</option>
                    <option value="activity">Daily Activity</option>
                    <option value="appointment">Appointment</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 02:00 PM"
                    value={newReminder.time_label}
                    onChange={(e) => setNewReminder({ ...newReminder, time_label: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Dosage or Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. 1 glass warm water with pinch of tulsi"
                  value={newReminder.dosage_or_detail}
                  onChange={(e) => setNewReminder({ ...newReminder, dosage_or_detail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReminderModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                  style={{ background: C.tealDeep }}
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Clinical Note */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="rounded-3xl p-6 max-w-md w-full shadow-2xl" style={{ background: C.white }}>
            <h3 style={{ ...fontDisplay, color: C.ink }} className="font-bold text-lg mb-3">Add Clinical Assessment Note</h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Clinician / Assessor Name</label>
                <input
                  type="text"
                  required
                  value={newNote.author_name}
                  onChange={(e) => setNewNote({ ...newNote, author_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Clinical Observation & Note</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Patient showed improved recall of Bihu festival memories today..."
                  value={newNote.note_text}
                  onChange={(e) => setNewNote({ ...newNote, note_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Recommended Intervention (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Continue twice daily reminiscence games"
                  value={newNote.recommended_intervention}
                  onChange={(e) => setNewNote({ ...newNote, recommended_intervention: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-teal-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                  style={{ background: C.tealDeep }}
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
