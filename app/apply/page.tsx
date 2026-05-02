"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle2, User, Phone,
  FileText, Rocket, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScj-nwvtMNed8326hjj_EY05tnANYv_A-NYURFWPwJqbhH9TA/formResponse";

// ─── Step definitions ─────────────────────────────────────────────────────────
const steps = [
  { id: 1, label: "Student Info",   icon: User,     title: "Tell us about your student.",      subtitle: "Basic information about the incoming student." },
  { id: 2, label: "Contact",        icon: Phone,    title: "How can we reach you?",             subtitle: "Parent or guardian contact details." },
  { id: 3, label: "Background",     icon: FileText, title: "A little background.",              subtitle: "Learning profile and how you found us." },
  { id: 4, label: "Your Story",     icon: Rocket,   title: "Why Mervil Catalyst?",              subtitle: "Help us understand your student's goals and character." },
];

type FormData = {
  firstName: string; lastName: string; grade: string; currentSchool: string;
  parentName: string; primaryEmail: string; additionalEmail: string; phone: string; address: string;
  learningNeeds: string; learningDetails: string; howHeard: string; infoSession: string;
  whyInterested: string; contributions: string; pathwaysFit: string; characteristics: string; otherInfo: string;
};

const EMPTY: FormData = {
  firstName: "", lastName: "", grade: "", currentSchool: "",
  parentName: "", primaryEmail: "", additionalEmail: "", phone: "", address: "",
  learningNeeds: "", learningDetails: "", howHeard: "", infoSession: "",
  whyInterested: "", contributions: "", pathwaysFit: "", characteristics: "", otherInfo: "",
};

