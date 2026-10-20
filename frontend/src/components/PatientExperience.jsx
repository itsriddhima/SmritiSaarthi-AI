import React, { useEffect, useState, useRef } from "react";
import {
  Mic,
  Heart,
  Sparkles,
  ArrowLeft,
  Volume2,
  Globe2,
  ChevronRight,
  CheckCircle,
  Clock,
  Bell,
  RefreshCw,
  Award,
  VolumeX,
  Send,
  Sliders,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { C, fontDisplay, fontBody, Pill } from "../theme";
import { api } from "../api";
import { DEMO } from "../demoData";

import { playAudioTone, speakText, stopSpeaking, globalSpeechTracker } from "../speechUtils";

// Helper to get active language dictionary
function getLangDict(lang = "Assamese") {
  return (DEMO.i18n && DEMO.i18n[lang]) || DEMO.i18n.Assamese;
}

// Helper to get active language games dataset
function getLangGames(lang = "Assamese") {
  return (DEMO.gamesDataByLang && DEMO.gamesDataByLang[lang]) || DEMO.gamesDataByLang.Assamese;
}

// --- Common UI Components ---

function BigButton({ icon: Icon, label, subtext, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-3xl p-5 transition-all active:scale-95 hover:-translate-y-0.5 shadow-sm hover:shadow-md text-center group"
      style={{ background: C.white, border: `2px solid ${C.paperDeep}` }}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-105" style={{ background: accent }}>
        <Icon size={28} color={C.white} strokeWidth={2.2} />
      </div>
      <span style={{ ...fontDisplay, color: C.ink }} className="text-base font-semibold">{label}</span>
      {subtext && <span style={{ ...fontBody, color: C.inkSoft }} className="text-xs opacity-75">{subtext}</span>}
    </button>
  );
}

function PatientAvatar({ speaking }) {
  return (
    <div className="relative w-28 h-28 mx-auto">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${C.gold}, ${C.teal})`,
          animation: speaking ? "breathe 1.1s ease-in-out infinite" : "breathe 3.2s ease-in-out infinite",
          boxShadow: speaking ? `0 0 24px ${C.gold}` : "0 4px 12px rgba(0,0,0,0.08)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-4xl select-none">🧑🏽‍🦳</div>
      <style>{`@keyframes breathe { 0%,100%{ transform: scale(1);} 50%{ transform: scale(1.08);} }`}</style>
    </div>
  );
}

function Screen({ title, onBack, badge, children }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-sm"
            style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
            title="Go back"
          >
            <ArrowLeft size={18} color={C.ink} />
          </button>
          <h2 style={{ ...fontDisplay, color: C.ink }} className="text-xl font-semibold">{title}</h2>
        </div>
        {badge && <Pill tone="sage">{badge}</Pill>}
      </div>
      {children}
    </div>
  );
}

// --- Voice Assistant & Multilingual Dialogue ---

function generateSmartReply(userText, lang = "Assamese", patientName = "Aita") {
  if (!userText || !userText.trim()) return "";
  const query = userText.toLowerCase().trim();
  const tokens = query.split(/\s+/);
  const intents = DEMO.conversationalIntents || [];

  let bestIntent = null;
  let maxScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const cleanKw = kw.toLowerCase();
      if (query.includes(cleanKw)) {
        score += cleanKw.length > 3 ? 3 : 2;
      } else if (tokens.some((t) => t.includes(cleanKw) || cleanKw.includes(t))) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && maxScore > 0) {
    const pool =
      bestIntent.responses[lang] ||
      bestIntent.responses["English"] ||
      bestIntent.responses["Assamese"] ||
      [];
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }

  const generativeFallbacks = {
    Assamese: [
      `আইতা ❤️ মই আপোনাৰ কথা শুনি আছো। আপুনি নিজৰ শান্ত ঘৰত সম্পূৰ্ণ সুৰক্ষিত আৰু মৰমৰ মাজত আছে। আহক আমি বাৰাণ্ডাত বহি অলপ জিৰণি লওঁ?`,
      `নমস্কাৰ ${patientName} ❤️ মই আপোনাৰ কাষতেই আছো। আপোনাৰ কিবা প্ৰয়োজন আছে নেকি কওকচোন?`,
      `আইতা, আপুনি মনত পেলাব পাৰেনে আমাৰ মাজুলীৰ সেই সোণালী বিহু উৎসৱৰ কথা? কিমান যে আনন্দময় আছিল!`,
      `মই আপোনাৰ লগত কথা পাতি বৰ ভাল পাওঁ আইতা। একো চিন্তা নকৰিব, আপোনাৰ পৰিয়াল আপোনাৰ কাষতেই আছে।`,
    ],
    Hindi: [
      `दादी जी ❤️ मैं आपकी बात बड़े ध्यान से सुन रहा हूँ। आप अपने प्यारे घर पर पूरी तरह सुरक्षित हैं। क्या आप एक कप गर्म चाय पीना चाहेंगी?`,
      `नमस्ते ${patientName} जी! मैं आपके पास ही हूँ। आपका दिन बहुत शुभ और मंगलमय हो।`,
      `दादी जी, परिवार के सभी लोग आपसे बहुत प्रेम करते हैं और हमेशा आपके साथ हैं।`,
    ],
    Bengali: [
      `ঠাকুমা ❤️ আমি আপনার কথা মন দিয়ে শুনছি। আপনি একদম নিশ্চিন্ত থাকুন, আপনার পরিবার আপনার পাশেই আছে।`,
      `নমস্কার ${patientName} ❤️ আপনি কেমন আছেন? চলুন বারান্দায় বসে একটু গল্প করি।`,
    ],
    English: [
      `I hear you, ${patientName} ❤️ I am right here by your side. Everything is peaceful and safe in your lovely home.`,
      `It is so wonderful talking with you, Aita ❤️ Would you like to hear a soothing memory or take a gentle rest?`,
      `You are surrounded by love and warmth at home, Aita. What would you like to talk about next?`,
    ],
    Bodo: [
      `आइ ❤️ आं नोंथांनि लोगोआवनो दं। नोंथाङा गोजोनै था।`,
    ],
    Manipuri: [
      `ইমা ❤️ ঐহাক অদোমগী পাউতাক পীনবা য়াম্না নুংঙাইনা লৈরি।`,
    ],
  };

  const pool = generativeFallbacks[lang] || generativeFallbacks["English"];
  return pool[Math.floor(Math.random() * pool.length)];
}

function TalkToSaathi({ onBack, patientName, initialLang = "Assamese" }) {
  const [currentLang, setCurrentLang] = useState(initialLang);
  const [isListening, setIsListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastSpokenAiTextRef = useRef("");

  const t = getLangDict(currentLang);

  useEffect(() => {
    setCurrentLang(initialLang);
  }, [initialLang]);

  // Clean up speech and recognition when exiting component
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const phrases = (DEMO.saathiPhrasesByLang && DEMO.saathiPhrasesByLang[currentLang]) || DEMO.saathiPhrasesByLang.Assamese;

  const localizedPatientName =
    patientName ||
    (currentLang === "Assamese" ? "আইতা" :
     currentLang === "Hindi" ? "दादी जी" :
     currentLang === "Bengali" ? "ঠাকুমা" :
     currentLang === "English" ? "Aita" :
     currentLang === "Bodo" ? "आबौ" :
     currentLang === "Manipuri" ? "ইবেন" : "Aita");

  const initialGreeting = currentLang === "Assamese"
    ? `নমস্কাৰ ${localizedPatientName} ❤️ মই আপোনাৰ স্মৃতিসাৰথী। কি ক'ব বিচাৰে?`
    : currentLang === "Hindi"
    ? `नमस्ते ${localizedPatientName} ❤️ मैं आपका स्मृतिसारथी हूँ। मैं आपके साथ हूँ।`
    : currentLang === "Bengali"
    ? `নমস্কার ${localizedPatientName} ❤️ আমি আপনার স্মৃতিসাৰথী। আপনার সাথে আছি।`
    : currentLang === "Bodo"
    ? `खुलुमबाय ${localizedPatientName} ❤️ आं नोंथांनि सारथी।`
    : currentLang === "Manipuri"
    ? `খুরুমজরি ${localizedPatientName} ❤️ ঐহাক অদোমগী সাৰথীনি।`
    : `Good morning, ${localizedPatientName} ❤️ I'm here with you. What would you like to talk about?`;

  const [log, setLog] = useState([
    { who: "saathi", text: initialGreeting, lang: currentLang },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [log, speaking]);

  const say = (patientText, customReply = null) => {
    if (!patientText || !patientText.trim()) return;

    // Immediately stop any microphone recognition before AI speaks
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }
    setIsListening(false);

    const replyText = customReply || generateSmartReply(patientText, currentLang, patientName);
    lastSpokenAiTextRef.current = replyText;
    
    setLog((l) => [...l, { who: "patient", text: patientText, lang: currentLang }]);
    setInputText("");
    setSpeaking(true);

    api.recordVoiceChat({ query: patientText, reply: replyText, language: currentLang });

    setTimeout(() => {
      setLog((l) => [...l, { who: "saathi", text: replyText, lang: currentLang }]);
      speakText(
        replyText,
        currentLang,
        () => setSpeaking(true),
        () => setSpeaking(false)
      );
    }, 450);
  };

  const startVoiceInput = () => {
    // 1. Immediately cut off AI audio if currently speaking or lingering in buffer!
    stopSpeaking();
    setSpeaking(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const sample = phrases[Math.floor(Math.random() * phrases.length)];
      say(sample.patient, sample.reply);
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }

      // Small 180ms delay to ensure speaker hardware buffer clears and microphone doesn't pick up trailing echo
      setTimeout(() => {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = currentLang === "Assamese" ? "as-IN" : currentLang === "Hindi" ? "hi-IN" : currentLang === "Bengali" ? "bn-IN" : "en-IN";
        recognition.interimResults = false;
        recognition.continuous = false;
        setIsListening(true);

        recognition.onresult = (event) => {
          setIsListening(false);
          const rawTranscript = (event.results[0][0]?.transcript || "").trim();
          if (!rawTranscript) return;

          // 2. Anti-Echo & Self-Voice Filter:
          // Check if the recognized text is actually the AI's own last spoken words
          const cleanTranscript = rawTranscript.toLowerCase().replace(/[^\w\s\u0980-\u09FF\u0900-\u097F]/gu, "");
          const lastAiText = (lastSpokenAiTextRef.current || globalSpeechTracker.lastSpokenText || "")
            .toLowerCase()
            .replace(/[^\w\s\u0980-\u09FF\u0900-\u097F]/gu, "");

          const timeSinceSpeech = Date.now() - (globalSpeechTracker.speechEndTime || 0);

          // If microphone heard words that match AI's own recent sentence within 2.5 seconds of speaking, ignore it!
          if (timeSinceSpeech < 2500 && lastAiText && cleanTranscript) {
            const isSelfEcho =
              lastAiText.includes(cleanTranscript) ||
              (cleanTranscript.length > 6 && lastAiText.slice(0, 40).includes(cleanTranscript.slice(0, 20))) ||
              (cleanTranscript.length > 6 && cleanTranscript.includes(lastAiText.slice(0, 20)));

            if (isSelfEcho) {
              console.warn("[Voice AI Anti-Echo] Ignored self-voice speaker loop:", rawTranscript);
              return;
            }
          }

          say(rawTranscript);
        };

        recognition.onerror = (err) => {
          setIsListening(false);
          console.warn("[SpeechRecognition error]:", err);
        };

        recognition.onend = () => setIsListening(false);
        recognition.start();
      }, 180);
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <Screen onBack={onBack} title={t.talkTitle || "Talk to Saarthi"}>
      <PatientAvatar speaking={speaking || isListening} />

      {/* Language Selector in Talk screen */}
      <div className="flex justify-center flex-wrap gap-1.5 mt-3 mb-3">
        {DEMO.languages.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              setCurrentLang(l.name);
              speakText(l.welcome, l.name);
            }}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background: currentLang === l.name ? C.tealDeep : C.white,
              color: currentLang === l.name ? C.white : C.inkSoft,
              border: `1px solid ${currentLang === l.name ? C.tealDeep : C.paperDeep}`,
              ...fontBody,
            }}
          >
            {l.native} ({l.name})
          </button>
        ))}
      </div>

      {/* Voice Status Indicator */}
      {speaking && (
        <div className="text-center mb-2 flex items-center justify-center gap-1.5 text-xs text-teal-800 font-semibold animate-pulse">
          <Volume2 size={15} />
          <span>{t.saathiSpeaking || "Saarthi is speaking aloud…"}</span>
        </div>
      )}

      {/* Message Stream */}
      <div className="space-y-3 max-h-56 overflow-y-auto px-1 py-1 rounded-2xl bg-white/40 border border-slate-200/60 p-2 shadow-inner">
        {log.map((m, i) => (
          <div key={i} className={`flex ${m.who === "patient" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs"
              style={{
                background: m.who === "patient" ? C.tealDeep : C.white,
                color: m.who === "patient" ? C.white : C.ink,
                ...fontBody,
                border: m.who === "saathi" ? `1px solid ${C.paperDeep}` : "none",
              }}
            >
              {m.text}
              {m.who === "saathi" && (
                <button
                  onClick={() => speakText(m.text, m.lang || currentLang, () => setSpeaking(true), () => setSpeaking(false))}
                  className="mt-1.5 flex items-center gap-1 opacity-80 hover:opacity-100 text-xs font-medium text-teal-800"
                >
                  <Volume2 size={13} /> {t.tapToListen || "Tap to Listen Aloud"}
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Text Input + Mic Bar */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") say(inputText);
          }}
          placeholder={t.typePlaceholder || `Type message to Saathi (${currentLang})…`}
          className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          style={fontBody}
        />
        <button
          onClick={() => say(inputText)}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl text-white transition-transform active:scale-95 disabled:opacity-40"
          style={{ background: C.tealDeep }}
          title={t.send || "Send"}
        >
          <Send size={16} />
        </button>
      </div>

      {/* Live Voice Input Button */}
      <div className="mt-3 flex flex-col items-center gap-1.5">
        <button
          onClick={startVoiceInput}
          className={`w-full py-3 px-6 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-md ${
            isListening ? "animate-pulse" : ""
          }`}
          style={{ background: isListening ? C.rose : C.teal, color: C.white, ...fontBody }}
        >
          <Mic size={20} />
          <span className="font-semibold text-sm">
            {isListening ? (t.listening || "Listening closely… Speak now") : `${t.tapToSpeak || "Tap to Speak Aloud"} (${currentLang})`}
          </span>
        </button>
      </div>

      {/* Quick Phrases */}
      <div className="mt-2 grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto">
        {phrases.map((p, i) => (
          <button
            key={i}
            onClick={() => say(p.patient, p.reply)}
            className="text-left px-3.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors hover:bg-white"
            style={{ background: C.paperDeep, border: `1px solid ${C.paperDeep}`, color: C.ink, ...fontBody }}
          >
            <span>🎙 {p.patient}</span>
            <ChevronRight size={14} color={C.inkSoft} />
          </button>
        ))}
      </div>
    </Screen>
  );
}

// --- Interactive Cognitive Games (Fully Multilingual + Difficulty Scaled) ---

// 1. Who Am I? (Family Memory)
function WhoAmI({ family, onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const levelQuestions = (gamesData.whoAmI && gamesData.whoAmI[difficultyLevel]) || [
    { id: "raj", question: "Who is your beloved son?", correctId: 1, options: [1, 2], hint: "He brings tea biscuits." },
    { id: "riya", question: "Who is your sweet granddaughter?", correctId: 2, options: [2, 3], hint: "She dances Bihu with you." },
  ];

  const currentQ = levelQuestions[round % levelQuestions.length];

  // Robust semantic resolution of target family member
  const targetMember =
    family.find((f) => {
      const qId = (currentQ.id || "").toLowerCase();
      const n = (f.name || "").toLowerCase();
      const r = (f.relation || "").toLowerCase();
      if (qId === "raj" && (n.includes("raj") || r.includes("son"))) return true;
      if (qId === "riya" && (n.includes("riya") || r.includes("granddaughter"))) return true;
      if (qId === "ananya" && (n.includes("ananya") || r.includes("daughter-in-law") || r.includes("बहू") || r.includes("বোৱাৰী"))) return true;
      if (qId === "pranab" && (n.includes("pranab") || r.includes("husband") || r.includes("স্বামী") || r.includes("पति"))) return true;
      if (qId === "kakoli" && (n.includes("kakoli") || r.includes("sister") || r.includes("ভনী") || r.includes("बहन"))) return true;
      return f.id === currentQ.correctId;
    }) ||
    family.find((f) => f.id === currentQ.correctId) ||
    family[0];

  const choiceMembers = (currentQ.options || [1, 2]).map((optId) => {
    if (optId === 1) return family.find((f) => f.name.toLowerCase().includes("raj")) || family[0];
    if (optId === 2) return family.find((f) => f.name.toLowerCase().includes("riya")) || family[1] || family[0];
    if (optId === 3) return family.find((f) => f.name.toLowerCase().includes("ananya")) || family[2] || family[0];
    if (optId === 4) return family.find((f) => f.name.toLowerCase().includes("pranab")) || family[3] || family[0];
    if (optId === 5) return family.find((f) => f.name.toLowerCase().includes("kakoli")) || family[4] || family[0];
    return family.find((f) => f.id === optId) || family[0];
  });

  const pick = (opt) => {
    const qId = (currentQ.id || "").toLowerCase();
    const optName = (opt.name || "").toLowerCase();
    const isCorrect =
      opt.id === targetMember.id ||
      (qId === "raj" && optName.includes("raj")) ||
      (qId === "riya" && optName.includes("riya")) ||
      (qId === "ananya" && optName.includes("ananya")) ||
      (qId === "pranab" && optName.includes("pranab")) ||
      (qId === "kakoli" && optName.includes("kakoli"));

    if (isCorrect) {
      setFeedback("good");
      playAudioTone("success");
      const targetRelation =
        (targetMember.relationsByLang && targetMember.relationsByLang[selectedLanguage]) ||
        targetMember.relation;
      speakText(`${opt.name}! ${targetRelation}`, selectedLanguage);
      setTimeout(() => {
        setFeedback(null);
        if (round >= levelQuestions.length - 1) {
          const finalAcc = Math.max(
            10,
            Math.round((levelQuestions.length / (levelQuestions.length + mistakes)) * 100)
          );
          api.recordActivityResult({
            activity_type: "who_am_i",
            activity_name: "Who Am I? (Family Recall)",
            accuracy: finalAcc,
            difficulty_level: difficultyLevel,
            response_time_seconds: 3.2,
          });
          onComplete("Who Am I?");
        } else {
          setRound((r) => r + 1);
        }
      }, 950);
    } else {
      setMistakes((m) => m + 1);
      setFeedback("retry");
      playAudioTone("card_flip");
      api.recordMistake({ activity_name: "Who Am I? (Family Recall)", activity_type: "who_am_i" });
      setTimeout(() => setFeedback(null), 850);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-lg font-medium">
          {currentQ.question}
        </p>
        <p className="text-xs opacity-60 mt-1" style={fontBody}>
          {t.question} {round + 1} {t.of} {levelQuestions.length}
        </p>
      </div>

      <div className="flex justify-center gap-3 flex-wrap my-4">
        {choiceMembers.map((o) => {
          const relText = (o.relationsByLang && o.relationsByLang[selectedLanguage]) || o.relation;
          return (
            <button
              key={o.id}
              onClick={() => pick(o)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 hover:shadow-md"
              style={{ background: C.white, border: `2px solid ${C.paperDeep}`, width: "115px", height: "120px" }}
            >
              <span className="text-4xl">{o.emoji}</span>
              <span style={{ ...fontBody, color: C.ink }} className="text-xs font-semibold mt-1">{o.name}</span>
              <span className="text-[10px] opacity-60 text-center" style={fontBody}>{relText}</span>
            </button>
          );
        })}
      </div>

      {feedback === "good" && <Pill tone="sage">✨ {targetMember.name}!</Pill>}
      {feedback === "retry" && <Pill tone="gold">💡 {currentQ.hint}</Pill>}
    </div>
  );
}

// 2. Memory Card Match
function MemoryPairs({ onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const PAIR_ITEMS = (gamesData.memoryPairs && gamesData.memoryPairs[difficultyLevel]) || [
    { id: "tea", label: "Assam Tea", emoji: "🍵" },
    { id: "flower", label: "Marigold", emoji: "🌼" },
  ];

  const [cards, setCards] = useState(() => {
    const deck = [...PAIR_ITEMS, ...PAIR_ITEMS].map((item, idx) => ({
      uniqueId: idx,
      pairId: item.id,
      emoji: item.emoji,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    }));
    return deck.sort(() => Math.random() - 0.5);
  });

  const [selected, setSelected] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [mismatchCount, setMismatchCount] = useState(0);

  useEffect(() => {
    const deck = [...PAIR_ITEMS, ...PAIR_ITEMS].map((item, idx) => ({
      uniqueId: idx,
      pairId: item.id,
      emoji: item.emoji,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(deck.sort(() => Math.random() - 0.5));
    setSelected([]);
    setMatchedCount(0);
    setMismatchCount(0);
  }, [difficultyLevel, selectedLanguage]);

  const handleCardClick = (idx) => {
    if (cards[idx].isFlipped || cards[idx].isMatched || selected.length === 2) return;

    playAudioTone("card_flip");
    const updated = [...cards];
    updated[idx].isFlipped = true;
    setCards(updated);

    const newSelected = [...selected, idx];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (updated[first].pairId === updated[second].pairId) {
        playAudioTone("success");
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[first].isMatched = true;
            next[second].isMatched = true;
            return next;
          });
          setSelected([]);
          setMatchedCount((c) => {
            const nextCount = c + 1;
            if (nextCount === PAIR_ITEMS.length) {
              speakText(t.allPairsMatched || "All pairs matched!", selectedLanguage);
              const finalAcc = Math.max(10, Math.round((PAIR_ITEMS.length / (PAIR_ITEMS.length + mismatchCount)) * 100));
              api.recordActivityResult({
                activity_type: "pairs",
                activity_name: "Memory Card Match",
                accuracy: finalAcc,
                difficulty_level: difficultyLevel,
                response_time_seconds: 4.5,
              });
              setTimeout(() => onComplete("Memory Card Match"), 800);
            }
            return nextCount;
          });
        }, 450);
      } else {
        setMismatchCount((m) => m + 1);
        api.recordMistake({ activity_name: "Memory Card Match", activity_type: "pairs" });
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[first].isFlipped = false;
            next[second].isFlipped = false;
            return next;
          });
          setSelected([]);
        }, 850);
      }
    }
  };

  const gridCols = PAIR_ITEMS.length === 2 ? "grid-cols-2 max-w-[220px]" : PAIR_ITEMS.length === 3 ? "grid-cols-3 max-w-[310px]" : "grid-cols-4 max-w-[380px]";

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-lg font-medium">Memory Card Match</p>
        <p className="text-xs opacity-60 mt-1" style={fontBody}>
          {matchedCount} / {PAIR_ITEMS.length}
        </p>
      </div>

      <div className={`grid ${gridCols} gap-3 mx-auto justify-items-center`}>
        {cards.map((card, idx) => (
          <button
            key={card.uniqueId}
            onClick={() => handleCardClick(idx)}
            className="w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95"
            style={{
              background: card.isMatched ? C.sageSoft : card.isFlipped ? C.white : C.tealDeep,
              border: `2px solid ${card.isMatched ? C.sage : C.paperDeep}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            {card.isFlipped || card.isMatched ? (
              <>
                <span className="text-3xl">{card.emoji}</span>
                <span className="text-[10px] font-semibold mt-1 text-center px-1 leading-tight" style={{ color: C.ink, ...fontBody }}>
                  {card.label}
                </span>
              </>
            ) : (
              <span className="text-2xl opacity-70">✨</span>
            )}
          </button>
        ))}
      </div>

      {matchedCount === PAIR_ITEMS.length && (
        <div className="pt-2">
          <Pill tone="sage">{t.allPairsMatched || "🎉 All pairs matched!"}</Pill>
        </div>
      )}
    </div>
  );
}

