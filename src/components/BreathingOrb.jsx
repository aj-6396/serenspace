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
      aria-label="Breathing exercise"
      animate={{ backgroundColor: running ? 'var(--color-primary-soft)' : 'transparent' }}
      className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 text-center transition-colors duration-1000 relative overflow-hidden"
    >
      {/* Back */}
      <motion.button
        onClick={goHome}
        className="absolute top-10 left-6 sm:left-10 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 p-2 h-11"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <ChevronLeft size={18} /> Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-10 sm:gap-16 w-full max-w-md"
      >
        <div className="space-y-4 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] flex items-center justify-center gap-3 tracking-tight font-heading">
            Breathe
            <InfoTooltip text="Slow breathing signals your nervous system that it’s safe." />
          </h1>
          <p className="text-[var(--text-muted)] text-sm sm:text-base font-body leading-relaxed">
            Follow the circle. Let your breath be your anchor right now.
          </p>
        </div>

        {/* Orb Container */}
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80" role="img" aria-label={running ? phase.label : 'Breathing orb, press start to begin'}>
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/10"
            animate={running ? { scale: phase.scale * 1.15, opacity: 0.2 } : { scale: 1, opacity: 0.1 }}
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border border-[var(--color-primary)]/5"
            animate={running ? { scale: phase.scale * 1.05, opacity: 0.1 } : { scale: 1, opacity: 0.05 }}
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />
          
          {/* Core orb */}
          <motion.div
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full z-10"
            style={{
              background: 'radial-gradient(circle at 30% 30%, var(--color-primary) 0%, var(--color-accent) 100%)',
              filter: 'blur(0.5px)',
            }}
            animate={running
              ? { scale: phase.scale, opacity: phase.opacity, boxShadow: '0 0 60px rgba(77, 182, 172, 0.4)' }
              : { scale: 1, opacity: 0.4, boxShadow: '0 0 20px rgba(77, 182, 172, 0.1)' }
            }
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />

          {/* Phase text inside/on orb */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={running ? phase.label : 'idle'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg font-heading">
                  {running ? phase.label : 'Ready?'}
                </p>
                {running && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-4xl sm:text-5xl font-bold mt-2 tabular-nums drop-shadow-md"
                  >
                    {countdown}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 w-full px-6 sm:px-0">
          {!running ? (
            <motion.button
              onClick={startCycle}
              className="w-full sm:w-auto px-12 py-5 rounded-[28px] font-bold text-base bg-[var(--color-primary)] text-white shadow-2xl shadow-teal-500/30 hover:opacity-90 active:scale-95 transition-all min-h-[60px] font-heading"
              whileHover={{ scale: 1.02 }}
            >
              Begin Session
            </motion.button>
          ) : (
            <motion.button
              onClick={() => { setRunning(false); clearTimeout(timerRef.current); clearInterval(countdownRef.current) }}
              className="w-full sm:w-auto px-12 py-5 rounded-[28px] font-bold text-base border-2 border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all min-h-[60px] font-heading"
            >
              Pause session
            </motion.button>
          )}

          <motion.button
            onClick={openVent}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] font-bold uppercase tracking-widest transition-colors py-2 px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Need to express thoughts? →
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  )
}
