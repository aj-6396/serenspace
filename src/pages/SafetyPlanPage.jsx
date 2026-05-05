import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { AlertCircle, Save, Shield, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    key: 'warningSigns',
    title: "Warning Signs",
    desc: "What thoughts, moods, or behaviors let you know you are heading for a crisis?",
    placeholder: "e.g., Withdrawing from friends, feeling hopeless, or extreme restlessness..."
  },
  {
    key: 'copingStrategies',
    title: "Internal Coping",
    desc: "What things can you do on your own to take your mind off your problems?",
    placeholder: "e.g., Breathing exercises, listening to my 'Calm' playlist, or taking a cold shower..."
  },
  {
    key: 'distractions',
    title: "Places & People for Distraction",
    desc: "Where can you go or who can you be around that provides a healthy distraction?",
    placeholder: "e.g., Going to the local park, the library, or calling my cousin to talk about movies..."
  },
  {
    key: 'supporters',
    title: "People I Can Ask for Help",
    desc: "Who are the trusted individuals you can tell you are in a crisis?",
    placeholder: "Name and Phone Number of close friends or family members..."
  },
  {
    key: 'professionals',
    title: "Professional Support",
    desc: "List the names and numbers of your therapist, doctor, or local crisis line.",
    placeholder: "Therapist: 555-0199, Local Helpline: 1-800..."
  }
]

export default function SafetyPlanPage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const safetyPlan = useWellnessStore((s) => s.safetyPlan)
  const setSafetyPlan = useWellnessStore((s) => s.setSafetyPlan)

  const [localPlan, setLocalPlan] = useState(safetyPlan)
  const [stepIndex, setStepIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const currentStep = STEPS[stepIndex]

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(s => s + 1)
    } else {
      handleSave()
    }
  }

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(s => s - 1)
  }

  const handleSave = () => {
    setSafetyPlan(localPlan)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
      <motion.button
        onClick={goHome}
        className="absolute top-24 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </motion.button>

      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
              <Shield className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-[var(--text-main)] mb-2">My Safety Plan</h1>
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            This plan is stored locally on your device. It is a roadmap to keep you safe when things get difficult.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--color-primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 border border-[var(--border-subtle)] space-y-6"
          >
            <div>
              <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest">
                Step {stepIndex + 1} of {STEPS.length}
              </span>
              <h2 className="text-xl font-semibold text-[var(--text-main)] mt-1">{currentStep.title}</h2>
              <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                {currentStep.desc}
              </p>
            </div>

            <textarea
              className="textarea-calm w-full p-4 text-sm min-h-[140px]"
              placeholder={currentStep.placeholder}
              value={localPlan[currentStep.key]}
              onChange={(e) => setLocalPlan({ ...localPlan, [currentStep.key]: e.target.value })}
            />

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrev}
                disabled={stepIndex === 0}
                className="px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-0 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              >
                {stepIndex === STEPS.length - 1 ? (
                  <> {isSaved ? "Saved" : "Complete & Save"} <Save className="w-4 h-4" /> </>
                ) : (
                  <> Next <ArrowRight className="w-4 h-4" /> </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[var(--color-secondary)] text-sm font-medium"
          >
            <CheckCircle className="w-4 h-4" /> Your Safety Plan has been updated locally.
          </motion.div>
        )}

        <div className="flex gap-2 items-start bg-black/10 p-4 rounded-xl border border-[var(--border-subtle)]/60 select-none">
          <AlertCircle className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-normal text-[var(--text-muted)]">
            <strong>Clinical Note:</strong> This Safety Plan is based on the Stanley-Brown model. It is a supportive tool, not a substitute for professional clinical intervention. If you are in immediate danger, please use the Rescue button or call emergency services.
          </p>
        </div>
      </div>
    </main>
  )
}