// 3. Daily Routine Recall
function DailyRoutineRecall({ onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const ROUTINE_STEPS = (gamesData.routineRecall && gamesData.routineRecall[difficultyLevel]) || [
    { step: 1, label: "Morning Warm Assam Tea", emoji: "🍵", time: "Morning" },
    { step: 2, label: "Nutritious Midday Lunch", emoji: "🍲", time: "Afternoon" },
    { step: 3, label: "Gentle Veranda Walk", emoji: "🚶🏽‍♀️", time: "Evening" },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const targetStep = ROUTINE_STEPS[currentStepIndex] || ROUTINE_STEPS[0];

  const [shuffledOptions, setShuffledOptions] = useState(() => [...ROUTINE_STEPS].sort(() => Math.random() - 0.5));

  useEffect(() => {
    setCurrentStepIndex(0);
    setShuffledOptions([...ROUTINE_STEPS].sort(() => Math.random() - 0.5));
  }, [difficultyLevel, selectedLanguage]);

  const [mistakes, setMistakes] = useState(0);

  const handlePick = (stepItem) => {
    if (stepItem.step === targetStep.step) {
      setFeedback("good");
      playAudioTone("success");
      speakText(`${t.step} ${currentStepIndex + 1}: ${stepItem.label}`, selectedLanguage);
      setTimeout(() => {
        setFeedback(null);
        if (currentStepIndex >= ROUTINE_STEPS.length - 1) {
          const finalAcc = Math.max(10, Math.round((ROUTINE_STEPS.length / (ROUTINE_STEPS.length + mistakes)) * 100));
          api.recordActivityResult({
            activity_type: "routine",
            activity_name: "Daily Routine Sequencer",
            accuracy: finalAcc,
            difficulty_level: difficultyLevel,
            response_time_seconds: 3.6,
          });
          onComplete("Daily Routine Recall");
        } else {
          setCurrentStepIndex((idx) => idx + 1);
        }
      }, 900);
    } else {
      setMistakes((m) => m + 1);
      setFeedback("retry");
      playAudioTone("card_flip");
      api.recordMistake({ activity_name: "Daily Routine Sequencer", activity_type: "routine" });
      setTimeout(() => setFeedback(null), 850);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-lg font-medium">Daily Routine Sequencer</p>
        <p className="text-xs opacity-60 mt-1" style={fontBody}>
          {t.step} {currentStepIndex + 1} {t.of} {ROUTINE_STEPS.length} ({targetStep.time})
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.step}
            onClick={() => handlePick(opt)}
            className="p-4 rounded-2xl flex items-center justify-between transition-all active:scale-98 shadow-sm hover:shadow"
            style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{opt.emoji}</span>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: C.ink, ...fontBody }}>{opt.label}</p>
                <p className="text-xs opacity-50" style={fontBody}>{opt.time}</p>
              </div>
            </div>
            <ChevronRight size={18} color={C.inkSoft} />
          </button>
        ))}
      </div>

      {feedback === "good" && <Pill tone="sage">✨ {t.step} {currentStepIndex + 1} ✓</Pill>}
      {feedback === "retry" && <Pill tone="gold">💡 {targetStep.time}</Pill>}
    </div>
  );
}

