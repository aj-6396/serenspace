/**
 * pages/SupportPage.jsx
 *
 * Shown after the user selects an emotion.
 * Displays a personalised affirmation + two tool entry points.
 * Transitions using Framer Motion — no page reload.
 */
import React from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'

export default function SupportPage() {
  const goHome      = useWellnessStore((s) => s.goHome)
  const openVent    = useWellnessStore((s) => s.openVent)
  const openBreathe = useWellnessStore((s) => s.openBreathe)
  const openGrounding = useWellnessStore((s) => s.openGrounding)
  const openStillness = useWellnessStore((s) => s.openStillness)
  const emotionId   = useWellnessStore((s) => s.selectedEmotion)

  const emotion = getEmotion(emotionId)
  if (!emotion) { goHome(); return null }

  const isAmber = emotion.color === 'amber'
  const accentColor = isAmber ? 'var(--color-primary)' : 'var(--color-secondary)'
  const accentBg    = isAmber
    ? 'radial-gradient(ellipse at top, var(--color-primary) 0%, transparent 70%)'
    : 'radial-gradient(ellipse at top, var(--color-secondary) 0%, transparent 70%)'

  return (
    <main
      id="support-page"
      aria-label={`Support for feeling ${emotionId}`}
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12"
    >
      {/* Back */}
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[#7d7469] hover:text-[#f6c857] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        aria-label="Go back and choose a different feeling"
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-xl flex flex-col items-center gap-8 text-center">

        {/* Emoji */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          aria-hidden="true"
          className="text-6xl"
        >
          {emotion.emoji}
        </motion.div>

        {/* Affirmation card */}
        <motion.div
          className="glass-card w-full px-8 py-8 text-center relative overflow-hidden"
          style={{ borderColor: `${accentColor}20` }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Coloured ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: accentBg }} aria-hidden="true" />

          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: accentColor }}>
            {emotion.label}
          </p>

          <h2 className="text-xl md:text-2xl font-semibold text-[#f0ece6] leading-relaxed mb-3">
            {emotion.affirmation}
          </h2>

          <p className="text-[#7d7469] text-sm">
            {emotion.suggestion}
          </p>
        </motion.div>

        {/* Tool buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {emotion.tools.includes('vent') && (
            <motion.button
              id="support-vent-btn"
              onClick={openVent}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-primary)]/25 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              ✍️ Write it out
            </motion.button>
          )}

          {emotion.tools.includes('breathe') && (
            <motion.button
              id="support-breathe-btn"
              onClick={openBreathe}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-secondary)]/25 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              🌬️ Breathe with me
            </motion.button>
          )}

          {emotion.tools.includes('grounding') && (
            <motion.button
              id="support-grounding-btn"
              onClick={openGrounding}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-secondary)]/25 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              ✋ 5-4-3-2-1
            </motion.button>
          )}

          {emotion.tools.includes('stillness') && (
            <motion.button
              id="support-stillness-btn"
              onClick={openStillness}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-primary)]/25 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              ⏳ A minute of peace
            </motion.button>
          )}
        </motion.div>

        {/* Crisis micro-copy */}
        <motion.p
          className="text-xs text-[#4a4455] leading-relaxed max-w-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        >
          If you're in crisis or need urgent help, please reach out to a{' '}
          <a
            href="https://www.findahelpline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#7d7469] hover:text-[#f6c857] transition-colors"
            aria-label="Find a helpline (opens in new tab)"
          >
            crisis helpline
          </a>{' '}
          in your country.
        </motion.p>
      </div>
    </main>
  )
}
