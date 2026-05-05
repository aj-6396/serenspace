/**
 * BreathingOrb.jsx
 *
 * A guided breathing exercise component using a pulsing visual orb.
 * Phases: Inhale (4s) → Hold (4s) → Exhale (6s) → Rest (2s)
 * Entirely self-contained; no APIs, no storage.
 */
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import InfoTooltip from './InfoTooltip'

const PHASES = [
  { label: 'Inhale...',  duration: 4000, scale: 1.35, opacity: 0.9 },
  { label: 'Hold...',    duration: 4000, scale: 1.35, opacity: 0.85 },
  { label: 'Exhale...',  duration: 6000, scale: 1.0,  opacity: 0.6 },
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

  // Advance phase whenever phaseIndex changes (while running)
  useEffect(() => {
    if (!running) return

    clearTimeout(timerRef.current)
    clearInterval(countdownRef.current)

    const p = PHASES[phaseIndex]
    setCountdown(p.duration / 1000)

    // Countdown tick every second
    let remaining = p.duration / 1000
    countdownRef.current = setInterval(() => {
      remaining -= 1
      setCountdown(remaining)
    }, 1000)

    // Move to next phase
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
    <section
      aria-label="Breathing exercise"
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      {/* Back */}
      <motion.button
        onClick={goHome}
        className="absolute top-8 left-8 text-[#7d7469] hover:text-[#f6c857] transition-colors text-sm flex items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        aria-label="Go back home"
      >
        ← Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-10"
      >
        <div>
          <h1 className="text-3xl font-semibold gradient-text mb-2 flex items-center justify-center gap-2">
            Breathe with me
            <InfoTooltip text="Slow breathing signals your nervous system that it’s safe." />
          </h1>
          <p className="text-[#7d7469] text-sm">
            Let your breath be your anchor right now.
          </p>
        </div>

        {/* Orb */}
        <div className="relative flex items-center justify-center w-64 h-64" role="img" aria-label={running ? phase.label : 'Breathing orb, press start to begin'}>
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#f6c857]/20"
            animate={running ? { scale: phase.scale * 1.15, opacity: 0.3 } : { scale: 1, opacity: 0.15 }}
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />
          {/* Mid ring */}
          <motion.div
            className="absolute inset-4 rounded-full border border-[#f6c857]/15"
            animate={running ? { scale: phase.scale * 1.08, opacity: 0.4 } : { scale: 1, opacity: 0.2 }}
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut', delay: 0.05 }}
          />
          {/* Core orb */}
          <motion.div
            className="w-36 h-36 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(246,200,87,0.5) 0%, rgba(125,184,138,0.3) 50%, transparent 80%)',
              boxShadow: '0 0 60px rgba(246,200,87,0.2), 0 0 100px rgba(125,184,138,0.1)',
            }}
            animate={running
              ? { scale: phase.scale, opacity: phase.opacity }
              : { scale: 1, opacity: 0.4 }
            }
            transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
          />

          {/* Phase text inside orb */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={running ? phase.label : 'idle'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-[#f0ece6] font-medium text-sm">
                  {running ? phase.label : 'Ready?'}
                </p>
                {running && (
                  <p className="text-[#f6c857] text-2xl font-semibold mt-1">
                    {countdown}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        {!running ? (
          <motion.button
            id="breathing-start-btn"
            onClick={startCycle}
            className="
              px-8 py-3 rounded-full font-medium text-sm
              bg-[#f6c857] text-[#0d0d0f]
              hover:bg-[#f9d87a] active:scale-95
              transition-all duration-200
              shadow-lg shadow-amber-400/20
            "
            whileHover={{ scale: 1.04 }}
            aria-label="Start breathing exercise"
          >
            Begin
          </motion.button>
        ) : (
          <motion.button
            id="breathing-stop-btn"
            onClick={() => { setRunning(false); clearTimeout(timerRef.current); clearInterval(countdownRef.current) }}
            className="
              px-8 py-3 rounded-full font-medium text-sm border
              border-[#f6c857]/30 text-[#f6c857]
              hover:bg-[#f6c857]/10 active:scale-95
              transition-all duration-200
            "
            whileHover={{ scale: 1.04 }}
            aria-label="Stop breathing exercise"
          >
            Pause
          </motion.button>
        )}

        {/* Onward nudge */}
        <motion.button
          onClick={openVent}
          className="text-[#7d7469] hover:text-[#9fcba9] text-sm transition-colors underline-offset-4 hover:underline"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          aria-label="Switch to venting space"
        >
          Need to write something out instead? →
        </motion.button>
      </motion.div>
    </section>
  )
}