// 4. NER Cultural Object Recall
function NERObjectRecognition({ onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const NER_ITEMS = (gamesData.nerObjects && gamesData.nerObjects[difficultyLevel]) || [
    {
      id: "tea",
      question: "Which warm, aromatic morning drink comes from Assam?",
      correct: "Assam Tea (চাহ)",
      emoji: "🍵",
      options: ["Assam Tea (চাহ)", "Cold Ice Soda"],
      story: "Assam tea is known globally for its rich flavor.",
    },
  ];

  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const current = NER_ITEMS[step] || NER_ITEMS[0];

  useEffect(() => {
    setStep(0);
  }, [difficultyLevel, selectedLanguage]);

  const [mistakes, setMistakes] = useState(0);

  const handlePick = (opt) => {
    if (opt === current.correct) {
      setFeedback("good");
      playAudioTone("success");
      speakText(`${current.correct}. ${current.story}`, selectedLanguage);
      setTimeout(() => {
        setFeedback(null);
        if (step >= NER_ITEMS.length - 1) {
          const finalAcc = Math.max(10, Math.round((NER_ITEMS.length / (NER_ITEMS.length + mistakes)) * 100));
          api.recordActivityResult({
            activity_type: "ner_objects",
            activity_name: "Cultural Object Recall",
            accuracy: finalAcc,
            difficulty_level: difficultyLevel,
            response_time_seconds: 4.1,
          });
          onComplete("NER Cultural Object Recognition");
        } else {
          setStep((s) => s + 1);
        }
      }, 950);
    } else {
      setMistakes((m) => m + 1);
      setFeedback("retry");
      playAudioTone("card_flip");
      api.recordMistake({ activity_name: "Cultural Object Recall", activity_type: "ner_objects" });
      setTimeout(() => setFeedback(null), 850);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <span className="text-4xl mb-2 inline-block">{current.emoji}</span>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-base font-medium">{current.question}</p>
        <p className="text-xs opacity-50 mt-1" style={fontBody}>{t.question} {step + 1} {t.of} {NER_ITEMS.length}</p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(opt)}
            className="p-4 rounded-2xl text-left transition-all active:scale-98 shadow-sm hover:shadow"
            style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
          >
            <span className="text-sm font-semibold" style={{ color: C.ink, ...fontBody }}>{opt}</span>
          </button>
        ))}
      </div>

      {feedback === "good" && <Pill tone="sage">✨ {current.correct}!</Pill>}
      {feedback === "retry" && <Pill tone="gold">💡</Pill>}
    </div>
  );
}

