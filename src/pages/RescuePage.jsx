import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { Wind } from 'lucide-react'

export default function RescuePage() {
  const goHome = useWellnessStore((s) => s.goHome)
  const reduceMotion = useWellnessStore((s) => s.reduceMotion)

  const [taps, setTaps] = useState(0)

  return (
    <main
      aria-label="Instant Grounding and Breathing"
      className="fixed inset-0 z-50 bg-[var(--bg-base)] flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none"
      onClick={() => setTaps(t => t + 1)}
    >
      <button
        onClick={(e) => { e.stopPropagation(); goHome() }}
        className="absolute top-12 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm"
      >
        ← Leave quiet space
      </button>

      <div className="w-full max-w-md flex flex-col items-center gap-12">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-widest text-[var(--color-primary)] uppercase">
            Acute Crisis / Panic Interrupter
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-main)] leading-relaxed">
            Focus here. Match your breathing.
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-xs mx-auto">
            Tap anywhere to anchor yourself.
          </p>
        </div>

        {/* Breathing Orb with tap effect */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full"
            animate={reduceMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)]/30 border border-[var(--color-primary)]/40 shadow-[0_0_50px_var(--color-primary-light)]"
            animate={reduceMotion ? {} : { scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          >
            <Wind className="w-12 h-12 text-white/90" />
          </motion.div>
        </div>

        {/* Taps count for grounding */}
        <p className="text-xs text-[var(--text-muted)] mt-4">
          Taps registered: {taps}
        </p>
      </div>
    </main>
  )
}
