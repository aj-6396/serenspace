import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { Eye, Hand, Ear, Wind, Coffee } from 'lucide-react'

const GROUNDING_STEPS = [
  { id: 5, label: "things you can see", icon: Eye, color: "var(--color-primary)" },
  { id: 4, label: "things you can physically touch", icon: Hand, color: "var(--color-secondary)" },
  { id: 3, label: "things you can hear right now", icon: Ear, color: "var(--color-primary)" },
  { id: 2, label: "things you can smell", icon: Wind, color: "var(--color-secondary)" },
  { id: 1, label: "thing you can taste", icon: Coffee, color: "var(--color-primary)" },
]

export default function GroundingPage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const openBreathe = useWellnessStore((s) => s.openBreathe)
  const [stepIndex, setStepIndex] = useState(0)

  const currentStep = GROUNDING_STEPS[stepIndex]
  const isComplete = stepIndex >= GROUNDING_STEPS.length

  const handleNext = () => {
    if (!isComplete) setStepIndex(s => s + 1)
  }

  return (
    <main
      aria-label="Sensory Grounding Exercise"
      className="flex flex-col items-center justify-center min-h-screen px-6 py-20"
    >
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-lg text-center">
        {!isComplete ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
                  Grounding Exercise
                </p>
                <h2 className="text-xl md:text-2xl text-[var(--text-main)] mb-2">
                  Look around you and find...
                </h2>
              </div>

              <div className="glass-card w-full py-16 px-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ background: `radial-gradient(circle, ${currentStep.color} 0%, transparent 70%)` }}
                />
                
                <currentStep.icon 
                  className="w-16 h-16 mb-6 transition-all duration-700" 
                  style={{ color: currentStep.color }} 
                  strokeWidth={1.5}
                />
                
                <h1 className="text-6xl font-semibold mb-4" style={{ color: currentStep.color }}>
                  {currentStep.id}
                </h1>
                
                <p className="text-xl text-[var(--text-main)]">
                  {currentStep.label}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="
                  px-8 py-3 rounded-full font-medium text-sm border
                  border-[var(--border-subtle)] text-[var(--text-muted)]
                  hover:bg-white/5 hover:text-[var(--text-main)] active:scale-95
                  transition-all duration-200
                "
              >
                I've found them →
              </button>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">You are here.</h2>
            <p className="text-[var(--text-muted)] max-w-sm">
              You've reconnected with your surroundings. Take a deep breath. You are safe in this moment.
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={goHome}
                className="px-6 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:bg-white/5 transition-colors text-sm"
              >
                Return to home
              </button>
              <button
                onClick={openBreathe}
                className="px-6 py-3 rounded-xl border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition-colors text-sm"
              >
                Breathe with me
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