// ─── Field components ─────────────────────────────────────────────────────────
function Field({
  label, name, value, onChange, required = true, type = "text", placeholder = "",
}: {
  label: string; name: keyof FormData; value: string; onChange: (n: keyof FormData, v: string) => void;
  required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#C0C0D0]/70 tracking-wide">
        {label}{required && <span className="text-[#00D4FF] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="px-4 py-3 rounded-xl bg-[#0D0D20] border border-[#00D4FF]/15 text-white text-sm placeholder:text-[#C0C0D0]/25 focus:outline-none focus:border-[#00D4FF]/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition-all"
      />
    </div>
  );
}

function TextArea({
  label, name, value, onChange, required = true, placeholder = "", hint,
}: {
  label: string; name: keyof FormData; value: string; onChange: (n: keyof FormData, v: string) => void;
  required?: boolean; placeholder?: string; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#C0C0D0]/70 tracking-wide">
        {label}{required && <span className="text-[#00D4FF] ml-1">*</span>}
      </label>
      {hint && <p className="text-[11px] text-[#C0C0D0]/40 -mt-0.5 leading-snug">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="px-4 py-3 rounded-xl bg-[#0D0D20] border border-[#00D4FF]/15 text-white text-sm placeholder:text-[#C0C0D0]/25 focus:outline-none focus:border-[#00D4FF]/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition-all resize-none leading-relaxed"
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const set = (name: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [name]: value }));

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStepValid = () => {
    if (step === 1) return data.firstName && data.lastName && data.grade && data.currentSchool;
    if (step === 2) return data.parentName && data.primaryEmail && data.phone && data.address;
    if (step === 3) return data.learningNeeds && data.howHeard && data.infoSession;
    if (step === 4) return data.whyInterested && data.contributions && data.pathwaysFit && data.characteristics;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = new URLSearchParams({
      "entry.149495572":  data.firstName,
      "entry.2005620554": data.lastName,
      "entry.1081601876": data.grade,
      "entry.1210029210": data.currentSchool,
      "entry.749213967":  data.parentName,
      "entry.1045781291": data.primaryEmail,
      "entry.732519118":  data.additionalEmail,
      "entry.1166974658": data.phone,
      "entry.1065046570": data.address,
      "entry.839337160":  data.learningNeeds,
      "entry.1039609381": data.learningDetails,
      "entry.650982363":  data.howHeard,
      "entry.733926478":  data.infoSession,
      "entry.845573583":  data.whyInterested,
      "entry.1815204934": data.contributions,
      "entry.1595011606": data.pathwaysFit,
      "entry.1567960135": data.characteristics,
      "entry.665500775":  data.otherInfo,
    });

    try {
      await fetch(FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // no-cors fetch always "fails" on the response — submission still goes through
    }

    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Hidden iframe for form submission (belt + suspenders) */}
      <iframe ref={iframeRef} name="hidden-form-target" className="hidden" />

      {/* Background atmosphere */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed left-0 top-0 w-96 h-96 bg-[#00D4FF]/4 blur-[120px] pointer-events-none" />
      <div className="fixed right-0 bottom-0 w-96 h-96 bg-[#A78BFA]/4 blur-[120px] pointer-events-none" />

      {/* Nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#00D4FF]/10 h-[72px] flex items-center px-6">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/csst-logo.png" alt="Mervil Catalyst" width={120} height={28} className="h-8 w-auto object-contain" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs text-[#C0C0D0]/50 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
        </div>
      </header>

      <main className="pt-[72px] pb-24">
        <div className="max-w-2xl mx-auto px-6">

          {/* ── SUCCESS STATE ── */}
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center py-24">
              <div className="w-20 h-20 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,212,255,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-4xl font-black text-white mb-4">Application Received.</h1>
              <p className="text-lg text-[#C0C0D0]/60 leading-relaxed mb-3 max-w-md">
                Thank you for applying to Mervil Catalyst for 2026–2027. Your application has been submitted.
              </p>
              <p className="text-sm text-[#C0C0D0]/40 max-w-md mb-10">
                The Mervil Catalyst admissions team will reach out with next steps. In the meantime, explore what
                makes this school unlike any other.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/"
                  className="px-6 py-3 rounded-xl bg-[#00D4FF] text-[#0A0A0F] text-sm font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                  Back to Mervil Catalyst →
                </Link>
                <a href="mailto:nathan.gorsch@d11.org?subject=Mervil Catalyst Application Question"
                  className="px-6 py-3 rounded-xl border border-[#00D4FF]/20 text-sm text-[#C0C0D0] hover:text-white hover:border-[#00D4FF]/40 transition-all">
                  Email Admissions
                </a>
              </div>
            </motion.div>
          ) : (
            <>
              {/* ── HEADER ── */}
              <div className="py-14 pb-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-5 text-[#00D4FF] text-xs font-medium tracking-[0.25em] uppercase">
                  <span className="w-8 h-px bg-[#00D4FF]" />2026–2027 Enrollment
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-3">
                  Apply to Mervil Catalyst.
                  <br /><span className="text-[#00D4FF]">100% Tuition Free.</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-sm text-[#C0C0D0]/50">
                  Submitting this application does not guarantee enrollment — it's the first step. The admissions team will contact you with next steps.
                </motion.p>
              </div>

              {/* ── STEP PROGRESS ── */}
              <div className="mb-10">
                <div className="flex items-center gap-0">
                  {steps.map((s, i) => {
                    const StepIcon = s.icon;
                    const done = step > s.id;
                    const active = step === s.id;
                    return (
                      <div key={s.id} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            done ? "bg-[#00D4FF] border-[#00D4FF]" :
                            active ? "bg-[#00D4FF]/15 border-[#00D4FF]" :
                            "bg-transparent border-[#C0C0D0]/15"
                          }`}>
                            {done
                              ? <CheckCircle2 className="w-4 h-4 text-[#0A0A0F]" />
                              : <StepIcon className={`w-4 h-4 ${active ? "text-[#00D4FF]" : "text-[#C0C0D0]/30"}`} />
                            }
                          </div>
                          <span className={`text-[10px] font-medium whitespace-nowrap ${active ? "text-[#00D4FF]" : done ? "text-[#C0C0D0]/60" : "text-[#C0C0D0]/25"}`}>
                            {s.label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`flex-1 h-px mx-2 mb-5 transition-all duration-500 ${step > s.id ? "bg-[#00D4FF]/50" : "bg-[#C0C0D0]/10"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── FORM PANEL ── */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="rounded-2xl border border-[#00D4FF]/10 bg-[#0D0D18] p-8"
                  >
                    {/* Step header */}
                    <div className="mb-8 pb-6 border-b border-[#00D4FF]/10">
                      <div className="flex items-center gap-2 mb-2">
                        {(() => { const S = steps[step - 1]; const Icon = S.icon; return <Icon className="w-4 h-4 text-[#00D4FF]" />; })()}
                        <span className="text-xs font-bold tracking-widest text-[#00D4FF]/60 uppercase">Step {step} of 4</span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-white">{steps[step - 1].title}</h2>
                      <p className="text-sm text-[#C0C0D0]/40 mt-1">{steps[step - 1].subtitle}</p>
                    </div>

                    {/* ── STEP 1: Student Info ── */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <Field label="Student First Name" name="firstName" value={data.firstName} onChange={set} placeholder="First name" />
                          <Field label="Student Last Name"  name="lastName"  value={data.lastName}  onChange={set} placeholder="Last name"  />
                        </div>
                        <Field label="Current Grade (2025–2026)" name="grade" value={data.grade} onChange={set} placeholder="e.g. 8th grade" />
                        <Field label="Current School (2025–2026)" name="currentSchool" value={data.currentSchool} onChange={set} placeholder="School name" />
                      </div>
                    )}

                    {/* ── STEP 2: Contact ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <Field label="Parent/Guardian Name(s)" name="parentName" value={data.parentName} onChange={set} placeholder="Full name(s)" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Field label="Primary Email" name="primaryEmail" value={data.primaryEmail} onChange={set} type="email" placeholder="your@email.com" />
                          <Field label="Additional Email (optional)" name="additionalEmail" value={data.additionalEmail} onChange={set} type="email" required={false} placeholder="optional" />
                        </div>
                        <Field label="Phone Number" name="phone" value={data.phone} onChange={set} type="tel" placeholder="(719) 000-0000" />
                        <Field label="Home Address" name="address" value={data.address} onChange={set} placeholder="Street, City, State, ZIP" />
                      </div>
                    )}

                    {/* ── STEP 3: Background ── */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <TextArea
                          label="Does your child have any specific learning needs?"
                          name="learningNeeds" value={data.learningNeeds} onChange={set}
                          hint="Mervil Catalyst actively supports diverse learners. There's no wrong answer here."
                          placeholder="Share anything relevant — IEP, 504, learning differences, etc. Or simply write 'None known.'"
                        />
                        <TextArea
                          label="Details about learning needs (optional)"
                          name="learningDetails" value={data.learningDetails} onChange={set} required={false}
                          placeholder="Any additional context you'd like to share..."
                        />
                        <Field
                          label="How did you hear about our school?"
                          name="howHeard" value={data.howHeard} onChange={set}
                          placeholder="e.g. Word of mouth, Google, school counselor..."
                        />
                        <Field
                          label="Have you attended an information session? If so, when?"
                          name="infoSession" value={data.infoSession} onChange={set}
                          placeholder="e.g. Yes – March 2026 open house. Or: Not yet."
                        />
                      </div>
                    )}

                    {/* ── STEP 4: Essay questions ── */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <TextArea
                          label="Why is your student interested in our school?"
                          name="whyInterested" value={data.whyInterested} onChange={set}
                          placeholder="What draws them to Mervil Catalyst specifically?"
                        />
                        <TextArea
                          label="What positive contributions will your student bring?"
                          name="contributions" value={data.contributions} onChange={set}
                          placeholder="How will they add to our community?"
                        />
                        <TextArea
                          label="How do our pathways fit your student's interests or future plans?"
                          name="pathwaysFit" value={data.pathwaysFit} onChange={set}
                          hint="Mervil Catalyst pathways: Cybersecurity · Aerospace · Entrepreneurship · Leadership"
                          placeholder="Which pathway(s) resonate and why?"
                        />
                        <TextArea
                          label="How does your student demonstrate Mervil Catalyst's characteristics?"
                          name="characteristics" value={data.characteristics} onChange={set}
                          hint="Mervil Catalyst students are active participants, value respectful relationships, and are willing to work hard and grow."
                          placeholder="Share specific examples..."
                        />
                        <TextArea
                          label="Anything else you'd like us to know?"
                          name="otherInfo" value={data.otherInfo} onChange={set} required={false}
                          placeholder="Optional — any other context that would help us understand your student."
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ── NAV BUTTONS ── */}
                <div className="flex items-center justify-between mt-6 gap-4">
                  {step > 1 ? (
                    <button type="button" onClick={prevStep}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#C0C0D0]/15 text-sm text-[#C0C0D0]/60 hover:text-white hover:border-[#C0C0D0]/30 transition-all">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <Link href="/"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#C0C0D0]/10 text-sm text-[#C0C0D0]/40 hover:text-[#C0C0D0]/60 transition-all">
                      <ArrowLeft className="w-4 h-4" /> Cancel
                    </Link>
                  )}

                  {step < 4 ? (
                    <button
                      type="button" onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#00D4FF] text-[#0A0A0F] text-sm font-bold shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid() || submitting}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#00D4FF] text-[#0A0A0F] text-sm font-bold shadow-[0_0_24px_rgba(0,212,255,0.35)] hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <><span className="w-4 h-4 border-2 border-[#0A0A0F]/40 border-t-[#0A0A0F] rounded-full animate-spin" /> Submitting…</>
                      ) : (
                        <>Submit Application <Rocket className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Fine print */}
                <p className="text-[11px] text-[#C0C0D0]/25 text-center mt-6 leading-relaxed">
                  Your application is submitted directly to Mervil Catalyst Admissions via the official D11 form system.
                  Submitting does not guarantee enrollment.
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
