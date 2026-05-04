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
  const openCanvas = useWellnessStore((s) => s.openCanvas)
  const openPmr = useWellnessStore((s) => s.openPmr)
  const openCbt = useWellnessStore((s) => s.openCbt)
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

          {emotion.tools.includes('canvas') && (
            <motion.button
              id="support-canvas-btn"
              onClick={openCanvas}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-primary)]/25 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              🎨 Mindful Canvas
            </motion.button>
          )}

          {emotion.tools.includes('pmr') && (
            <motion.button
              id="support-pmr-btn"
              onClick={openPmr}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-secondary)]/25 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              💪 Muscle Relaxation
            </motion.button>
          )}

          {emotion.tools.includes('cbt') && (
            <motion.button
              id="support-cbt-btn"
              onClick={openCbt}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-medium border border-[var(--color-primary)]/25 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
            >
              💡 Untangle Thoughts
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

        {/* Behavioral Activation (Micro-Momentum) Choices */}
        <motion.div
          className="w-full max-w-lg mt-2 bg-[var(--bg-card)]/40 p-5 rounded-2xl border border-[var(--border-subtle)] space-y-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold tracking-wider text-[var(--color-primary)] uppercase">
              Clinical Additions — Micro-Momentum
            </span>
            <span className="text-xs text-[var(--text-muted)]">Behavioral Activation</span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Taking a very small physical action right now can activate your dopamine pathways and break cognitive inertia.
          </p>

          <div className="space-y-2">
            {[
              "Take a single sip of cool water",
              "Put your feet flat on the floor and stretch up",
              "Look out the window for 15 seconds"
            ].map((action, i) => (
              <label
                key={i}
                className="flex items-center gap-3 p-3 bg-[var(--bg-card)]/30 border border-[var(--border-subtle)]/50 rounded-xl cursor-pointer hover:border-[var(--color-primary)] transition-all select-none"
              >
                <input
                  type="checkbox"
                  className="rounded border-[var(--border-subtle)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] h-4 w-4 bg-[var(--bg-card)] cursor-pointer"
                />
                <span className="text-xs text-[var(--text-main)]">{action}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* General medical disclaimer */}
        <div className="flex gap-2 items-start bg-black/10 p-3.5 rounded-xl border border-[var(--border-subtle)]/60 max-w-lg mx-auto text-left select-none mt-2">
          <p className="text-[10px] leading-normal text-[var(--text-muted)]">
            <strong>Disclaimer:</strong> This mental wellness space is for emotional regulation support only. It is not a medical advisory or clinical intervention. Please seek immediate consult from a qualified doctor or healthcare professional soon if you are experiencing severe or ongoing emotional challenges.
          </p>
        </div>
      </div>
    </main>
  )
}
