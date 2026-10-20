import React, { useState, useEffect } from "react";
import { Home as HomeIcon, Heart, Users, Sun, Wifi, WifiOff, RefreshCw, LogIn, LogOut, Globe2, Download, Smartphone } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, Pill } from "./theme";
import { api } from "./api";
import { DEMO } from "./demoData";
import Landing from "./components/Landing";
import PatientExperience from "./components/PatientExperience";
import CaregiverDashboard from "./components/CaregiverDashboard";
import CaretakerLogin from "./components/CaretakerLogin";
import LanguageSelector from "./components/LanguageSelector";

const AUTH_STORAGE_KEY = "smritisaarthi_caretaker_auth";
const LANG_STORAGE_KEY = "smritisaarthi_selected_lang";

export default function App() {
  const [view, setView] = useState("landing");
  const [isFieldMode, setIsFieldMode] = useState(false);
  const [pendingSync, setPendingSync] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");
    setIsStandalone(Boolean(standalone));

    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsStandalone(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        selectedLanguage === "Assamese"
          ? "আপোনাৰ ব্ৰাউজাৰৰ মেনু (⋮) খুলি 'Install app' বা 'Add to Home screen' বাছনি কৰক।"
          : selectedLanguage === "Hindi"
          ? "अपने ब्राउज़र के मेनू (⋮) पर जाकर 'Install app' या 'Add to Home screen' चुनें।"
          : "Open your browser menu (⋮) and choose 'Install app' or 'Add to Home screen' to install SmritiSaarthi."
      );
    }
  };

  // Global Language State (Prompt modal on first launch if not yet chosen)
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY) || "Assamese";
    } catch {
      return "Assamese";
    }
  });

  const [showLanguageModal, setShowLanguageModal] = useState(() => {
    try {
      return !localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  // Authenticated Caretaker / Doctor session state
  const [authenticatedCaretaker, setAuthenticatedCaretaker] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const checkSync = () => {
      setPendingSync(api.getPendingSyncCount());
    };
    checkSync();
    const interval = setInterval(checkSync, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.warn("Unable to save language preference:", e);
    }
    setShowLanguageModal(false);
  };

  const handleCaretakerLogin = (caretaker) => {
    setAuthenticatedCaretaker(caretaker);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(caretaker));
    } catch (e) {
      console.warn("Unable to save session:", e);
    }
    setView("caregiver");
  };

  const handleCaretakerSignOut = () => {
    setAuthenticatedCaretaker(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn("Unable to clear session:", e);
    }
    setView("caregiver_login");
  };

  const handleNav = (targetView) => {
    if (targetView === "caregiver") {
      if (!authenticatedCaretaker) {
        setView("caregiver_login");
      } else {
        setView("caregiver");
      }
    } else {
      setView(targetView);
    }
  };

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      {/* Language Selection Modal at Start or on Click */}
      {showLanguageModal && (
        <LanguageSelector
          currentLang={selectedLanguage}
          onSelect={handleLanguageSelect}
          onClose={() => setShowLanguageModal(false)}
        />
      )}

      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto flex-wrap gap-3">
        <button onClick={() => setView("landing")} className="flex items-center gap-2 transition-transform active:scale-95" style={{ ...fontDisplay, color: C.ink }}>
          <Sun size={20} color={C.gold} />
          <span className="font-bold text-lg">SmritiSaarthi AI</span>
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* PWA Install Button */}
          {!isStandalone && (
            <button
              onClick={handleInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all active:scale-95 hover:brightness-105"
              style={{ background: C.gold, color: "#1F4A45", ...fontBody }}
              title="Install SmritiSaarthi as a standalone app"
            >
              <Smartphone size={13} />
              <span>📲 Install App (PWA)</span>
            </button>
          )}

          {/* Global Language Switcher Button */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 shadow-2xs text-teal-900 hover:bg-slate-50 transition-all active:scale-95"
            style={fontBody}
            title="Change primary app language"
          >
            <Globe2 size={13} className="text-teal-700" />
            <span>{selectedLanguage}</span>
            <span className="text-[10px] opacity-60">(Change)</span>
          </button>

          {/* Offline / Field Mode Toggle */}
          <button
            onClick={() => setIsFieldMode(!isFieldMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs"
            style={{
              background: isFieldMode ? "#FFF3E0" : C.sageSoft,
              color: isFieldMode ? "#B76E00" : C.teal,
              border: `1px solid ${isFieldMode ? "#FFE0B2" : C.sage}`,
              ...fontBody,
            }}
            title="Toggle between online and remote NER low-connectivity simulation"
          >
            {isFieldMode ? <WifiOff size={13} /> : <Wifi size={13} />}
            {isFieldMode ? "Field Offline" : "Online"}
            {pendingSync > 0 && <span className="bg-amber-600 text-white px-1.5 py-0.2 rounded-full text-[10px]">{pendingSync}</span>}
          </button>

          {/* View Switcher Tabs */}
          <div className="flex gap-1.5 bg-white/70 p-1 rounded-full border border-slate-200 shadow-xs items-center">
            <button
              onClick={() => handleNav("landing")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: view === "landing" ? C.tealDeep : "transparent",
                color: view === "landing" ? C.white : C.inkSoft,
                ...fontBody,
              }}
            >
              <HomeIcon size={13} /> Overview
            </button>

            <button
              onClick={() => handleNav("patient")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: view === "patient" ? C.tealDeep : "transparent",
                color: view === "patient" ? C.white : C.inkSoft,
                ...fontBody,
              }}
            >
              <Heart size={13} /> {
                selectedLanguage === "Assamese" ? "ৰোগী (আইতা)" :
                selectedLanguage === "Hindi" ? "मरीज (दादी जी)" :
                selectedLanguage === "Bengali" ? "রোগী (ঠাকুমা)" :
                selectedLanguage === "Bodo" ? "सानेग्रा (आबौ)" :
                selectedLanguage === "Manipuri" ? "অনাবা (ইবেন)" :
                "Patient (Aita)"
              }
            </button>

            <button
              onClick={() => handleNav("caregiver")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: (view === "caregiver" || view === "caregiver_login") ? C.tealDeep : "transparent",
                color: (view === "caregiver" || view === "caregiver_login") ? C.white : C.inkSoft,
                ...fontBody,
              }}
            >
              <Users size={13} />
              {authenticatedCaretaker ? (
                <span className="flex items-center gap-1">
                  <span>{authenticatedCaretaker.name.split(" ")[0]}</span>
                  <span className="text-[10px] opacity-75">({authenticatedCaretaker.role_type === "doctor" ? "Doctor" : "Caregiver"})</span>
                </span>
              ) : (
                "Caretaker Portal"
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 pb-16">
        {view === "landing" && (
          <Landing
            onNav={handleNav}
            authenticatedCaretaker={authenticatedCaretaker}
            selectedLanguage={selectedLanguage}
            onOpenLanguageSelector={() => setShowLanguageModal(true)}
          />
        )}
        {view === "patient" && (
          <PatientExperience
            selectedLanguage={selectedLanguage}
            onOpenLanguageSelector={() => setShowLanguageModal(true)}
          />
        )}
        {view === "caregiver_login" && (
          <CaretakerLogin
            onLogin={handleCaretakerLogin}
            onBack={() => setView("landing")}
          />
        )}
        {view === "caregiver" && (
          authenticatedCaretaker ? (
            <CaregiverDashboard
              caretaker={authenticatedCaretaker}
              onSignOut={handleCaretakerSignOut}
            />
          ) : (
            <CaretakerLogin
              onLogin={handleCaretakerLogin}
              onBack={() => setView("landing")}
            />
          )
        )}
      </main>
    </div>
  );
}
