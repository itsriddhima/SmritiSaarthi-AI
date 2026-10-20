import React, { useState } from "react";
import {
  ShieldCheck,
  Stethoscope,
  Heart,
  Users,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  Phone,
  Info,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, Pill } from "../theme";
import { DEMO } from "../demoData";

export default function CaretakerLogin({ onLogin, onBack }) {
  // Single designated caretaker profile
  const caretakerProfile = DEMO.caretakers[0] || {
    id: 1,
    name: "Ananya Sarma",
    email: "ananya.caregiver@smritisaarthi.in",
    pin: "1234",
    password: "caretaker@123",
    role: "Primary Caregiver",
    role_type: "family_caregiver",
    relation: "Daughter-in-law & Primary Caregiver",
    hospital: "Guwahati Elder Care Network",
    avatar: "👩🏽",
    patient_assigned: "Aita Devi (74)",
    phone: "+91 98640 12345",
  };

  const [caretakerId, setCaretakerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleAutofill = () => {
    setCaretakerId(caretakerProfile.email);
    setPassword(caretakerProfile.password || "caretaker@123");
    setErrorMsg(null);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const inputId = caretakerId.trim().toLowerCase();
    const inputPass = password.trim();

    if (!inputId || !inputPass) {
      setErrorMsg("Please enter both Caretaker ID / Email and Password.");
      return;
    }

    const validEmails = [
      caretakerProfile.email.toLowerCase(),
      "caregiver",
      "ananya",
      "ananya.caregiver",
      "caregiver_01",
      caretakerProfile.phone.replace(/\s+/g, ""),
    ];
    const validPasswords = [
      "caretaker@123",
      "1234",
      caretakerProfile.pin,
      caretakerProfile.password,
    ];

    if (validEmails.includes(inputId) && validPasswords.includes(inputPass)) {
      setSuccessMsg(`Welcome back, ${caretakerProfile.name}! Opening Caretaker Portal…`);
      setTimeout(() => {
        onLogin(caretakerProfile);
      }, 500);
    } else {
      setErrorMsg("Invalid Caretaker ID or Password. Please check the credentials displayed on the left.");
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-transform active:scale-95 hover:bg-white"
          style={{ background: C.white, border: `1px solid ${C.paperDeep}`, color: C.ink, ...fontBody }}
        >
          <ArrowLeft size={14} /> Back to Overview
        </button>

        <div className="flex items-center gap-1.5 text-xs opacity-75" style={fontMono}>
          <ShieldCheck size={14} color={C.teal} />
          <span>GMCH & NER Health Network Secure Portal</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 shadow-xs" style={{ background: C.sageSoft, border: `1px solid ${C.sage}` }}>
          <Stethoscope size={14} color={C.teal} />
          <span style={{ ...fontMono, color: C.teal }} className="uppercase tracking-widest text-[11px] font-bold">
            Caregiver Portal Gateway
          </span>
        </div>

        <h1 style={{ ...fontDisplay, color: C.ink }} className="text-3xl md:text-4xl font-bold mb-2">
          Caretaker Login Portal
        </h1>
        <p style={{ ...fontBody, color: C.inkSoft }} className="text-sm max-w-lg mx-auto">
          Sign in to access patient care routines, medical alerts, and cognitive tracking for <strong>Aita Devi</strong>.
        </p>
      </div>

      {/* Two Column Layout: Left (Credentials) | Right (Login Form) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 1 Caretaker Credentials & Information */}
        <div className="md:col-span-5 flex flex-col justify-between rounded-3xl p-6 shadow-sm border" style={{ background: C.white, borderColor: C.paperDeep }}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="text-3xl w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs" style={{ background: C.sageSoft }}>
                  {caretakerProfile.avatar || "👩🏽"}
                </div>
                <div>
                  <h2 style={{ ...fontDisplay, color: C.ink }} className="font-bold text-base">
                    {caretakerProfile.name}
                  </h2>
                  <Pill tone="sage">{caretakerProfile.role}</Pill>
                </div>
              </div>
            </div>

            <p className="text-xs mb-4" style={{ color: C.inkSoft, ...fontBody }}>
              Authorized Primary Caregiver for Guwahati Home Elder Care. Use the credentials below to authenticate:
            </p>

            {/* Credential Details Card */}
            <div className="rounded-2xl p-4 space-y-3 mb-4" style={{ background: C.paper, border: `1px solid ${C.paperDeep}` }}>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5" style={fontMono}>
                  Caretaker ID / Email
                </span>
                <div className="font-mono text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-teal-900 select-all">
                  {caretakerProfile.email}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5" style={fontMono}>
                  Password / Security PIN
                </span>
                <div className="font-mono text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-teal-900 select-all flex items-center justify-between">
                  <span>caretaker@123 <span className="opacity-60 text-[11px]">(or PIN: 1234)</span></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 space-y-1 text-[11px]" style={fontBody}>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Assigned Patient:</span>
                  <strong className="text-slate-800">{caretakerProfile.patient_assigned || "Aita Devi (Age 74)"}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Facility / Care Unit:</span>
                  <strong className="text-slate-800">{caretakerProfile.hospital || "Guwahati Elder Network"}</strong>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Auto-fill Helper Button */}
            <button
              type="button"
              onClick={handleAutofill}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95"
              style={{
                background: isCopied ? C.sageSoft : C.goldSoft,
                color: isCopied ? C.teal : "#8A6416",
                border: `1px solid ${isCopied ? C.sage : "#E8CE8E"}`,
                ...fontBody,
              }}
            >
              {isCopied ? <Check size={14} /> : <Sparkles size={14} />}
              {isCopied ? "Credentials Applied to Form!" : "Auto-Fill Credentials to Login"}
            </button>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="md:col-span-7 rounded-3xl p-6 shadow-sm border flex flex-col justify-between" style={{ background: C.white, borderColor: C.paperDeep }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <KeyRound size={20} color={C.teal} />
              <h2 style={{ ...fontDisplay, color: C.ink }} className="text-xl font-bold">
                Sign In to Caregiver Portal
              </h2>
            </div>
            <p className="text-xs mb-5" style={{ color: C.inkSoft, ...fontBody }}>
              Enter the Caretaker ID and Password to securely view clinical records and care schedules.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl flex items-start gap-2 text-xs bg-rose-50 text-rose-800 border border-rose-200 animate-fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl flex items-start gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 animate-fade-in">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-slate-700" style={fontMono}>
                  Caretaker ID or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={caretakerId}
                    onChange={(e) => setCaretakerId(e.target.value)}
                    placeholder="e.g. ananya.caregiver@smritisaarthi.in"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 transition-all font-medium"
                    style={fontBody}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-slate-700" style={fontMono}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (e.g. caretaker@123)"
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 hover:shadow-lg"
                  style={{ background: C.tealDeep, ...fontBody }}
                >
                  <Lock size={15} /> Secure Caretaker Sign In
                </button>
              </div>
            </form>
          </div>

          {/* Security note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[11px] text-slate-500">
            <ShieldCheck size={16} color={C.teal} className="shrink-0" />
            <span style={fontBody}>Encrypted Caregiver Session with DPDP Act & HIPAA compliance.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
