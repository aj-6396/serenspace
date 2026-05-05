import React from 'react'
import { motion } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'
import { AlertCircle, ArrowLeft, Edit3, Wind, Eye, Activity, Sparkles, Brain, Archive, Volume2, BookOpen } from 'lucide-react'

export default function SupportPage() {
  const goHome      = useWellnessStore((s) => s.goHome)
  const openVent    = useWellnessStore((s) => s.openVent)
  const openBreathe = useWellnessStore((s) => s.openBreathe)
  const openGrounding = useWellnessStore((s) => s.openGrounding)
  const openStillness = useWellnessStore((s) => s.openStillness)
  const openCanvas = useWellnessStore((s) => s.openCanvas)
  const openPmr = useWellnessStore((s) => s.openPmr)
  const openCbt = useWellnessStore((s) => s.openCbt)
  const openJar = useWellnessStore((s) => s.openJar)
  const openSafetyPlan = useWellnessStore((s) => s.openSafetyPlan)
  const openMoodHistory = useWellnessStore((s) => s.openMoodHistory)
  const openLibrary = useWellnessStore((s) => s.openLibrary)
  const emotionId   = useWellnessStore((s) => s.selectedEmotion)

  const readAffirmation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(emotion.affirmation)
      utterance.rate = 0.9
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const emotion = getEmotion(emotionId)
  if (!emotion) { goHome(); return null }

  const isAmber = emotion.color === 'amber'
  const accentColor = isAmber ? 'var(--color-primary)' : 'var(--color-secondary)'

  // Determine which pathways apply to this emotion's tools
  const hasVenting = emotion.tools.includes('vent')
  const hasGrounding = emotion.tools.some(t => ['breathe', 'grounding', 'stillness'].includes(t))
  const hasCanvas = emotion.tools.includes('canvas')
  const hasClinical = emotion.tools.some(t => ['pmr', 'cbt'].includes(t))
  const hasJar = emotion.tools.includes('jar')

  return (
    <main
      id="support-page"
      aria-label={`Support for feeling ${emotionId}`}
      className="flex flex-col items-center min-h-screen px-6 pt-24 pb-12 overflow-x-hidden"
    >
      {/* Back Button */}
      <motion.button
        onClick={goHome}
        className="absolute top-24 left-6 md:left-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-1.5 z-30 select-none cursor-pointer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        aria-label="Go back and choose a different feeling"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      <div className="w-full max-w-4xl flex flex-col items-center gap-12 text-center">
        {/* ── Heading ── */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <img 
            src="/assets/logo.png" 
            alt="SerenSpace Logo" 
            className="w-12 h-12 object-contain mb-8 opacity-40" 
          />
          <div className="text-6xl mb-4" aria-hidden="true">
            {emotion.emoji}
          </div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2 select-none" style={{ color: accentColor }}>
            {emotion.label}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-main)] max-w-lg leading-relaxed mb-3">
            {emotion.affirmation}
          </h1>
          <p className="text-[var(--text-muted)] text-sm md:text-base max-w-sm mx-auto select-none mb-4">
            {emotion.suggestion}
          </p>

          <button 
            onClick={readAffirmation}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/10 transition-all"
          >
            <Volume2 className="w-3.5 h-3.5" /> Listen to Affirmation
          </button>
        </motion.div>

        {/* ── Pathways Dashboard Grid (Multi-Path therapeutic choices) ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 select-none cursor-default">
          {/* Pathway 1: Mindful Expression */}
          {hasVenting && (
            <motion.div
              className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-5 relative overflow-hidden transition-all hover:border-[var(--color-primary)] hover:shadow-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col gap-3 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl border border-[var(--color-primary)]/15">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">Mindful Expression</h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Release racing thoughts by typing freely. It's completely private and exists only for this moment.
                </p>
              </div>
              <button
                onClick={openVent}
                className="w-full py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-xl text-sm font-semibold transition-all duration-200 text-center cursor-pointer select-none"
              >
                ✍️ Go to Venting Space
              </button>
            </motion.div>
          )}

          {/* Pathway 2: Physical/Somatic Grounding */}
          {hasGrounding && (
            <motion.div
              className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-5 relative overflow-hidden transition-all hover:border-[var(--color-secondary)] hover:shadow-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            >
              <div className="flex flex-col gap-3 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-xl border border-[var(--color-secondary)]/15">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">Somatic Grounding</h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Anchor your physiological responses using breathing cycles or focus techniques.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {emotion.tools.includes('breathe') && (
                  <button
                    onClick={openBreathe}
                    className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer select-none"
                  >
                    🌬️ Breathe
                  </button>
                )}
                {emotion.tools.includes('grounding') && (
                  <button
                    onClick={openGrounding}
                    className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer select-none"
                  >
                    ✋ 5-4-3-2-1
                  </button>
                )}
                {emotion.tools.includes('stillness') && (
                  <button
                    onClick={openStillness}
                    className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer select-none"
                  >
                    ⏳ Stillness
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Pathway 3: Sensory Canvas */}
          {hasCanvas && (
            <motion.div
              className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-5 relative overflow-hidden transition-all hover:border-[var(--color-primary)] hover:shadow-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col gap-3 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl border border-[var(--color-primary)]/15">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">Sensory Distraction</h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Trace soft paths across a low-contrast mindful fidgeting canvas to anchor your physical focus.
                </p>
              </div>
              <button
                onClick={openCanvas}
                className="w-full py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-xl text-sm font-semibold transition-all duration-200 text-center cursor-pointer select-none"
              >
                🎨 Open Mindful Canvas
              </button>
            </motion.div>
          )}

          {/* Pathway 4: Clinical Therapy */}
          {hasClinical && (
            <motion.div
              className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-5 relative overflow-hidden transition-all hover:border-[var(--color-secondary)] hover:shadow-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            >
              <div className="flex flex-col gap-3 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-xl border border-[var(--color-secondary)]/15">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">Clinical Therapy</h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Examine your core patterns directly. Use CBT thought challenging or DBT somatic relaxation exercises.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {emotion.tools.includes('pmr') && (
                  <button
                    onClick={openPmr}
                    className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer select-none"
                  >
                    💪 Muscle Relaxation
                  </button>
                )}
                {emotion.tools.includes('cbt') && (
                  <button
                    onClick={openCbt}
                    className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer select-none"
                  >
                    💡 Untangle Thoughts
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Pathway 5: Kind Messages Jar */}
          {hasJar && (
            <motion.div
              className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-5 relative overflow-hidden transition-all hover:border-[var(--color-primary)] hover:shadow-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col gap-3 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl border border-[var(--color-primary)]/15">
                    <Archive className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">Supportive Reminders</h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Review kind messages you wrote to your future self, or add a supportive reminder for later.
                </p>
              </div>
              <button
                onClick={openJar}
                className="w-full py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-xl text-sm font-semibold transition-all duration-200 text-center cursor-pointer select-none"
              >
                🏺 Open Kind Messages
              </button>
            </motion.div>
          )}
        </div>

        {/* ── Clinical Science & Long-term Support ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Science Information */}
          <motion.div
            className="glass-card p-6 border border-[var(--border-subtle)] text-left space-y-3 bg-[var(--bg-card)]/20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
                Clinical Science — The "Why"
              </span>
            </div>
            <p className="text-xs text-[var(--text-main)] leading-relaxed italic">
              "{emotion.science}"
            </p>
          </motion.div>

          {/* Long-term Clinical Tools */}
          <motion.div
            className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-4 bg-[var(--bg-card)]/20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          >
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-[var(--color-secondary)] uppercase block">
                Long-term Companion Tools
              </span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                Build a safety plan or review your emotional trends for your next doctor's visit.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={openSafetyPlan}
                className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all"
              >
                Safety Plan
              </button>
              <button
                onClick={openMoodHistory}
                className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all"
              >
                Mood Reflection
              </button>
            </div>
          </motion.div>

          {/* Wellness Library Pathway */}
          <motion.div
            className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-4 bg-[var(--bg-card)]/20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase block">
                  Wellness Library
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                Learn the science behind your tools. Understand how your brain and body heal.
              </p>
            </div>
            <button
              onClick={openLibrary}
              className="w-full py-2.5 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all"
            >
              Open Library
            </button>
          </motion.div>
        </div>

        {/* ── Crisis & Behavioral Activation Row ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Behavioral Activation (Micro-Momentum) */}
          <motion.div
            className="glass-card p-6 border border-[var(--border-subtle)] text-left space-y-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between items-center select-none">
              <span className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
                Clinical Additions — Micro-Momentum
              </span>
              <span className="text-xs text-[var(--text-muted)]">Behavioral Activation</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Taking a very small physical action right now can activate dopamine pathways and break cognitive inertia.
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

          {/* Emergency Crisis Contact */}
          <motion.div
            className="glass-card p-6 border border-[var(--border-subtle)] text-left flex flex-col justify-between gap-4 select-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          >
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider text-red-400 uppercase block">
                Emergency & Immediate Support
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                If you are in immediate distress or having ongoing self-harm thoughts, please reach out directly to your local helpline soon.
              </p>
            </div>
            <a
              href="https://www.findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-red-500/10 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 text-red-400 rounded-xl text-center font-bold text-xs transition-all duration-200 select-none cursor-pointer block"
              aria-label="Find a helpline in your country"
            >
              Contact a Crisis Helpline
            </a>
          </motion.div>
        </div>

        {/* General Medical Disclaimer */}
        <div className="flex gap-2 items-start bg-black/10 p-4 rounded-xl border border-[var(--border-subtle)]/60 max-w-2xl mx-auto text-left select-none mt-2">
          <AlertCircle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
          <p className="text-[11px] leading-normal text-[var(--text-muted)]">
            <strong>Disclaimer:</strong> This mental wellness space is for emotional regulation support only. It is not a clinical medical advisory. Please seek immediate consult from a qualified doctor or healthcare professional soon if you are experiencing severe or ongoing emotional challenges.
          </p>
        </div>
      </div>
    </main>
  )
}
