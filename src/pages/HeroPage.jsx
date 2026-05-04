/**
 * pages/HeroPage.jsx — "How are you feeling right now?"
 *
 * The first thing the user sees. Zero friction — emotion button click
 * transitions directly to personalised support. No login, no forms.
 */
import React from 'react'
import { motion } from 'framer-motion'
import EmotionButton from '../components/EmotionButton'
import useWellnessStore from '../context/useWellnessStore'
import { EMOTIONS } from '../utils/emotions'

export default function HeroPage() {
  const selectEmotion = useWellnessStore((s) => s.selectEmotion)
  const openVent      = useWellnessStore((s) => s.openVent)
  const openBreathe   = useWellnessStore((s) => s.openBreathe)
  const openStillness = useWellnessStore((s) => s.openStillness)
  const openJar       = useWellnessStore((s) => s.openJar)
  const lowEnergyMode = useWellnessStore((s) => s.lowEnergyMode)

  return (
    <main
      id="main-content"
      aria-label="Emotion selection"
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12"
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-10">

        {/* ── Heading ──────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Micro label */}
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#7d7469] mb-4">
            You're in a safe space
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
            <span className="text-[#f0ece6]">How are you</span>{' '}
            <span className="gradient-text">feeling</span>{' '}
            <span className="text-[#f0ece6]">right now?</span>
          </h1>

          <p className="text-[#7d7469] text-base leading-relaxed max-w-sm mx-auto">
            It's okay to feel this way. Choose what resonates most — no judgment, no pressure.
          </p>
        </motion.div>

        {/* ── Dynamic Content based on Energy Level ──────────────── */}
        {lowEnergyMode ? (
          <motion.div 
            className="w-full flex justify-center py-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <button
              onClick={openStillness}
              className="
                px-10 py-8 rounded-2xl w-full max-w-sm
                bg-[var(--bg-card)] border border-[var(--border-subtle)]
                text-[var(--text-main)] text-xl font-medium tracking-wide
                hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
                transition-all duration-300 shadow-xl
              "
            >
              Just sit in quiet comfort.
            </button>
          </motion.div>
        ) : (
          <div
            role="group"
            aria-label="Select how you are feeling"
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {EMOTIONS.map((emotion, i) => (
              <EmotionButton
                key={emotion.id}
                index={i}
                {...emotion}
                onClick={selectEmotion}
              />
            ))}
          </div>
        )}

        {/* ── Alternative entry points ─────────────────────────── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {/* Vent shortcut */}
          <button
            id="hero-vent-btn"
            onClick={openVent}
            className="
              flex-1 w-full sm:w-auto
              px-5 py-3 rounded-xl text-sm font-medium
              border border-[#2e2e3d] text-[#a89f94]
              hover:border-[#f6c857]/30 hover:text-[#f0ece6] hover:bg-[#1a1a22]
              transition-all duration-200 text-center
            "
            aria-label="Go directly to venting space"
          >
            ✍️ &nbsp;Just need to write it out
          </button>

          {/* Breathe shortcut */}
          <button
            id="hero-breathe-btn"
            onClick={openBreathe}
            className="
              flex-1 w-full sm:w-auto
              px-5 py-3 rounded-xl text-sm font-medium
              border border-[#2e2e3d] text-[#a89f94]
              hover:border-[var(--color-secondary)] hover:text-[var(--text-main)] hover:bg-white/5
              transition-all duration-200 text-center
            "
            aria-label="Go to breathing exercise"
          >
            🌬️ &nbsp;Guide me through breathing
          </button>

          {/* Jar shortcut */}
          {!lowEnergyMode && (
            <button
              id="hero-jar-btn"
              onClick={openJar}
              className="
                flex-1 w-full sm:w-auto
                px-5 py-3 rounded-xl text-sm font-medium
                border border-[#2e2e3d] text-[#a89f94]
                hover:border-[var(--color-primary)] hover:text-[var(--text-main)] hover:bg-white/5
                transition-all duration-200 text-center
              "
              aria-label="Open Kind Messages Jar"
            >
              🏺 &nbsp;Kind Messages
            </button>
          )}
        </motion.div>

        {/* ── Footer micro-copy ────────────────────────────────── */}
        <motion.p
          className="text-center text-xs text-[#4a4455] leading-relaxed max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Nothing you share here is stored, sent anywhere, or seen by anyone.
          This space exists only for you, right now.
        </motion.p>
      </div>
    </main>
  )
}