// 5. Family Photo Jigsaw
function FamilyPhotoJigsaw({ onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const PUZZLE = (gamesData.jigsaw && gamesData.jigsaw[difficultyLevel]) || {
    title: "Sunny Veranda with Riya",
    story: "Granddaughter Riya smiled warmly in the golden morning sunlight on your veranda.",
    pieceCount: 2,
    pieces: [
      { id: 0, text: "Veranda Sunshine", emoji: "☀️" },
      { id: 1, text: "Granddaughter Riya", emoji: "👧🏽" },
    ],
  };

  const [placedPieces, setPlacedPieces] = useState([]);
  const [available, setAvailable] = useState(PUZZLE.pieces);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setPlacedPieces([]);
    setAvailable(PUZZLE.pieces);
    setCompleted(false);
  }, [difficultyLevel, selectedLanguage]);

  const [wrongPlacements, setWrongPlacements] = useState(0);

  const placePiece = (piece) => {
    // If piece placed is next in sequence
    const expectedId = placedPieces.length;
    if (piece.id !== expectedId) {
      setWrongPlacements((w) => w + 1);
      playAudioTone("card_flip");
      api.recordMistake({ activity_name: "Family Photo Jigsaw", activity_type: "jigsaw" });
    } else {
      playAudioTone("success");
    }

    const nextPlaced = [...placedPieces, piece];
    setPlacedPieces(nextPlaced);
    setAvailable(available.filter((p) => p.id !== piece.id));

    if (nextPlaced.length === PUZZLE.pieces.length) {
      setCompleted(true);
      speakText(`${t.photoRestored || "Photo Restored!"} ${PUZZLE.story}`, selectedLanguage);
      const finalAcc = Math.max(10, Math.round((PUZZLE.pieces.length / (PUZZLE.pieces.length + wrongPlacements)) * 100));
      api.recordActivityResult({
        activity_type: "jigsaw",
        activity_name: "Family Photo Jigsaw",
        accuracy: finalAcc,
        difficulty_level: difficultyLevel,
        response_time_seconds: 5.2,
      });
      setTimeout(() => onComplete("Family Photo Jigsaw"), 1500);
    }
  };

  const gridClass = PUZZLE.pieces.length === 2 ? "grid-cols-2 max-w-[240px]" : PUZZLE.pieces.length === 4 ? "grid-cols-2 max-w-[280px]" : "grid-cols-3 max-w-[340px]";

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-lg font-medium">{PUZZLE.title}</p>
        <p className="text-xs opacity-60 mt-1" style={fontBody}>{PUZZLE.pieces.length} {t.step || "pieces"}</p>
      </div>

      <div
        className={`rounded-3xl p-4 grid ${gridClass} gap-3 mx-auto`}
        style={{ background: `linear-gradient(135deg, ${C.sageSoft}, ${C.goldSoft})`, minHeight: 180 }}
      >
        {PUZZLE.pieces.map((_, pos) => {
          const piece = placedPieces.find((p) => p.id === pos);
          return (
            <div
              key={pos}
              className="h-24 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all"
              style={{
                background: piece ? C.white : "rgba(255,255,255,0.4)",
                border: piece ? `2px solid ${C.gold}` : "2px dashed rgba(31,74,69,0.3)",
              }}
            >
              {piece ? (
                <>
                  <span className="text-3xl">{piece.emoji}</span>
                  <span className="text-[10px] font-semibold mt-1" style={{ color: C.ink, ...fontBody }}>{piece.text}</span>
                </>
              ) : (
                <span className="text-xs opacity-40 font-medium" style={fontBody}>{pos + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {!completed ? (
        <div className="space-y-2 pt-2">
          <div className="flex justify-center gap-2 flex-wrap">
            {available.map((piece) => (
              <button
                key={piece.id}
                onClick={() => placePiece(piece)}
                className="px-3.5 py-2.5 rounded-2xl flex items-center gap-2 transition-transform active:scale-95 shadow-sm"
                style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
              >
                <span className="text-2xl">{piece.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: C.ink, ...fontBody }}>{piece.text}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl p-4 space-y-2" style={{ background: C.white, border: `1px solid ${C.sageSoft}` }}>
          <p style={{ ...fontDisplay, color: C.teal }} className="font-semibold text-base">{t.photoRestored || "✨ Photo Restored!"}</p>
          <p className="text-xs italic" style={{ color: C.inkSoft, ...fontBody }}>"{PUZZLE.story}"</p>
        </div>
      )}
    </div>
  );
}

// 6. Melody & Sound Recall
function MelodySoundRecall({ onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const SOUND_QUESTIONS = (gamesData.soundRecall && gamesData.soundRecall[difficultyLevel]) || [
    {
      id: "bell",
      prompt: "Listen closely: What soothing peaceful sound is this?",
      soundType: "bell",
      options: [
        { label: "Temple Bell (মন্দিৰৰ ঘণ্টা)", emoji: "🔔", correct: true },
        { label: "Loud Traffic Horn", emoji: "🚗", correct: false },
      ],
    },
  ];

  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const current = SOUND_QUESTIONS[step] || SOUND_QUESTIONS[0];

  useEffect(() => {
    setStep(0);
    setHasPlayed(false);
  }, [difficultyLevel, selectedLanguage]);

  const playCurrentSound = () => {
    playAudioTone(current.soundType);
    setHasPlayed(true);
  };

  const [mistakes, setMistakes] = useState(0);

  const handlePick = (opt) => {
    if (opt.correct) {
      setFeedback("good");
      playAudioTone("success");
      speakText(`${opt.label}!`, selectedLanguage);
      setTimeout(() => {
        setFeedback(null);
        setHasPlayed(false);
        if (step >= SOUND_QUESTIONS.length - 1) {
          const finalAcc = Math.max(10, Math.round((SOUND_QUESTIONS.length / (SOUND_QUESTIONS.length + mistakes)) * 100));
          api.recordActivityResult({
            activity_type: "melody",
            activity_name: "Melody & Sound Recall",
            accuracy: finalAcc,
            difficulty_level: difficultyLevel,
            response_time_seconds: 3.5,
          });
          onComplete("Melody & Sound Recall");
        } else {
          setStep((s) => s + 1);
        }
      }, 950);
    } else {
      setMistakes((m) => m + 1);
      setFeedback("retry");
      playAudioTone("card_flip");
      api.recordMistake({ activity_name: "Melody & Sound Recall", activity_type: "melody" });
      setTimeout(() => setFeedback(null), 850);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-lg font-medium">{current.prompt}</p>
        <p className="text-xs opacity-60 mt-1" style={fontBody}>{t.question} {step + 1} {t.of} {SOUND_QUESTIONS.length}</p>
      </div>

      <button
        onClick={playCurrentSound}
        className="w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-md"
        style={{ background: C.teal, color: C.white, ...fontBody }}
      >
        <Volume2 size={24} />
        <span className="font-semibold text-base">{hasPlayed ? (t.tapToListenAgain || "🔊 Tap to Listen Again") : (t.soundPrompt || "🔊 Tap to Play Sound")}</span>
      </button>

      <div className="grid grid-cols-1 gap-2 pt-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(opt)}
            className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-98 shadow-sm hover:shadow"
            style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className="text-sm font-semibold" style={{ color: C.ink, ...fontBody }}>{opt.label}</span>
          </button>
        ))}
      </div>

      {feedback === "good" && <Pill tone="sage">✨ {t.allPairsMatched || "Correct!"}</Pill>}
      {feedback === "retry" && <Pill tone="gold">💡</Pill>}
    </div>
  );
}

// 7. Word Bloom & Reminiscence
function WordBloom({ onComplete, difficultyLevel = 1, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const gamesData = getLangGames(selectedLanguage);

  const QUESTIONS = (gamesData.wordBloom && gamesData.wordBloom[difficultyLevel]) || [
    {
      question: "What warm, soothing drink warms you up in the morning?",
      hint: "Brewed from Assam tea leaves.",
      options: [
        { label: "Warm Assam Chai (চাহ)", emoji: "🍵", correct: true },
        { label: "Ice Cold Cola", emoji: "🥤", correct: false },
      ],
    },
  ];

  const [step, setStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const current = QUESTIONS[step] || QUESTIONS[0];

  useEffect(() => {
    setStep(0);
    setShowHint(false);
  }, [difficultyLevel, selectedLanguage]);

  const [mistakes, setMistakes] = useState(0);

  const handlePick = (opt) => {
    if (opt.correct) {
      setFeedback("good");
      playAudioTone("success");
      const fullSentence = current.sentence ? `${opt.label}! ${current.sentence}` : (current.hint ? `${opt.label}! ${current.hint}` : `${opt.label}!`);
      speakText(fullSentence, selectedLanguage);
      setTimeout(() => {
        setFeedback(null);
        setShowHint(false);
        if (step >= QUESTIONS.length - 1) {
          const finalAcc = Math.max(10, Math.round((QUESTIONS.length / (QUESTIONS.length + mistakes)) * 100));
          api.recordActivityResult({
            activity_type: "word_bloom",
            activity_name: "Word Bloom Reminiscence",
            accuracy: finalAcc,
            difficulty_level: difficultyLevel,
            response_time_seconds: 3.8,
          });
          onComplete("Word Bloom");
        } else {
          setStep((s) => s + 1);
        }
      }, 950);
    } else {
      setMistakes((m) => m + 1);
      setFeedback("retry");
      playAudioTone("card_flip");
      api.recordMistake({ activity_name: "Word Bloom Reminiscence", activity_type: "word_bloom" });
      setTimeout(() => setFeedback(null), 850);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <p style={{ ...fontDisplay, color: C.ink }} className="text-lg font-medium">{current.question}</p>
        <p className="text-xs opacity-60 mt-1" style={fontBody}>{t.question} {step + 1} {t.of} {QUESTIONS.length}</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(opt)}
            className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-98 shadow-sm hover:shadow"
            style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className="text-sm font-semibold" style={{ color: C.ink, ...fontBody }}>{opt.label}</span>
          </button>
        ))}
      </div>

      {!showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="text-xs underline opacity-75 hover:opacity-100 font-medium"
          style={{ color: C.teal, ...fontBody }}
        >
          {t.askHint || "💡 Ask Saarthi for a gentle hint"}
        </button>
      )}

      {showHint && (
        <div className="rounded-xl p-3 text-xs" style={{ background: C.goldSoft, color: "#8A6416", ...fontBody }}>
          ✨ <strong>{t.hintTitle || "Saarthi's Clue:"}</strong> {current.hint}
        </div>
      )}

      {feedback === "good" && <Pill tone="sage">✨</Pill>}
      {feedback === "retry" && <Pill tone="gold">💡</Pill>}
    </div>
  );
}

// --- Memory Garden Component ---
function MemoryGarden({ grown, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const items = ["🌱", "🌿", "🌷", "🌸", "🌳", "🦋", "🐦", "🌼", "🦚", "☀️"];
  const shown = items.slice(0, Math.min(grown + 2, items.length));
  return (
    <div className="rounded-3xl p-5 text-center shadow-sm" style={{ background: `linear-gradient(180deg, ${C.sageSoft}, ${C.paper})`, border: `1px solid ${C.paperDeep}` }}>
      <div className="flex items-center justify-between mb-2">
        <p style={{ ...fontDisplay, color: C.teal }} className="text-base font-semibold">{t.gardenTitle || "Your Memory Garden"}</p>
        <Pill tone="sage">{t.gardenLevel || "Level"} {Math.min(grown, 5)}</Pill>
      </div>
      <div className="text-3xl flex justify-center gap-2.5 flex-wrap py-2">
        {shown.map((e, i) => (
          <span key={i} className="animate-bounce inline-block" style={{ animationDuration: `${2 + (i % 3)}s` }}>{e}</span>
        ))}
      </div>
      <p className="text-[11px] opacity-60 mt-1" style={fontBody}>{t.gardenSub || "Grows with every warm memory and cognitive game you play."}</p>
    </div>
  );
}

// --- Play Activities Hub ---
function PlayActivities({ onBack, family, selectedLanguage = "Assamese" }) {
  const [activity, setActivity] = useState(null);
  const [gardenGrowth, setGardenGrowth] = useState(3);
  const [completedCelebration, setCompletedCelebration] = useState(null);
  const [aiDifficulty, setAiDifficulty] = useState(1);

  const t = getLangDict(selectedLanguage);

  const handleGameComplete = (gameName) => {
    setGardenGrowth((g) => g + 1);
    setCompletedCelebration(gameName);
    setActivity(null);
  };

  const GAMES = [
    {
      id: "whoami",
      title: "🧠 " + (selectedLanguage === "Assamese" ? "মই কোন? (Who Am I)" : selectedLanguage === "Hindi" ? "मैं कौन हूँ? (Who Am I)" : selectedLanguage === "Bengali" ? "আমি কে? (Who Am I)" : "Who Am I?"),
      desc: selectedLanguage === "Assamese" ? "মৰমৰ পৰিয়ালৰ সদস্যসকলক চিনাক্ত কৰক" : selectedLanguage === "Hindi" ? "परिवार के प्यारे सदस्यों को पहचानें" : selectedLanguage === "Bengali" ? "প্রিয় পরিবারের সদস্যদের চিনে নিন" : "Recognize family members by their sweet relationships",
      badge: "Memory",
      tone: "sage",
    },
    {
      id: "routine",
      title: "🌅 " + (selectedLanguage === "Assamese" ? "দৈনন্দিন ৰুটিন (Daily Routine)" : selectedLanguage === "Hindi" ? "दैनिक दिनचर्या (Daily Routine)" : selectedLanguage === "Bengali" ? "দৈনন্দিন রুটিন (Daily Routine)" : "Daily Routine Recall"),
      desc: selectedLanguage === "Assamese" ? "পুৱাৰ চাহ আৰু ঔষধৰ সঠিক সময়সূচী" : selectedLanguage === "Hindi" ? "सुबह की चाय और दवाइयों का सही क्रम" : selectedLanguage === "Bengali" ? "সকালের চা ও ওষুধের সঠিক সময়" : "Remember morning tea, tulsi care, and medicine sequence",
      badge: "Routine",
      tone: "gold",
    },
    {
      id: "object_rec",
      title: "🎋 " + (selectedLanguage === "Assamese" ? "সাংস্কৃতিক চিনাক্তকৰণ (Cultural Objects)" : selectedLanguage === "Hindi" ? "सांस्कृतिक पहचान (Cultural Objects)" : selectedLanguage === "Bengali" ? "ঐতিহ্যবাহী বস্তু (Cultural Objects)" : "Cultural Object Recall"),
      desc: selectedLanguage === "Assamese" ? "জাপি, গামোচা, শৰাই আৰু কাজিৰঙাৰ গঁড়" : selectedLanguage === "Hindi" ? "जापी, गामोसा और काजीरंगा का गैंडा" : selectedLanguage === "Bengali" ? "জাপি, গামোছা ও ঐতিহ্যবাহী সামগ্রী" : "Identify traditional Japi, Gamusa, Xorai & Rhino",
      badge: "Pattern",
      tone: "rose",
    },
    {
      id: "pairs",
      title: "🃏 " + (selectedLanguage === "Assamese" ? "স্মৃতি কাৰ্ড মেচ (Memory Match)" : selectedLanguage === "Hindi" ? "स्मृति कार्ड मिलान (Memory Match)" : selectedLanguage === "Bengali" ? "স্মৃতি কার্ড মিলান (Memory Match)" : "Memory Card Match"),
      desc: selectedLanguage === "Assamese" ? "মিল থকা কাৰ্ডৰ যোৰা বিচাৰি উলিয়াওক" : selectedLanguage === "Hindi" ? "मिलते-जुलते कार्ड्स के जोड़े खोजें" : selectedLanguage === "Bengali" ? "একই ধরণের কার্ডের জোড়া খুঁজুন" : "Gentle pair matching with familiar everyday treasures",
      badge: "Visual",
      tone: "sage",
    },
    {
      id: "jigsaw",
      title: "🧩 " + (selectedLanguage === "Assamese" ? "পৰিয়ালৰ ফটো জিগছ' (Photo Jigsaw)" : selectedLanguage === "Hindi" ? "पारिवारिक फोटो पहेली (Photo Jigsaw)" : selectedLanguage === "Bengali" ? "পারিবারিক ছবির ধাঁধা (Photo Jigsaw)" : "Family Photo Jigsaw"),
      desc: selectedLanguage === "Assamese" ? "টুকৰা মিলাই সোণালী ফটোখন সম্পূৰ্ণ কৰক" : selectedLanguage === "Hindi" ? "टुकड़े जोड़कर सुंदर तस्वीर पूरी करें" : selectedLanguage === "Bengali" ? "টুকরো মিলিয়ে সুন্দর ছবি পূর্ণ করুন" : "Restore warm Bihu celebration moments piece by piece",
      badge: "Spatial",
      tone: "gold",
    },
    {
      id: "sound_recall",
      title: "🎵 " + (selectedLanguage === "Assamese" ? "সুৰ আৰু শব্দ চিনাক্ত (Sound Recall)" : selectedLanguage === "Hindi" ? "मधुर आवाज पहचान (Sound Recall)" : selectedLanguage === "Bengali" ? "সুর ও শব্দের স্মৃতি (Sound Recall)" : "Melody & Sound Recall"),
      desc: selectedLanguage === "Assamese" ? "মন্দিৰৰ ঘণ্টা, চাহৰ কেটলী আৰু নদীৰ ধ্বনি" : selectedLanguage === "Hindi" ? "मंदिर की घंटी और चाय की केतली की आवाज" : selectedLanguage === "Bengali" ? "মন্দিরের ঘণ্টা ও শান্ত সুর শুনুন" : "Listen and identify temple bells, birds & tea kettles",
      badge: "Auditory",
      tone: "rose",
    },
    {
      id: "word_bloom",
      title: "🌸 " + (selectedLanguage === "Assamese" ? "শব্দ ফুলনি (Word Bloom)" : selectedLanguage === "Hindi" ? "शब्द वाटिका (Word Bloom)" : selectedLanguage === "Bengali" ? "শব্দ কানন (Word Bloom)" : "Word Bloom"),
      desc: selectedLanguage === "Assamese" ? "সোণালী সংস্কৃতি আৰু বিহুৰ স্মৃতি" : selectedLanguage === "Hindi" ? "असम की सुंदर संस्कृति और यादें" : selectedLanguage === "Bengali" ? "ঐতিহ্য ও মধুর স্মৃতি স্মরণ" : "Reminisce on beloved traditions, tea, and festivals",
      badge: "Reminiscence",
      tone: "sage",
    },
  ];

  const diffLabels = {
    1: t.gentle || "Gentle",
    2: t.standard || "Standard",
    3: t.focus || "Focus",
  };

  return (
    <Screen onBack={onBack} title={t.playTitle || "Play & Memory Activities"} badge={`AI Level ${aiDifficulty}: ${diffLabels[aiDifficulty]}`}>
      {/* AI Adaptive Difficulty Status Bar */}
      <div className="rounded-2xl p-3 mb-4 flex items-center justify-between shadow-xs" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
        <div className="flex items-center gap-2">
          <Sparkles size={16} color={C.gold} />
          <div>
            <span className="text-xs font-bold block" style={{ color: C.ink, ...fontBody }}>{t.aiDifficulty || "AI Difficulty:"}</span>
            <span className="text-[10px] opacity-60 block" style={fontBody}>{diffLabels[aiDifficulty]}</span>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setAiDifficulty(lvl);
                playAudioTone("card_flip");
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
              style={{
                background: aiDifficulty === lvl ? C.tealDeep : C.paperDeep,
                color: aiDifficulty === lvl ? C.white : C.inkSoft,
                ...fontBody,
              }}
            >
              {diffLabels[lvl]}
            </button>
          ))}
        </div>
      </div>

      {!activity && (
        <div className="space-y-4">
          <MemoryGarden grown={gardenGrowth} selectedLanguage={selectedLanguage} />

          {completedCelebration && (
            <div className="rounded-2xl p-4 text-center animate-fade-in shadow-sm" style={{ background: C.white, border: `2px solid ${C.sage}` }}>
              <p style={{ ...fontDisplay, color: C.teal }} className="font-semibold text-base">🎉 {completedCelebration}!</p>
            </div>
          )}

          <div className="space-y-2.5">
            {GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  setCompletedCelebration(null);
                  setActivity(game.id);
                }}
                className="w-full text-left px-4 py-3.5 rounded-2xl flex items-center justify-between transition-transform active:scale-98 shadow-sm hover:shadow-md"
                style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ ...fontBody, color: C.ink }} className="font-semibold text-sm">{game.title}</span>
                    <Pill tone={game.tone}>{game.badge}</Pill>
                  </div>
                  <p className="text-xs opacity-60 mt-0.5" style={fontBody}>{game.desc}</p>
                </div>
                <ChevronRight size={18} color={C.inkSoft} />
              </button>
            ))}
          </div>
        </div>
      )}

      {activity === "whoami" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <WhoAmI family={family} onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}

      {activity === "routine" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <DailyRoutineRecall onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}

      {activity === "object_rec" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <NERObjectRecognition onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}

      {activity === "pairs" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <MemoryPairs onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}

      {activity === "jigsaw" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <FamilyPhotoJigsaw onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}

      {activity === "sound_recall" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <MelodySoundRecall onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}

      {activity === "word_bloom" && (
        <div>
          <button onClick={() => setActivity(null)} className="mb-3 text-xs flex items-center gap-1 opacity-75 hover:opacity-100 font-medium" style={{ color: C.teal, ...fontBody }}>
            <ArrowLeft size={14} /> {t.backToGames || "Back to Games List"}
          </button>
          <WordBloom onComplete={handleGameComplete} difficultyLevel={aiDifficulty} selectedLanguage={selectedLanguage} />
        </div>
      )}
    </Screen>
  );
}

