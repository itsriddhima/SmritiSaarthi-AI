/**
 * Unified speech synthesis, recognition anti-echo tracking, and rich Web Audio generators.
 */

export const globalSpeechTracker = {
  lastSpokenText: "",
  isSpeaking: false,
  speechEndTime: 0,
};

let cachedVoices = [];
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

let sharedAudioCtx = null;
function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

let emergencyAlarmInterval = null;
let emergencyOscillators = [];

export function playEmergencyAlarm() {
  stopEmergencyAlarm();
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playBeep = () => {
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      // Two-tone pulsating emergency siren
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.25);
      osc1.frequency.setValueAtTime(880, now + 0.5);

      osc2.frequency.setValueAtTime(1318.5, now);
      osc2.frequency.setValueAtTime(987.77, now + 0.25);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.setValueAtTime(0.35, now + 0.65);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.9);
      osc2.stop(now + 0.9);

      emergencyOscillators.push(osc1, osc2);
    };

    playBeep();
    emergencyAlarmInterval = setInterval(playBeep, 1300);
  } catch (e) {
    console.warn("Emergency alarm audio error:", e);
  }
}

export function stopEmergencyAlarm() {
  if (emergencyAlarmInterval) {
    clearInterval(emergencyAlarmInterval);
    emergencyAlarmInterval = null;
  }
  emergencyOscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch {}
  });
  emergencyOscillators = [];
}

export function playAudioTone(type = "bell") {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "bell") {
      // Temple Bell / Sacred Chime with deep resonant harmonics
      const freqs = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6
      const weights = [0.28, 0.15, 0.08, 0.04];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(weights[i], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.2);
      });
    } else if (type === "bird" || type === "cuckoo") {
      // Sweet Morning Birdsong / Cuckoo chirps
      const chirps = [
        { t: 0, f1: 1760, f2: 2400, dur: 0.14 },
        { t: 0.18, f1: 2200, f2: 3100, dur: 0.16 },
        { t: 0.45, f1: 1760, f2: 2600, dur: 0.18 },
        { t: 0.70, f1: 2400, f2: 3200, dur: 0.22 },
      ];
      chirps.forEach((c) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(c.f1, now + c.t);
        osc.frequency.exponentialRampToValueAtTime(c.f2, now + c.t + c.dur);
        gain.gain.setValueAtTime(0.001, now + c.t);
        gain.gain.linearRampToValueAtTime(0.2, now + c.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + c.t + c.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + c.t);
        osc.stop(now + c.t + c.dur);
      });
    } else if (type === "kettle") {
      // Whistling and boiling steam kettle
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.linearRampToValueAtTime(1450, now + 0.4);
      osc.frequency.linearRampToValueAtTime(1800, now + 1.2);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    } else if (type === "flute") {
      // Soulful Indian Bamboo Flute melody
      const notes = [
        { f: 587.33, t: 0, d: 0.35 },    // D5
        { f: 659.25, t: 0.32, d: 0.35 }, // E5
        { f: 783.99, t: 0.65, d: 0.45 }, // G5
        { f: 880.00, t: 1.05, d: 0.65 }, // A5
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.22, now + n.t + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
    } else if (type === "river" || type === "stream") {
      // Calming river wave swoop
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc2.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.9);
      osc.frequency.linearRampToValueAtTime(140, now + 2.0);
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.linearRampToValueAtTime(320, now + 1.0);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 2.2);
      osc2.stop(now + 2.2);
    } else if (type === "rain") {
      // Gentle rainfall drops
      for (let i = 0; i < 8; i++) {
        const dropTime = now + i * 0.18 + Math.random() * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(700 + Math.random() * 600, dropTime);
        gain.gain.setValueAtTime(0.12, dropTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, dropTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(dropTime);
        osc.stop(dropTime + 0.14);
      }
    } else if (type === "success") {
      // Joyous 4-note ascending chime
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.18, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.35);
      });
    } else {
      // Card flip / gentle tap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    console.warn("Web audio playback note:", e);
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  globalSpeechTracker.isSpeaking = false;
  globalSpeechTracker.speechEndTime = Date.now();
}

export function speakText(text, langName = "Assamese", onStart = null, onEnd = null) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    playAudioTone("success");
    if (onEnd) onEnd();
    return;
  }

  try {
    stopSpeaking();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Keep words, punctuation, and clear phrasing, remove only raw emoji symbols
    const cleanText = text
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) return;

    globalSpeechTracker.lastSpokenText = cleanText;
    globalSpeechTracker.isSpeaking = true;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();

    let langCode = "en-IN";
    if (langName === "Assamese" || langName === "as") langCode = "as-IN";
    else if (langName === "Hindi" || langName === "hi") langCode = "hi-IN";
    else if (langName === "Bengali" || langName === "bn") langCode = "bn-IN";
    else if (langName === "Bodo") langCode = "hi-IN";
    else if (langName === "Manipuri") langCode = "bn-IN";
    else if (langName === "English" || langName === "en") langCode = "en-IN";

    utterance.lang = langCode;

    let voice = voices.find((v) => v.lang === langCode || v.lang.startsWith(langCode.slice(0, 2)));
    if (!voice) {
      voice = voices.find((v) => v.lang === "hi-IN" || v.lang === "bn-IN" || v.lang === "en-IN" || (v.lang && v.lang.includes("IN")));
    }
    if (!voice && voices.length > 0) {
      voice = voices.find((v) => v.default) || voices[0];
    }

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      globalSpeechTracker.isSpeaking = true;
      if (onStart) onStart();
    };

    const handleEnd = () => {
      globalSpeechTracker.isSpeaking = false;
      globalSpeechTracker.speechEndTime = Date.now();
      if (onEnd) onEnd();
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    globalSpeechTracker.isSpeaking = false;
    globalSpeechTracker.speechEndTime = Date.now();
    playAudioTone("success");
    if (onEnd) onEnd();
  }
}
