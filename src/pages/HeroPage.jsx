/**
 * pages/HeroPage.jsx — "How are you feeling right now?"
 */
import React from 'react'
import { motion } from 'framer-motion'
import EmotionButton from '../components/EmotionButton'
import useWellnessStore from '../context/useWellnessStore'
import { EMOTIONS } from '../utils/emotions'
import { Sparkles, BookOpen } from 'lucide-react'

const INTENTIONS = ["Patience", "Presence", "Courage", "Kindness", "Stillness", "Balance"]

export default function HeroPage() {
  const selectEmotion = useWellnessStore((s) => s.selectEmotion)
  const openVent      = useWellnessStore((s) => s.openVent)
  const openBreathe   = useWellnessStore((s) => s.openBreathe)
  const openStillness = useWellnessStore((s) => s.openStillness)
  const openJar       = useWellnessStore((s) => s.openJar)
  const openSafetyPlan = useWellnessStore((s) => s.openSafetyPlan)
  const openMoodHistory = useWellnessStore((s) => s.openMoodHistory)
  const openLibrary   = useWellnessStore((s) => s.openLibrary)
  
  const lowEnergyMode = useWellnessStore((s) => s.lowEnergyMode)
  const dailyIntention = useWellnessStore((s) => s.dailyIntention)
  const setIntention = useWellnessStore((s) => s.setIntention)

  const today = new Date().toISOString().split('T')[0]
  const hasIntention = dailyIntention?.date === today

  return (
    <main
      id="main-content"
      aria-label="Emotion selection"
      className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12"
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-8">

        {/* ── Heading ──────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4">
            You're in a safe space
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4 text-[var(--text-main)]">
            How are you <span className="gradient-text">feeling</span> right now?
          </h1>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-sm mx-auto">
            It's okay to feel this way. Choose what resonates most — no judgment, no pressure.
          </p>
        </motion.div>

        {/* ── Daily Intention Ritual (New) ──────────────────────── */}
        {!lowEnergyMode && (
          <motion.div 
            className="w-full py-2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            {hasIntention ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  Today's Intention: {dailyIntention.word}
                </span>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Set a gentle intention for today</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {INTENTIONS.map(word => (
                    <button
                      key={word}
                      onClick={() => setIntention(word)}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[10px] font-semibold text-[var(--text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all active:scale-95"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* ── Dynamic Content based on Energy Level ──────────────── */}
        {lowEnergyMode ? (
          <motion.div 
            className="w-full flex justify-center py-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <button
              onClick={openStillness}
              className="px-10 py-8 rounded-2xl w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] text-xl font-medium tracking-wide hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 shadow-xl"
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
          <button
            onClick={openVent}
            className="flex-1 w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--text-main)] hover:bg-white/5 transition-all duration-200 text-center"
          >
            ✍️ &nbsp;Write it out
          </button>

          <button
            onClick={openBreathe}
            className="flex-1 w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-secondary)] hover:text-[var(--text-main)] hover:bg-white/5 transition-all duration-200 text-center"
          >
            🌬️ &nbsp;Breathe
          </button>

          {!lowEnergyMode && (
            <button
              onClick={openJar}
              className="flex-1 w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--text-main)] hover:bg-white/5 transition-all duration-200 text-center"
            >
              🏺 &nbsp;Kind Messages
            </button>
          )}
        </motion.div>

        {/* ── Clinical Access ─────────────────────────── */}
        {!lowEnergyMode && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-4 border-t border-[var(--border-subtle)]/30 w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          >
            <button 
              onClick={openSafetyPlan}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-all"
            >
              My Safety Plan
            </button>
            <div className="w-1 h-1 rounded-full bg-[var(--border-subtle)] hidden sm:block" />
            <button 
              onClick={openMoodHistory}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--color-secondary)] transition-all"
            >
              Mood Reflection
            </button>
            <div className="w-1 h-1 rounded-full bg-[var(--border-subtle)] hidden sm:block" />
            <button 
              onClick={openLibrary}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-all flex items-center gap-2"
            >
              <BookOpen className="w-3 h-3" /> Wellness Library
            </button>
          </motion.div>
        )}

        {/* ── Footer ────────────────────────────────── */}
        <motion.p
          className="text-center text-[10px] text-[var(--text-muted)] leading-relaxed max-w-xs mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Everything you do here is private and stays on your device.
          No accounts. No tracking. Just you.
        </motion.p>
      </div>
    </main>
  )
}
