import React from "react";
import { Sparkles, Heart, Bell, Stethoscope, Wifi, ShieldCheck, ArrowRight, Brain, Globe2, ChevronRight, Users, Download, Smartphone } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, Pill } from "../theme";

export default function Landing({ onNav, authenticatedCaretaker, selectedLanguage = "Assamese" }) {
  return (
    <div className="text-center py-8 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 shadow-xs" style={{ background: C.sageSoft, border: `1px solid ${C.sage}` }}>
        <Sparkles size={14} color={C.teal} />
        <span style={{ ...fontMono, color: C.teal }} className="uppercase tracking-widest text-[11px] font-semibold">
          AI Cognitive Assistance Platform · Northeast Region (NER)
        </span>
      </div>

      <h1 style={{ ...fontDisplay, color: C.ink }} className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
        SmritiSaarthi AI
      </h1>
      <p style={{ ...fontDisplay, color: C.teal }} className="text-lg md:text-xl font-medium mb-3">
        স্মৃতিসাৰথী · Helping memories feel familiar again
      </p>
      <p style={{ ...fontBody, color: C.inkSoft }} className="text-base mb-8 max-w-2xl mx-auto leading-relaxed">
        An AI-enabled cognitive companion and clinical care ecosystem for elderly dementia & MCI patients in Assam and Northeast India, empowering families, caregivers, and geriatricians.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3.5 flex-wrap mb-10">
        <button
          onClick={() => onNav("patient")}
          className="px-6 py-3.5 rounded-2xl font-semibold shadow-md flex items-center gap-2 transition-transform active:scale-95 hover:shadow-lg"
          style={{ background: C.tealDeep, color: C.white, ...fontBody }}
        >
          <Heart size={18} fill={C.white} /> {
            selectedLanguage === "Assamese" ? "ৰোগী অভিজ্ঞতা (আইতাৰ বাবে)" :
            selectedLanguage === "Hindi" ? "मरीज अनुभव (दादी जी)" :
            selectedLanguage === "Bengali" ? "রোগী অভিজ্ঞতা (ঠাকুমা)" :
            selectedLanguage === "Bodo" ? "सानेग्रा नुथां (आबौ)" :
            selectedLanguage === "Manipuri" ? "অনাবাগী এক্সপিরিয়েন্স (ইবেন)" :
            "Try Patient Experience (Aita)"
          }
        </button>
        <button
          onClick={() => onNav("caregiver")}
          className="px-6 py-3.5 rounded-2xl font-semibold shadow-sm flex items-center gap-2 transition-transform active:scale-95 hover:shadow-md"
          style={{ background: C.white, color: C.ink, border: `1.5px solid ${C.paperDeep}`, ...fontBody }}
        >
          <Stethoscope size={18} color={C.teal} />
          {authenticatedCaretaker
            ? `Open Dashboard (${authenticatedCaretaker.name.split(" ")[0]} · ${authenticatedCaretaker.role})`
            : "Caretaker & Clinical Login Portal"}
        </button>
      </div>

      {/* 6 Feature Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
        {[
          {
            icon: "🧠",
            title: "Adaptive Cognitive Games",
            desc: "7 interactive modules: Family recall, Memory match, Daily routine sequencer, NER crafts (Japi/Gamusa), and auditory chimes that dynamically scale difficulty with zero stressful timers.",
          },
          {
            icon: "🗣",
            title: "Multilingual & Voice AI",
            desc: "Native voice assistance in Assamese (অসমীয়া), Bodo (बर’), Manipuri (মৈতৈলোন্), Bengali, Hindi, and English with culturally comforting dialogue.",
          },
          {
            icon: "💊",
            title: "Daily Care Reminders",
            desc: "Voice-assisted reminders for critical blood pressure/memory medications, hydration (warm tulsi water), veranda walks, and GMCH doctor appointments.",
          },
          {
            icon: "📊",
            title: "Caregiver & Clinical Trends",
            desc: "Longitudinal 7D/30D/90D cognitive tracking, Mini-Cog clinical summaries, Geriatrician assessment notes, and explainable AI alerts.",
          },
          {
            icon: "🔄",
            title: "Offline Sync Engine",
            desc: "Built for remote and low-connectivity NER field environments. Operates fully offline and seamlessly synchronizes batches when connection restores.",
          },
          {
            icon: "🌸",
            title: "Memory Garden & Dignity",
            desc: "Emotional well-being engine with visual blooming ecosystem that celebrates progress and preserves patient dignity through zero-failure UI design.",
          },
        ].map((f, i) => (
          <div key={i} className="rounded-2xl p-5 shadow-xs transition-all hover:shadow-sm" style={{ background: C.white, border: `1px solid ${C.paperDeep}` }}>
            <div className="text-3xl mb-2">{f.icon}</div>
            <p style={{ ...fontDisplay, color: C.ink }} className="font-semibold text-base mb-1">{f.title}</p>
            <p className="text-xs leading-relaxed" style={{ ...fontBody, color: C.inkSoft }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Regional Focus Banner */}
      <div className="rounded-2xl p-4 max-w-2xl mx-auto flex items-center justify-between shadow-xs mb-8" style={{ background: C.sageSoft, border: `1px solid ${C.paperDeep}` }}>
        <div className="flex items-center gap-3 text-left">
          <Globe2 size={24} color={C.teal} />
          <div>
            <p className="text-xs font-bold" style={{ color: C.ink }}>Strengthening Healthcare Accessibility Across NER</p>
            <p className="text-[11px] opacity-75" style={fontBody}>Culturally tailored for Guwahati, Silchar, Imphal, Kokrajhar, and remote hills.</p>
          </div>
        </div>
        <Pill tone="sage">NER Ready</Pill>
      </div>

      {/* PWA Mobile & Desktop App Install Card */}
      <div
        className="rounded-3xl p-6 text-left flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg border-2 transition-all"
        style={{
          background: `linear-gradient(135deg, ${C.tealDeep}, #122E2B)`,
          color: C.white,
          borderColor: C.gold,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Smartphone size={30} color={C.gold} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold" style={fontDisplay}>
                Install SmritiSaarthi App (PWA)
              </h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30" style={fontMono}>
                Offline Native
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1 max-w-lg leading-relaxed" style={fontBody}>
              {selectedLanguage === "Assamese"
                ? "আপোনাৰ মোবাইল বা কম্পিউটাৰত এটা ক্লিকেই ইনষ্টল কৰক। কোনো Play Store বা App Store ডাউনলোডৰ প্ৰয়োজন নাই। সম্পূৰ্ণ অফলাইনত চলে।"
                : selectedLanguage === "Hindi"
                ? "अपने मोबाइल या कंप्यूटर पर एक क्लिक में ऐप इंस्टॉल करें। बिना इंटरनेट 100% ऑफलाइन काम करता है।"
                : "Install SmritiSaarthi on your Android, iOS, Windows, or Mac device. Operates 100% offline with zero app-store downloads."}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (window.__pwaPrompt) {
              window.__pwaPrompt.prompt();
            } else {
              alert(
                selectedLanguage === "Assamese"
                  ? "আপোনাৰ ব্ৰাউজাৰৰ মেনু (⋮ বা Share) খুলি 'Install app' বা 'Add to Home screen' বাছনি কৰক।"
                  : selectedLanguage === "Hindi"
                  ? "अपने ब्राउज़र के मेनू (⋮) पर जाकर 'Install app' या 'Add to Home screen' चुनें।"
                  : "Open your browser menu (⋮) and tap 'Install app' or 'Add to Home screen' to install SmritiSaarthi."
              );
            }
          }}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95 hover:brightness-110 shrink-0"
          style={{ background: C.gold, color: "#1F4A45", ...fontBody }}
        >
          <Download size={16} />
          <span>
            {selectedLanguage === "Assamese"
              ? "📲 মবাইলত এপ ইনষ্টল কৰক (PWA)"
              : selectedLanguage === "Hindi"
              ? "📲 मोबाइल पर ऐप इंस्टॉल करें (PWA)"
              : "📲 Install PWA App on Device"}
          </span>
        </button>
      </div>
    </div>
  );
}
