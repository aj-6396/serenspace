import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { AlertCircle } from 'lucide-react'

const PMR_STEPS = [
  {
    title: "Hands and Fists",
    instruction: "Squeeze both of your fists tightly. Feel the tension in your hands, wrists, and forearms.",
    action: "Squeeze tightly..."
  },
  {
    title: "Arms and Shoulders",
    instruction: "Raise your shoulders up towards your ears. Pull your arms tightly against your body.",
    action: "Hold tension..."
  },
  {
    title: "Facial Muscles",
    instruction: "Squeeze your eyes shut and scrunch up your face. Clench your jaw slightly.",
    action: "Hold tension..."
  },
  {
    title: "Abdomen and Core",
    instruction: "Tighten your abdominal muscles as if you were bracing for a physical impact.",
    action: "Hold the squeeze..."
  }
]

export default function PMRPage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const openStillness = useWellnessStore((s) => s.openStillness)

  const [stepIndex, setStepIndex] = useState(0)
  const [isTensed, setIsTensed] = useState(true)
  const [timer, setTimer] = useState(6)

  const currentStep = PMR_STEPS[stepIndex]
  const isComplete = stepIndex >= PMR_STEPS.length

  useEffect(() => {
    if (isComplete) return

    let intervalId = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          // Switch state between Tense and Release
          if (isTensed) {
            setIsTensed(false)
            return 8 // Give longer time for release/relaxation phase
          } else {
            // Move to the next muscle group
            if (stepIndex < PMR_STEPS.length - 1) {
              setStepIndex(s => s + 1)
              setIsTensed(true)
              return 6
            } else {
              setStepIndex(PMR_STEPS.length)
              return 0
            }
          }
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [stepIndex, isTensed, isComplete])

  return (
    <main
      aria-label="Guided Muscle Relaxation"
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12"
    >
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-lg text-center flex flex-col gap-8">
        {!isComplete ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.title + isTensed}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center gap-6"
            >
              <div>
                <p className="text-xs font-semibold tracking-wider text-[var(--color-primary)] uppercase mb-2">
                  DBT Relaxation Tool
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold text-[var(--text-main)] mb-1">
                  {currentStep.title}
                </h1>
              </div>

              {/* Progress visual card */}
              <div className="glass-card w-full py-12 px-6 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                  style={{ background: isTensed ? 'var(--color-primary)' : 'var(--color-secondary)' }}
                />

                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  {isTensed ? "Tense Phase" : "Release Phase"}
                </span>

                <h2 className="text-3xl font-bold mb-4" style={{ color: isTensed ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                  {isTensed ? currentStep.action : "Now, release..."}
                </h2>

                <p className="text-[var(--text-main)] text-sm md:text-base max-w-sm leading-relaxed mb-6">
                  {isTensed ? currentStep.instruction : "Let the muscles entirely let go. Notice the sensation of warmth and calm flooding the area."}
                </p>

                {/* Countdown display */}
                <div className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-xs text-[var(--text-muted)]">
                  {timer}s
                </div>
              </div>

              {/* Action row to bypass manually */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (isTensed) {
                      setIsTensed(false)
                      setTimer(8)
                    } else {
                      if (stepIndex < PMR_STEPS.length - 1) {
                        setStepIndex(s => s + 1)
                        setIsTensed(true)
                        setTimer(6)
                      } else {
                        setStepIndex(PMR_STEPS.length)
                      }
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-main)] text-xs font-medium transition-all"
                >
                  Advance phase →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-2xl font-semibold text-[var(--color-secondary)]">Complete.</h2>
            <p className="text-[var(--text-muted)] max-w-xs leading-relaxed text-sm">
              You've reset your physical tension. Take a minute to allow the calm to settle into your body.
            </p>
            <div className="flex gap-3">
              <button
                onClick={goHome}
                className="px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-white/5 transition-colors text-sm"
              >
                Return to home
              </button>
              <button
                onClick={openStillness}
                className="px-5 py-3 rounded-xl border border-[var(--color-primary)]/25 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors text-sm"
              >
                A minute of peace
              </button>
            </div>
          </motion.div>
        )}

        {/* Medical disclaimer note */}
        <div className="flex gap-2 items-start bg-black/10 p-3.5 rounded-xl border border-[var(--border-subtle)]/60 max-w-md mx-auto text-left mt-4 select-none">
          <AlertCircle className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-normal text-[var(--text-muted)]">
            <strong>Important Disclaimer:</strong> This guided relaxation tool is provided as a supportive resource only. It is not a clinical medical advisory or a replacement for therapy. If you are experiencing ongoing mental health issues, please seek consultation from a qualified healthcare professional.
          </p>
        </div>
      </div>
    </main>
  )
}
