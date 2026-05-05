import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, PenTool, Activity, ShieldCheck, Info, Zap, Sparkles } from 'lucide-react'

import MoodSelector from '../components/MoodSelector'
import DailyRitualCard from '../components/DailyRitualCard'
import ThoughtCheckCard from '../components/ThoughtCheckCard'
import BodyScanCard from '../components/BodyScanCard'
import ValuesPrompter from '../components/ValuesPrompter'
import InfoTooltip from '../components/InfoTooltip'

import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'

export default function HeroPage() {
  const [selectedMoodId, setSelectedMoodId] = useState(null)

  const selectEmotion = useWellnessStore((s) => s.selectEmotion)
  const openBreathe = useWellnessStore((s) => s.openBreathe)
  const openJournal = useWellnessStore((s) => s.openJournal)
  const openGrounding = useWellnessStore((s) => s.openGrounding)
  const openProgress = useWellnessStore((s) => s.openProgress)
  const streak = useWellnessStore((s) => s.streak)

  const handleMoodSelect = (id) => {
    setSelectedMoodId(id)
    selectEmotion(id)
  }

  const selectedMood = getEmotion(selectedMoodId)

  return (
    <main className="flex flex-col items-center min-h-screen px-4 sm:px-8 pt-20 sm:pt-32 pb-32 sm:pb-40 max-w-6xl mx-auto space-y-20 sm:space-y-32">
      {/* ── Brand Header ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <img
          src="/assets/logo.png"
          alt="SerenSpace Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-8 animate-float"
        />
      </motion.div>

      {/* ── Hero Heading ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-6 sm:space-y-8"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-block"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-heading text-[var(--text-main)] tracking-tight leading-[1.1]">
            How are you <br />
            <span className="gradient-text">feeling today?</span>
          </h1>
          <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 opacity-20">
            <Sparkles size={40} className="text-[var(--color-primary)]" />
          </div>
        </motion.div>

        <p className="text-[var(--text-muted)] text-base sm:text-lg md:text-xl max-w-xl mx-auto font-body leading-relaxed px-6 opacity-80">
          A private, non-judgmental space to navigate your emotions and find your inner balance.
        </p>
      </motion.div>

      {/* ── Mood Selector ───────────────────────────────────── */}
      <section className="w-full">
        <MoodSelector onSelect={handleMoodSelect} selectedId={selectedMoodId} />
      </section>

      {/* ── Daily Ritual Section ──────────────────────────── */}
      <section className="w-full max-w-4xl px-4 mb-24 sm:mb-32">
        <DailyRitualCard />
      </section>

      {/* ── Dynamic Mood-Based Modules ──────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedMoodId && (
          <motion.div
            key={selectedMoodId}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl space-y-12"
          >
            {/* Cognitive Reframing / Tools */}
            {(selectedMoodId === 'sad' || selectedMoodId === 'anxious') && (
              <div className="premium-shadow rounded-[40px]">
                <ThoughtCheckCard
                  mood={selectedMoodId}
                  onComplete={() => console.log('Thought check complete')}
                />
              </div>
            )}

            {/* Sugestive Pathways Card */}
            <div className="glass-card p-8 sm:p-16 space-y-12 sm:space-y-16 bg-white/40">
              <div className="space-y-6 sm:space-y-8 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/50 text-[var(--color-primary)] border border-white/50">
                  <Sparkles size={12} /> A thought for you
                </div>
                <p className="text-2xl sm:text-3xl font-medium text-[var(--text-main)] leading-tight italic font-body tracking-tight">
                  "{selectedMood?.affirmation}"
                </p>
              </div>

              <div className="space-y-8 sm:space-y-12">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] font-heading">Recommended Pathways</h3>
                  <div className="hidden sm:block"><InfoTooltip text="Engaging different sensory and cognitive pathways helps regulate emotions." /></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {[
                    { id: 'breathe', label: 'Breathing', desc: 'Calm your nervous system', icon: <Wind size={24} />, color: 'teal', action: openBreathe },
                    { id: 'journal', label: 'Reflection', desc: 'Express your inner world', icon: <PenTool size={24} />, color: 'purple', action: openJournal },
                    { id: 'grounding', label: 'Grounding', desc: 'Return to the present', icon: <Activity size={24} />, color: 'orange', action: openGrounding }
                  ].filter(t => selectedMood?.tools.includes(t.id)).map((tool, i) => (
                    <motion.button
                      key={tool.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={tool.action}
                      className="w-full p-6 sm:p-8 rounded-[32px] bg-white/60 border border-white/80 hover:border-[var(--color-primary)] hover:bg-white shadow-sm transition-all flex items-center gap-6 group text-left min-h-[80px]"
                    >
                      <div className={`p-4 sm:p-5 rounded-2xl bg-${tool.color}-50 text-${tool.color}-500 group-hover:scale-110 transition-transform shrink-0 shadow-sm`}>
                        {tool.icon}
                      </div>
                      <div>
                        <span className="font-heading font-bold text-sm sm:text-base block text-[var(--text-main)]">{tool.label}</span>
                        <p className="text-xs text-[var(--text-muted)] font-body mt-1 opacity-80">{tool.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3-Minute Reset ──────────────────────────────────── */}
      <motion.section
        className="w-full flex flex-col items-center gap-10"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--color-primary)]/40 to-transparent" />
        <div className="flex flex-col items-center gap-8 w-full max-w-lg">
          <button
            onClick={openBreathe}
            className="w-full flex items-center justify-center gap-4 px-12 py-6 rounded-[32px] bg-[var(--grad-calm)] text-white font-heading font-bold shadow-2xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[64px] text-lg glow-teal"
          >
            <Zap size={24} /> 3-Minute Quick Reset
          </button>
          <div className="flex items-center gap-3">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold font-heading">Immediate mental recharge</p>
            <InfoTooltip text="Controlled breathing is the fastest way to signal safety to your brain." />
          </div>
        </div>
      </motion.section>

      {/* ── About & Privacy ─────────────────────────────────── */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-24 border-t border-[var(--border-subtle)] pt-20 sm:pt-32">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-4 text-[var(--text-main)] font-heading font-bold uppercase tracking-[0.2em] text-xs">
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
              <Info size={16} className="text-[var(--color-primary)]" />
            </div>
            Why SerenSpace
          </div>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-body opacity-80">
            We believe mental wellness shouldn't be complicated or clinical. SerenSpace is a gentle, privacy-first sanctuary designed to help you process emotions through evidence-based rituals.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-4 text-[var(--text-main)] font-heading font-bold uppercase tracking-[0.2em] text-xs">
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
              <ShieldCheck size={16} className="text-[var(--color-secondary)]" />
            </div>
            Your Privacy
          </div>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-body opacity-80">
            Your data never leaves your device. No cloud, no tracking, no accounts. What happens in SerenSpace stays in your safe space.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="w-full text-center pb-20">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent mb-12" />
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.4em] font-bold opacity-30">
          SerenSpace © 2026 • Designed by AJ ♡
        </p>
      </footer>
    </main>
  )
}
