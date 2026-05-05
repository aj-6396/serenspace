/**
 * BreathingOrb.jsx
 *
 * A guided breathing exercise component using a pulsing visual orb.
 * Phases: Inhale (4s) → Hold (4s) → Exhale (6s) → Rest (2s)
 * Entirely self-contained; no APIs, no storage.
 */
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import InfoTooltip from './InfoTooltip'

const PHASES = [
  { label: 'Inhale...',  duration: 4000, scale: 1.35, opacity: 0.9 },
  { label: 'Hold...',    duration: 4000, scale: 1.35, opacity: 0.85 },
  { label: 'Exhale...',  duration: 6000, scale: 1.0,  opacity: 0.6 },
  { label: 'Rest...',    duration: 2000, scale: 1.0,  opacity: 0.4 },
]

export default function BreathingOrb() {
  const goHome = useWellnessStore((s) => s.goHome)
  const openVent = useWellnessStore((s) => s.openVent)

  const [phaseIndex, setPhaseIndex] = useState(0)
  const [countdown, setCountdown]   = useState(PHASES[0].duration / 1000)
  const [running, setRunning]       = useState(false)

  const timerRef     = useRef(null)
  const countdownRef = useRef(null)

  const phase = PHASES[phaseIndex]

  const startCycle = () => {
    setRunning(true)
    setPhaseIndex(0)
    setCountdown(PHASES[0].duration / 1000)
  }

  useEffect(() => {
    if (!running) return

    clearTimeout(timerRef.current)
    clearInterval(countdownRef.current)

    const p = PHASES[phaseIndex]
    setCountdown(p.duration / 1000)

    let remaining = p.duration / 1000
    countdownRef.current = setInterval(() => {
      remaining -= 1
      setCountdown(remaining)
    }, 1000)

    timerRef.current = setTimeout(() => {
      clearInterval(countdownRef.current)
      setPhaseIndex((prev) => (prev + 1) % PHASES.length)
    }, p.duration)

    return () => {
      clearTimeout(timerRef.current)
      clearInterval(countdownRef.current)
    }
  }, [phaseIndex, running])

  return (
    <motion.section
      aria-label="Guided breathing exercise"
      animate={{ backgroundColor: running ? 'var(--color-primary-soft)' : 'transparent' }}
      className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 text-center transition-colors duration-1000 relative overflow-hidden"
    >
      {/* Back */}
      <motion.button
        onClick={goHome}
        aria-label="Back to home"
        className="absolute top-8 left-6 sm:left-10 text-[var(--text-muted)] hover:text-[var(--text-main)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none transition-all text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-3 p-3 h-12"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <ChevronLeft size={20} /> <span className="mt-0.5">Home</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-12 sm:gap-20 w-full max-w-md relative z-10"
      >
        <div className="space-y-4 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-main)] flex items-center justify-center gap-3 tracking-tight font-heading">
            Breathe
          </h1>
          <p className="text-[var(--text-muted)] text-base sm:text-lg font-body leading-relaxed max-w-[280px] mx-auto opacity-80">
            Follow the circle. Let your breath be your anchor.
          </p>
        </div>

        {/* Orb Container */}
        <div 
          className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96" 
          role="timer" 
          aria-live="polite"
          aria-label={running ? `Current phase: ${phase.label}, ${countdown} seconds remaining` : 'Breathing orb ready'}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/10"
            animate={running ? { scale: phase.scale * 1.2, opacity: 0.15 } : { scale: 1, opacity: 0.1 }}
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-6 rounded-full border border-[var(--color-primary)]/5"
            animate={running ? { scale: phase.scale * 1.1, opacity: 0.1 } : { scale: 1, opacity: 0.05 }}
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />
          
          {/* Core orb */}
          <motion.div
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full z-10"
            style={{
              background: 'radial-gradient(circle at 30% 30%, var(--color-primary) 0%, var(--color-accent) 100%)',
              filter: 'blur(0.5px)',
            }}
            animate={running
              ? { scale: phase.scale, opacity: phase.opacity, boxShadow: '0 0 80px rgba(77, 182, 172, 0.4)' }
              : { scale: 1, opacity: 0.5, boxShadow: '0 0 30px rgba(77, 182, 172, 0.15)' }
            }
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />

          {/* Phase text inside/on orb */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={running ? phase.label : 'idle'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <p className="text-white font-bold text-2xl sm:text-3xl drop-shadow-lg font-heading tracking-wide">
                  {running ? phase.label : 'Ready?'}
                </p>
                {running && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-5xl sm:text-6xl font-bold mt-4 tabular-nums drop-shadow-md"
                  >
                    {countdown}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 w-full px-8">
          {!running ? (
            <motion.button
              onClick={startCycle}
              aria-label="Start breathing session"
              className="w-full sm:w-auto px-16 py-6 rounded-[32px] font-bold text-lg bg-[var(--color-primary)] text-white shadow-2xl shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[72px] font-heading focus-visible:ring-4 focus-visible:ring-[var(--color-primary)]/30 focus-visible:outline-none"
            >
              Begin Session
            </motion.button>
          ) : (
            <motion.button
              onClick={() => { setRunning(false); clearTimeout(timerRef.current); clearInterval(countdownRef.current) }}
              aria-label="Pause breathing session"
              className="w-full sm:w-auto px-16 py-6 rounded-[32px] font-bold text-lg border-2 border-[var(--border-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-all min-h-[72px] font-heading focus-visible:ring-4 focus-visible:ring-[var(--color-primary)]/30 focus-visible:outline-none"
            >
              Pause Session
            </motion.button>
          )}

          <motion.button
            onClick={openVent}
            aria-label="Open vent tool"
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-[11px] font-bold uppercase tracking-[0.3em] transition-colors py-3 px-6 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:outline-none rounded-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Need to express thoughts? →
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  )
}