// --- Multilingual Patient Reminders Hub ---

function PatientReminders({ onBack, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const [reminders, setReminders] = useState([]);

  const reloadReminders = () => {
    api.getReminders(selectedLanguage).then(setReminders);
  };

  useEffect(() => {
    reloadReminders();
    const unsubscribe = api.subscribe((evt) => {
      if (evt && (evt.type === "reminder_toggled" || evt.type === "reminder_created")) {
        reloadReminders();
      }
    });
    return () => unsubscribe();
  }, [selectedLanguage]);

  const toggle = async (r) => {
    playAudioTone("success");
    await api.toggleReminder(r.id, r.is_completed);
    reloadReminders();
  };

  const snooze = async (r) => {
    playAudioTone("bell");
    await api.snoozeReminder(r.id);
    speakText(`${r.title}`, selectedLanguage);
  };

  return (
    <Screen onBack={onBack} title={t.remindersTitle || "Daily Care & Reminders"}>
      <div className="space-y-3">
        <p className="text-xs opacity-60" style={fontBody}>
          {t.remindersSub || "Tap 'Done' once completed or tap speaker to listen:"}
        </p>

        {reminders.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl p-4 transition-all shadow-sm"
            style={{
              background: r.is_completed ? C.sageSoft : C.white,
              border: `1.5px solid ${r.is_completed ? C.sage : C.paperDeep}`,
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <span className="text-3xl mt-0.5">{r.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-sm">{r.title}</p>
                    {r.priority === "high" && <Pill tone="rose">Important</Pill>}
                  </div>
                  <p className="text-xs font-semibold text-teal-800 mt-0.5" style={fontBody}>{r.time_label}</p>
                  {r.dosage_or_detail && (
                    <p className="text-xs opacity-75 mt-1" style={{ color: C.inkSoft, ...fontBody }}>
                      {r.dosage_or_detail}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => speakText(`${r.title}. ${r.dosage_or_detail || ""}`, selectedLanguage)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-teal-800 hover:bg-teal-50"
                title={t.tapToListen || "Listen"}
              >
                <Volume2 size={16} />
              </button>
            </div>

            <div className="mt-3 flex gap-2 justify-end border-t pt-2 border-slate-100">
              {!r.is_completed && (
                <button
                  onClick={() => snooze(r)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: C.paperDeep, color: C.inkSoft, ...fontBody }}
                >
                  ⏰ {t.snooze || "Snooze 15m"}
                </button>
              )}
              <button
                onClick={() => toggle(r)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 text-white transition-transform active:scale-95"
                style={{ background: r.is_completed ? C.tealDeep : C.teal }}
              >
                <CheckCircle size={14} />
                {r.is_completed ? (t.done || "Completed ✓") : (t.markDone || "Mark as Done")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

// --- Multilingual Cherished Memories View ---

function MyMemories({ onBack, selectedLanguage = "Assamese" }) {
  const t = getLangDict(selectedLanguage);
  const localizedMemories = (DEMO.memoriesByLang && DEMO.memoriesByLang[selectedLanguage]) || DEMO.memoriesByLang.Assamese;

  return (
    <Screen onBack={onBack} title={t.memoriesTitle || "My Cherished Memories"}>
      <div className="space-y-3">
        {localizedMemories.map((m) => (
          <div key={m.id} className="rounded-2xl p-4 flex gap-3.5 shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
            <div className="text-3xl">{m.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-sm">{m.title}</p>
                <button
                  onClick={() => speakText(`${m.title}. ${m.description}`, selectedLanguage)}
                  className="text-teal-800 opacity-70 hover:opacity-100"
                  title={t.tapToListen || "Listen"}
                >
                  <Volume2 size={15} />
                </button>
              </div>
              <p className="text-xs opacity-50" style={fontBody}>{m.place} · {m.date_label}</p>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ ...fontBody, color: C.inkSoft }}>{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

// --- Localized Patient Home Dashboard ---

function PatientHome({ nav, patientName, selectedLanguage = "Assamese", onOpenLanguageSelector }) {
  const [sosTriggered, setSosTriggered] = useState(false);

  const greetings = {
    Assamese: {
      title: `নমস্কাৰ, ${patientName} ❤️`,
      sub: "মই আজি গুৱাহাটীত আপোনাৰ লগতেই আছো।",
      talk: "স্মৃতিসাৰথীৰ লগত কথা পাতক",
      talkSub: "ভইচ এচিষ্টেণ্ট (Voice AI)",
      play: "স্মৃতি খেল আৰু গতিবিধি",
      playSub: "৭ বিধ বিশেষ অনুশীলন",
      care: "দৈনন্দিন যত্ন আৰু ঔষধ",
      careSub: "ঔষধ, পানী আৰু খোজকাঢ়া",
      memories: "মোৰ সোণালী স্মৃতি আৰু কাহিনীসমূহ",
      sosBtn: "জৰুৰীকালীন সহায় (Emergency SOS)",
      sosSub: "তৎক্ষণাৎ সহায়ৰ বাবে ইয়াত টিপক · যত্ন লওঁতালৈ এলাৰ্ম যাব",
      sosModalTitle: "🚨 জৰুৰীকালীন এলাৰ্ম পঠোৱা হ'ল!",
      sosModalMsg: "আইতা, একো চিন্তা নকৰিব! যত্ন লওঁতা অনন্যা আৰু চিকিৎসক ডাঃ বৰুৱাক ততালিকে জৰুৰী এলাৰ্ম সংকেত দিয়া হৈছে। সহায় শীঘ্ৰেই আহি আছে ❤️",
      sosSpeak: "আইতা, একো চিন্তা নকৰিব। অনন্যা আৰু ৰাজক খবৰ দিয়া হৈছে আৰু তেওঁলোক আপোনাৰ কাষলৈ আহি আছে।",
    },
    Hindi: {
      title: `नमस्ते, ${patientName} ❤️`,
      sub: "मैं आज गुवाहाटी में आपके साथ ही हूँ।",
      talk: "स्मृतिसारथी से बात करें",
      talkSub: "आवाज सहायक (Voice AI)",
      play: "स्मृति खेल और अभ्यास",
      playSub: "7 विशेष गतिविधियाँ",
      care: "दवाइयाँ और दिनचर्या",
      careSub: "दवा, पानी और टहलना",
      memories: "मेरी प्यारी यादें और कहानियाँ",
      sosBtn: "आपातकालीन सहायता (Emergency SOS)",
      sosSub: "तुरंत मदद के लिए यहाँ दबाएँ · केयरटेकर को तेज अलार्म जाएगा",
      sosModalTitle: "🚨 आपातकालीन अलार्म भेजा गया!",
      sosModalMsg: "दादी जी, बिल्कुल चिंता न करें! अनन्या जी और डॉ. बरुआ के पास तेज सायरन अलार्म पहुँच चुका है। मदद तुरंत आ रही है ❤️",
      sosSpeak: "दादी जी, बिल्कुल घबराइए मत। अनन्या जी और राज को सूचना मिल गई है और वे तुरंत आ रहे हैं।",
    },
    Bengali: {
      title: `নমস্কার, ${patientName} ❤️`,
      sub: "আমি আজ গুয়াহাটিতে আপনার সাথেই আছি।",
      talk: "স্মৃতিসাৰথীর সাথে কথা বলুন",
      talkSub: "ভয়েস অ্যাসিস্ট্যান্ট (Voice AI)",
      play: "স্মৃতি খেলা ও চর্চা",
      playSub: "৭টি বিশেষ স্মৃতি খেলা",
      care: "প্রতিদিনের যত্ন ও ওষুধ",
      careSub: "ওষুধ, জল ও হাঁটা",
      memories: "আমার সোনালী স্মৃতি ও গল্পসমূহ",
      sosBtn: "জরুরি সাহায্য (Emergency SOS)",
      sosSub: "জরুরি সাহায্যের জন্য চাপুন · কেয়ারটেকারকে অ্যালার্ম যাবে",
      sosModalTitle: "🚨 জরুরি অ্যালার্ম পাঠানো হয়েছে!",
      sosModalMsg: "ঠাকুমা, একদম চিন্তা করবেন না! অনন্যা এবং ডঃ বরুয়াকে সতর্কবার্তা ও সাইরেন অ্যালার্ম পাঠানো হয়েছে। সাহায্য দ্রুত আসছে ❤️",
      sosSpeak: "ঠাকুমা, চিন্তা করবেন না। অনন্যা ও রাজকে খবর দেওয়া হয়েছে, ওঁরা এখনই আসছেন।",
    },
    English: {
      title: `Good morning, ${patientName} ❤️`,
      sub: "I'm here with you today in Guwahati.",
      talk: "Talk to Saarthi",
      talkSub: "Voice AI Assistant",
      play: "Play & Memory Games",
      playSub: "7 Cognitive Activities",
      care: "Daily Care & Reminders",
      careSub: "Meds & Hydration",
      memories: "My Cherished Memories & Stories",
      sosBtn: "Emergency Assistance (SOS)",
      sosSub: "Press for urgent help · Sounds loud siren on Caregiver dashboard",
      sosModalTitle: "🚨 Emergency SOS Dispatched!",
      sosModalMsg: "Aita, please do not worry! Caregiver Ananya and Dr. Barua have been alerted with an urgent loud siren alarm. Help is coming immediately ❤️",
      sosSpeak: "Aita, please do not worry. Caregiver Ananya and Raj have been alerted immediately and are coming to you right now.",
    },
    Bodo: {
      title: `खुलुमबाय, ${patientName} ❤️`,
      sub: "आं दिनै नोंथांनि लोगोआवनो दं।",
      talk: "सारथीजों सावराय",
      talkSub: "राव बिथांखि (Voice AI)",
      play: "गोसोआव लाखिनाय गेलेनाय",
      playSub: "7 गेलेमु बाहागो",
      care: "सानफ्रोमनि मुलि",
      careSub: "मुलि आरो दै लोंनाय",
      memories: "आंनि गोसोखांथि आरो खन्थायफोर",
      sosBtn: "गनांथि हेफाजाब (Emergency SOS)",
      sosSub: "हेफाजाबनि थाखाय थु · अलार्म थांगोन",
      sosModalTitle: "🚨 गनांथि खौरां दैथायबाय!",
      sosModalMsg: "आइ, गिनाङा! अनन्या आरो डाक्टरनो खौरां दैथायबाय। मदद फैगासिनो दं ❤️",
      sosSpeak: "आइ, गिनाङा। अनन्या नोंथांनि साखाथियाव फैगासिनो दं।",
    },
    Manipuri: {
      title: `খুরুমজরি, ${patientName} ❤️`,
      sub: "ঐহাক অদোমগী লৈবাক্কী মপোক্কী লমদমদা লৈরি।",
      talk: "সাৰথীগা ৱারী শাবা",
      talkSub: "খোন্থোক পাউতাক (Voice AI)",
      play: "নীংশিং শান্নপোৎ",
      playSub: "শান্নপোৎ ৭",
      care: "নোংমগী হিদাক-লাংথক",
      careSub: "হিদাক অমসুং ঈশিং",
      memories: "ঐগী নীংশিং লানফম অমসুং ৱারীশিং",
      sosBtn: "অকনবা মতেং (Emergency SOS)",
      sosSub: "মতেংগীদমক নমবীয়ু · এলার্ম থারকনি",
      sosModalTitle: "🚨 অকনবা পাউতাক থাখ্রে!",
      sosModalMsg: "ইমা, অকিবা পোকপীনু! অনন্যাদা পাউতাক থাখ্রে। মতেং অথুবা মতমদা লাক্কনি ❤️",
      sosSpeak: "ইমা, অকিবা পোকপীনু। অনন্যা অদোমগী নকন্দা লাক্লি।",
    },
  };

  const g = greetings[selectedLanguage] || greetings["English"];

  const handleTriggerSos = async () => {
    playAudioTone("success");
    setSosTriggered(true);
    await api.triggerSosAlert({
      location: "Home Veranda, Guwahati",
      language: selectedLanguage,
    });
    speakText(g.sosSpeak || "Aita, please do not worry. Help is coming to you right now.", selectedLanguage);
  };

  return (
    <div>
      {/* Patient Avatar & Welcome */}
      <div className="text-center mb-6">
        <PatientAvatar speaking={false} />
        <h2 style={{ ...fontDisplay, color: C.ink }} className="text-2xl font-bold mt-3">
          {g.title}
        </h2>
        <p style={{ ...fontBody, color: C.inkSoft }} className="text-sm mt-1">
          {g.sub}
        </p>

        {onOpenLanguageSelector && (
          <button
            onClick={onOpenLanguageSelector}
            className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 shadow-2xs text-teal-800 hover:bg-slate-50 transition-all"
            style={fontBody}
          >
            <Globe2 size={13} />
            <span>{selectedLanguage} · Switch Language</span>
          </button>
        )}
      </div>

      {/* 3 Core Big Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        <BigButton
          icon={Mic}
          label={g.talk}
          subtext={g.talkSub}
          accent={C.teal}
          onClick={() => nav("talk")}
        />
        <BigButton
          icon={Sparkles}
          label={g.play}
          subtext={g.playSub}
          accent={C.gold}
          onClick={() => nav("play")}
        />
        <BigButton
          icon={Bell}
          label={g.care}
          subtext={g.careSub}
          accent={C.rose}
          onClick={() => nav("reminders")}
        />
      </div>

      {/* Full-width Cherished Memories Banner */}
      <div>
        <button
          onClick={() => nav("memories")}
          className="w-full py-4 px-5 rounded-2xl flex items-center justify-between shadow-sm transition-all active:scale-98 hover:shadow-md"
          style={{ background: C.white, border: `1.5px solid ${C.paperDeep}` }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-50 border border-rose-100">
              <Heart size={22} color={C.rose} fill={C.rose} />
            </div>
            <div className="text-left">
              <span style={{ ...fontDisplay, color: C.ink }} className="text-sm font-bold block">
                {g.memories}
              </span>
              <span className="text-xs opacity-60 block" style={fontBody}>
                Bihu festival, Brahmaputra ferries, and family photo stories
              </span>
            </div>
          </div>
          <ChevronRight size={18} color={C.inkSoft} />
        </button>
      </div>

      {/* EMERGENCY SOS BUTTON (Placed directly below Cherished Memories) */}
      <div className="mt-3.5">
        <button
          onClick={handleTriggerSos}
          className="w-full py-4 px-5 rounded-2xl flex items-center justify-between shadow-md transition-all active:scale-95 hover:shadow-lg relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
            color: C.white,
            border: "2px solid #FCA5A5",
          }}
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/20 border border-white/30 shrink-0 shadow-inner">
              <span className="text-2xl animate-pulse">🚨</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span style={{ ...fontDisplay }} className="text-sm sm:text-base font-bold tracking-wide text-white">
                  {g.sosBtn}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/25 text-white border border-white/30">
                  SOS
                </span>
              </div>
              <span className="text-xs text-rose-100 block mt-0.5 line-clamp-1" style={fontBody}>
                {g.sosSub}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-2">
            <Bell size={17} color="#FFF" className="animate-bounce" />
          </div>
        </button>
      </div>

      {/* SOS TRIGGERED REASSURANCE MODAL */}
      {sosTriggered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center relative border-4 border-rose-500 animate-scale-up"
            style={{ background: C.white }}
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <span className="text-4xl animate-bounce">🚨</span>
            </div>

            <h3 style={{ ...fontDisplay, color: "#991B1B" }} className="text-xl font-bold">
              {g.sosModalTitle}
            </h3>

            <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-medium" style={fontBody}>
              {g.sosModalMsg}
            </p>

            <div className="my-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-900">📍 Your Location:</span>
                <span className="font-bold text-slate-800">Home Veranda, Guwahati</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-900">🔊 Caregiver Alarm:</span>
                <span className="font-bold text-rose-700 animate-pulse">Siren Active</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-900">👨‍👦 Primary Contact:</span>
                <span className="font-bold text-slate-800">Son Raj (+91 98540 98765)</span>
              </div>
            </div>

            <button
              onClick={() => setSosTriggered(false)}
              className="w-full py-3.5 rounded-2xl font-bold text-white shadow-md transition-all active:scale-95 hover:opacity-95"
              style={{ background: C.tealDeep, ...fontBody }}
            >
              {selectedLanguage === "Assamese" ? "বুজিলো / ঠিক আছে ✓" :
               selectedLanguage === "Hindi" ? "समझ गए / ठीक है ✓" :
               selectedLanguage === "Bengali" ? "বুঝেছি / ঠিক আছে ✓" :
               "Understood / Help is Coming ✓"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Patient Experience Export ---

export default function PatientExperience({ selectedLanguage = "Assamese", onOpenLanguageSelector }) {
  const [screen, setScreen] = useState("home");
  const [patient, setPatient] = useState(DEMO.patient);
  const [family, setFamily] = useState(DEMO.family);

  useEffect(() => {
    api.getPatient().then(setPatient);
    api.getFamily().then(setFamily);
  }, []);

  const localizedPatientName =
    (patient.preferredNamesByLang && patient.preferredNamesByLang[selectedLanguage]) ||
    (selectedLanguage === "Assamese" ? "আইতা" :
     selectedLanguage === "Hindi" ? "दादी जी" :
     selectedLanguage === "Bengali" ? "ঠাকুমা" :
     selectedLanguage === "English" ? "Aita" :
     selectedLanguage === "Bodo" ? "आबौ" :
     selectedLanguage === "Manipuri" ? "ইবেন" :
     patient.preferred_name || "Aita");

  return (
    <div
      className="rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 min-h-[580px] sm:min-h-[640px] shadow-xl sm:shadow-2xl relative w-full max-w-[480px] mx-auto transition-all"
      style={{ background: C.paper, border: `6px solid ${C.tealDeep}` }}
    >
      {screen === "home" && (
        <PatientHome
          nav={setScreen}
          patientName={localizedPatientName}
          selectedLanguage={selectedLanguage}
          onOpenLanguageSelector={onOpenLanguageSelector}
        />
      )}
      {screen === "talk" && (
        <TalkToSaathi
          onBack={() => setScreen("home")}
          patientName={localizedPatientName}
          initialLang={selectedLanguage}
        />
      )}
      {screen === "play" && <PlayActivities onBack={() => setScreen("home")} family={family} selectedLanguage={selectedLanguage} />}
      {screen === "reminders" && <PatientReminders onBack={() => setScreen("home")} selectedLanguage={selectedLanguage} />}
      {screen === "memories" && <MyMemories onBack={() => setScreen("home")} selectedLanguage={selectedLanguage} />}
    </div>
  );
}
