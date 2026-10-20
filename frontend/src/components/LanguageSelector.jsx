import React from "react";
import { Globe2, Check, Sparkles, Volume2, X } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, Pill } from "../theme";
import { speakText } from "../speechUtils";

export default function LanguageSelector({ currentLang, onSelect, onClose }) {
  const languages = [
    {
      code: "as",
      name: "Assamese",
      native: "অসমীয়া",
      region: "Assam & Brahmaputra Valley",
      greeting: "নমস্কাৰ আইতা",
      sample: "মই আপোনাৰ স্মৃতিসাৰথী।",
      accent: C.teal,
    },
    {
      code: "hi",
      name: "Hindi",
      native: "हिन्दी",
      region: "North & Northeast Towns",
      greeting: "नमस्ते दादी जी",
      sample: "मैं आपका स्मृतिसारथी हूँ।",
      accent: C.gold,
    },
    {
      code: "bn",
      name: "Bengali",
      native: "বাংলা",
      region: "Barak Valley & Silchar",
      greeting: "নমস্কার ঠাকুমা",
      sample: "আমি আপনার স্মৃতিসাৰথী।",
      accent: C.rose,
    },
    {
      code: "en",
      name: "English",
      native: "English",
      region: "All Northeast Hubs",
      greeting: "Good morning, Aita",
      sample: "I am your SmritiSaarthi companion.",
      accent: C.tealDeep,
    },
    {
      code: "brx",
      name: "Bodo",
      native: "बर'",
      region: "Bodoland BTR Region",
      greeting: "खुलुमबाय आबौ",
      sample: "आं नोंथांनि स्मृतिसारथी।",
      accent: "#B76E00",
    },
    {
      code: "mni",
      name: "Manipuri",
      native: "মৈতৈলোন্",
      region: "Manipur & Imphal Valley",
      greeting: "খুরুমজরি ইবেন",
      sample: "ঐহাক অদোমগী স্মৃতিসাৰথীনি।",
      accent: "#7C4A6F",
    },
  ];

  const handlePick = (lang) => {
    speakText(`${lang.greeting}. ${lang.sample}`, lang.name);
    onSelect(lang.name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        className="rounded-[2rem] p-6 max-w-xl w-full shadow-2xl relative border"
        style={{ background: C.paper, borderColor: C.paperDeep }}
      >
        {/* Close Button if user just wants to cancel */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
          >
            <X size={16} />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2 shadow-xs"
            style={{ background: C.sageSoft, border: `1px solid ${C.sage}` }}
          >
            <Globe2 size={14} color={C.teal} />
            <span style={{ ...fontMono, color: C.teal }} className="uppercase tracking-widest text-[10px] font-bold">
              Select App Language · ভাষা নিৰ্বাচন
            </span>
          </div>

          <h2 style={{ ...fontDisplay, color: C.ink }} className="text-2xl font-bold">
            Choose Your Preferred Language
          </h2>
          <p style={{ ...fontBody, color: C.inkSoft }} className="text-xs mt-1 max-w-md mx-auto">
            The entire companion interface, voice assistant, daily care, and cognitive games will run in your chosen language.
          </p>
        </div>

        {/* 6 Regional Language Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {languages.map((lang) => {
            const isSelected = currentLang === lang.name;
            return (
              <button
                key={lang.code}
                onClick={() => handlePick(lang)}
                className={`text-left p-4 rounded-2xl transition-all duration-200 flex items-start justify-between border shadow-xs hover:shadow-md active:scale-98 ${
                  isSelected ? "ring-2 ring-teal-700 shadow-sm" : "hover:bg-white"
                }`}
                style={{
                  background: isSelected ? C.white : C.white,
                  borderColor: isSelected ? C.tealDeep : C.paperDeep,
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ ...fontDisplay, color: C.ink }} className="text-lg font-bold">
                      {lang.native}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700" style={fontBody}>
                      {lang.name}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-teal-800 mt-1" style={fontBody}>
                    "{lang.greeting}"
                  </p>
                  <p className="text-[10px] opacity-60 mt-0.5" style={fontBody}>
                    {lang.region}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: C.tealDeep }}>
                      <Check size={14} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center opacity-40 hover:opacity-100">
                      <Volume2 size={12} color={C.ink} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirmation Footer */}
        <div className="text-center pt-2 border-t border-slate-200/60">
          <p className="text-[11px] opacity-70" style={fontBody}>
            💡 You can switch language anytime from the top bar in one tap.
          </p>
        </div>
      </div>
    </div>
  );
}
