/**
 * pages/VentPage.jsx — "Burn After Reading" Venting Space
 *
 * The user writes whatever is on their mind.
 * On clicking "Release" the text animates away and is cleared from state.
 *
 * PRIVACY GUARANTEE:
 * - text lives only in React useState
 * - No API calls, no logging, no localStorage
 * - When the component unmounts the text is garbage-collected
 */
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'

export default function VentPage() {
  const goHome         = useWellnessStore((s) => s.goHome)
  const openBreathe    = useWellnessStore((s) => s.openBreathe)
  const isReleasing    = useWellnessStore((s) => s.isReleasing)
  const showMsg        = useWellnessStore((s) => s.showReleaseMessage)
  const triggerRelease = useWellnessStore((s) => s.triggerRelease)

  // Text lives ONLY here — no persistence whatsoever
  const [text, setText] = useState('')
  const textareaRef     = useRef(null)

  const charCount = text.length
  const hasText   = charCount > 0

  const handleRelease = () => {
    if (!hasText) return
    triggerRelease()
    // Clear immediately so text cannot be recovered
    setText('')
  }

  return (
    <main
      id="vent-page"
      aria-label="Venting space"
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12"
    >
      {/* Back button */}
      <motion.button
        onClick={goHome}
        className="absolute top-20 left-6 md:left-12 text-[#7d7469] hover:text-[#f6c857] transition-colors text-sm flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        aria-label="Go back home"
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-2xl flex flex-col gap-6">

        {/* ── Heading ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#7d7469] mb-3">
            Burn after reading
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#f0ece6] mb-2">
            Let it out.
          </h1>
          <p className="text-[#7d7469] text-sm leading-relaxed">
            This space is entirely yours. Write whatever is on your mind — it will never leave this page.
          </p>
        </motion.div>

        {/* ── Textarea ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex flex-col gap-3"
        >
          {/* Gentle Intention Prompts */}
          <div className="flex flex-wrap gap-2 py-1">
            {[
              "Right now, the heavy thing I am carrying is...",
              "I forgive myself for...",
              "One small thing that brought me comfort today was...",
              "What I wish someone would say to me right now is..."
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => setText(prompt)}
                className="text-xs px-3 py-1.5 bg-[var(--bg-card)] hover:bg-white/5 border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-lg transition-colors duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="relative">
          {/* Dissolve overlay — shown during release animation */}
          <AnimatePresence>
            {isReleasing && (
              <motion.div
                className="absolute inset-0 z-10 rounded-[1rem] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(246,200,87,0.15) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <motion.textarea
            ref={textareaRef}
            id="vent-textarea"
            aria-label="Write what's on your mind"
            aria-multiline="true"
            className="textarea-calm px-6 py-5"
            style={{ minHeight: '280px' }}
            placeholder="Write whatever is on your mind… no one will see this."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isReleasing}
            animate={isReleasing
              ? { opacity: 0, filter: 'blur(10px)', scale: 1.02 }
              : { opacity: 1, filter: 'blur(0px)', scale: 1 }
            }
            transition={{ duration: 0.8 }}
          />

          {/* Character softcount — no limit, just awareness */}
          {hasText && (
            <p className="absolute bottom-3 right-4 text-xs text-[#4a4455]" aria-hidden="true">
              {charCount} character{charCount !== 1 ? 's' : ''}
            </p>
          )}
          </div>
        </motion.div>

        {/* ── Release Button ────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          <motion.button
            id="release-btn"
            onClick={handleRelease}
            disabled={!hasText || isReleasing}
            aria-label="Release your thoughts — this will clear everything you've written"
            className="
              w-full sm:w-auto px-10 py-4 rounded-xl
              font-semibold text-sm tracking-wide
              transition-all duration-300
              disabled:opacity-30 disabled:cursor-not-allowed
            "
            style={hasText ? {
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              color: 'var(--bg-base)',
              boxShadow: '0 8px 32px var(--color-primary-light)',
            } : {
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
            }}
            whileHover={hasText ? { scale: 1.02, boxShadow: '0 12px 40px var(--color-primary)' } : {}}
            whileTap={hasText ? { scale: 0.98 } : {}}
          >
            {isReleasing ? 'Releasing…' : '✦ Release'}
          </motion.button>

          <p className="text-xs text-[#4a4455] text-center max-w-xs leading-relaxed">
            Pressing "Release" permanently erases what you've written.
            Nothing is sent anywhere.
          </p>
        </motion.div>

        {/* ── Post-Release Calming Message ──────────────────────── */}
        <AnimatePresence>
          {showMsg && (
            <motion.div
              role="status"
              aria-live="polite"
              aria-label="Your thoughts have been released"
              className="
                glass-card px-6 py-5 text-center
                border border-[#9fcba9]/20
              "
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[var(--color-secondary)] text-base font-medium mb-1">
                It's okay. You've let it out. 🌿
              </p>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                That took courage. Take a breath — this moment belongs to you.
              </p>

              <div className="bg-black/20 rounded-lg p-4 mb-4 text-left border border-[var(--border-subtle)]">
                <p className="text-xs text-[var(--color-primary)] font-medium uppercase tracking-wider mb-2">Gentle Reflection</p>
                <p className="text-sm text-[var(--text-main)] italic">
                  "If a close friend felt exactly the way you do right now, what kind thing would you say to them?"
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={goHome}
                  className="mt-3 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] underline-offset-4 hover:underline transition-colors"
                >
                  Return to home
                </button>
                <button
                  onClick={openBreathe}
                  className="mt-3 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-light)] underline-offset-4 hover:underline transition-colors"
                  aria-label="Try a breathing exercise"
                >
                  Try a breathing exercise →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
