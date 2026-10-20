import React, { useState, useEffect } from "react";
import { Download, Smartphone, CheckCircle, ShieldCheck, Heart, Globe2, Wifi, WifiOff, RefreshCw, Info, ExternalLink, X } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, Pill } from "../theme";
import { api } from "../api";

export default function Footer({ selectedLanguage = "Assamese", onOpenLanguageSelector, onNav }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [pendingSync, setPendingSync] = useState(0);

  useEffect(() => {
    // Check if running in standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");

    setIsInstalled(Boolean(isStandalone));

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Track appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check pending sync
    const checkSync = () => {
      setPendingSync(api.getPendingSyncCount ? api.getPendingSyncCount() : 0);
    };
    checkSync();
    const interval = setInterval(checkSync, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearInterval(interval);
    };
  }, []);

  const handleInstallClick = async () => {
    // If iOS Safari
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIos && !isInstalled) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) {
      // Fallback instruction
      alert(
        selectedLanguage === "Assamese"
          ? "আপোনাৰ ব্ৰাউজাৰৰ মেনু (⋮ বা Share) খুলি 'Add to Home screen' বা 'Install app' বাছনি কৰক।"
          : selectedLanguage === "Hindi"
          ? "अपने ब्राउज़र के मेनू (⋮ या Share) पर जाकर 'Add to Home screen' या 'Install app' चुनें।"
          : "Open your browser menu (⋮ or Share) and tap 'Add to Home screen' or 'Install app' to install SmritiSaarthi."
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const footerTexts = {
    Assamese: {
      pwaBadge: "প্ৰগ্ৰেছিভ ৱেব এপ (PWA)",
      installBtn: "মবাইলত এপ ইনষ্টল কৰক (Install PWA)",
      installedBadge: "মোবাইলত ইনষ্টল কৰা হৈছে (Standalone PWA)",
      nerRegion: "অসম আৰু উত্তৰ-পূৰ্বাঞ্চলৰ বিশেষ প্ৰযুক্তি",
      helpline: "GMCH জৰুৰীকালীন স্বাস্থ্য সহায়: +91 98540 98765 | 108",
      dignity: "স্মৃতিসাৰথী — আত্মমৰ্যাদা আৰু মৰমৰ সংগী",
      quickLinks: "প্ৰধান লিংকসমূহ",
      switchLang: "ভাষা সলনি কৰক",
      offlineReady: "অফলাইন কাৰ্যক্ষম",
      synced: "সকলো তথ্য ছিংক হৈছে",
    },
    Hindi: {
      pwaBadge: "प्रोग्रेसिव वेब ऐप (PWA)",
      installBtn: "मोबाइल पर ऐप इंस्टॉल करें (Install PWA)",
      installedBadge: "मोबाइल ऐप मोड में सक्रिय (Standalone PWA)",
      nerRegion: "असम और पूर्वोत्तर भारत हेतु विशेष निर्मित",
      helpline: "GMCH आपातकालीन चिकित्सा हेल्पलाइन: +91 98540 98765 | 108",
      dignity: "स्मृतिसारथी — गरिमा और स्नेह का साथी",
      quickLinks: "त्वरित लिंक्स",
      switchLang: "भाषा बदलें",
      offlineReady: "ऑफलाइन सक्षम",
      synced: "सभी डेटा सिंक है",
    },
    Bengali: {
      pwaBadge: "প্রোগ্রেসিভ ওয়েব অ্যাপ (PWA)",
      installBtn: "মোবাইলে অ্যাপ ইনস্টল করুন (Install PWA)",
      installedBadge: "মোবাইল অ্যাপ মোডে সক্রিয় (Standalone PWA)",
      nerRegion: "আসাম ও উত্তর-পূর্ব ভারতের বিশেষ প্রযুক্তি",
      helpline: "GMCH জরুরি স্বাস্থ্য সহায়তা: +91 98540 98765 | 108",
      dignity: "স্মৃতিসাৰথী — আত্মমর্যাদা ও ভালোবাসার সঙ্গী",
      quickLinks: "গুরুত্বপূর্ণ লিঙ্ক",
      switchLang: "ভাষা পরিবর্তন",
      offlineReady: "অফলাইন কার্যকর",
      synced: "সব ডেটা সিঙ্ক হয়েছে",
    },
    English: {
      pwaBadge: "Progressive Web App (PWA)",
      installBtn: "Install App on Mobile / PC (PWA)",
      installedBadge: "Active in Mobile PWA Standalone Mode",
      nerRegion: "Engineered for Assam & Northeast Region (NER)",
      helpline: "GMCH Emergency Helpline: +91 98540 98765 | 108",
      dignity: "SmritiSaarthi — Empowering Dignity & Memory Care",
      quickLinks: "Quick Navigation",
      switchLang: "Change Language",
      offlineReady: "Offline Capable",
      synced: "Fully Synced",
    },
    Bodo: {
      pwaBadge: "प्रग्रेसिभ वेब एप (PWA)",
      installBtn: "एप्प इनस्तल खालाम (Install PWA)",
      installedBadge: "मबाइल एप्प मोडाव दं (Standalone PWA)",
      nerRegion: "आसाम आरो सानजा-सा बाहागोनि थाखाय",
      helpline: "हेल्पलाइन: +91 98540 98765 | 108",
      dignity: "सारथी — गोसोखांथि आरो अननायनि लोगो",
      quickLinks: "गाहाय लिंकफोर",
      switchLang: "राव सोलाय",
      offlineReady: "अफलाइन हाबा मावनो हागौ",
      synced: "सिंक जाबाय",
    },
    Manipuri: {
      pwaBadge: "প্রোগ্রেসিভ ৱেব এপ (PWA)",
      installBtn: "মোবাইলদা এপ ইন্সটোল তৌবীয়ু (Install PWA)",
      installedBadge: "মোবাইল এপ মোদতা লৈরে (Standalone PWA)",
      nerRegion: "অসাম অমসুং নোংপোক চিং লমদমগীদমক",
      helpline: "হেল্পলাইন: +91 98540 98765 | 108",
      dignity: "সাৰথী — নীংশিং অমসুং নুংশিবগী নক্নবা মীওই",
      quickLinks: "মরুওইবা লিঙ্কশিং",
      switchLang: "লোন হোংদোকপা",
      offlineReady: "অফলাইনদা শিজিন্নবা য়াবা",
      synced: "সিঙ্ক তৌরে",
    },
  };

  const t = footerTexts[selectedLanguage] || footerTexts.English;

  return (
    <footer className="mt-16 pt-8 pb-12 border-t" style={{ borderColor: "rgba(31,74,69,0.12)", background: "rgba(253,251,247,0.85)" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-8">
        {/* PWA Install & Offline Status Highlight Banner */}
        <div
          className="rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md transition-all"
          style={{
            background: `linear-gradient(135deg, ${C.tealDeep}, #122E2B)`,
            color: C.white,
            border: `1.5px solid ${C.gold}`,
          }}
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 shrink-0 border border-white/20">
              <Smartphone size={28} color={C.gold} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold" style={fontDisplay}>
                  SmritiSaarthi PWA
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30" style={fontMono}>
                  {t.pwaBadge}
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-1" style={fontBody}>
                {isInstalled ? t.installedBadge : "Works offline with zero app-store downloads. Fast, lightweight & private."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {isInstalled ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                <CheckCircle size={16} />
                <span>{t.installedBadge}</span>
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="w-full md:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 hover:brightness-110"
                style={{ background: C.gold, color: "#1F4A45", ...fontBody }}
              >
                <Download size={16} />
                <span>{t.installBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {/* Col 1: Brand & Dignity */}
          <div className="space-y-2.5 md:col-span-1">
            <div className="flex items-center gap-2" style={{ ...fontDisplay, color: C.ink }}>
              <span className="text-xl">🌸</span>
              <span className="font-bold text-base">SmritiSaarthi AI</span>
            </div>
            <p className="text-xs leading-relaxed opacity-75" style={{ color: C.inkSoft, ...fontBody }}>
              {t.dignity}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white border border-slate-200 text-teal-800" style={fontMono}>
              <ShieldCheck size={12} color={C.teal} />
              <span>Offline-First PWA v0.2.0</span>
            </div>
          </div>

          {/* Col 2: Regional NER Ecosystem */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: C.ink, ...fontMono }}>
              {t.nerRegion}
            </p>
            <p className="text-xs leading-relaxed opacity-75" style={{ color: C.inkSoft, ...fontBody }}>
              Tailored for 6 NER languages: Assamese, Bodo, Manipuri, Bengali, Hindi, English.
            </p>
            <button
              onClick={onOpenLanguageSelector}
              className="mt-1 flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: C.teal, ...fontBody }}
            >
              <Globe2 size={13} /> {t.switchLang}
            </button>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: C.ink, ...fontMono }}>
              {t.quickLinks}
            </p>
            <ul className="space-y-1.5 text-xs" style={{ color: C.inkSoft, ...fontBody }}>
              <li>
                <button onClick={() => onNav && onNav("landing")} className="hover:text-teal-800 transition-colors">
                  🏠 Platform Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNav && onNav("patient")} className="hover:text-teal-800 transition-colors">
                  ❤️ Patient Experience (Aita)
                </button>
              </li>
              <li>
                <button onClick={() => onNav && onNav("caregiver")} className="hover:text-teal-800 transition-colors">
                  🩺 Caretaker & Clinical Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Healthcare Helpline & Offline Status */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: C.ink, ...fontMono }}>
              Emergency & Status
            </p>
            <p className="text-[11px] leading-relaxed opacity-80" style={{ color: C.inkSoft, ...fontBody }}>
              {t.helpline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-medium opacity-80" style={{ color: C.teal, ...fontBody }}>
                {pendingSync > 0 ? `Sync Queue: ${pendingSync} pending` : t.synced}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] opacity-60 text-center sm:text-left" style={fontBody}>
          <p>© 2026 SmritiSaarthi AI Platform. Dedicated to geriatric dignity & cognitive well-being in Northeast India.</p>
          <p>For clinical decision support only. Not a standalone emergency diagnostic device.</p>
        </div>
      </div>

      {/* iOS Safari Manual Install Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
            >
              <X size={16} />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-3">
              <Smartphone size={24} />
            </div>
            <h3 className="font-bold text-base" style={{ ...fontDisplay, color: C.ink }}>
              Install on iOS Safari
            </h3>
            <div className="text-left text-xs space-y-2 mt-3 bg-slate-50 p-4 rounded-2xl border border-slate-100" style={fontBody}>
              <p><strong>1.</strong> Tap the <strong>Share</strong> button (box with arrow <span className="font-mono">⎋</span>) at the bottom of Safari.</p>
              <p><strong>2.</strong> Scroll down and select <strong>'Add to Home Screen'</strong> (➕).</p>
              <p><strong>3.</strong> Tap <strong>'Add'</strong> at top right to use SmritiSaarthi like a native app!</p>
            </div>
            <button
              onClick={() => setShowIosGuide(false)}
              className="mt-4 w-full py-2.5 rounded-xl font-semibold text-xs text-white"
              style={{ background: C.tealDeep }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
