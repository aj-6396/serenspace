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
    <main className="flex flex-col items-center min-h-screen px-6 pt-24 pb-32 max-w-4xl mx-auto">
      {/* ── Daily Ritual ─────────────────────────────────── */}
      <div className="w-full max-w-lg mb-12 relative">
        <DailyRitualCard />
        <div className="absolute -top-1 -right-1">
          <InfoTooltip text="Daily rituals build mental resilience through consistency." />
        </div>
      </div>

      {/* ── Hero Heading ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-main)] tracking-tight">
            How are you <span className="gradient-text">feeling</span>?
          </h1>
          <InfoTooltip text="Labeling your emotions reduces their intensity in the brain." />
        </div>
        <p className="text-[var(--text-muted)] text-lg max-w-lg mx-auto">
          Choose a mood to get personalized wellness suggestions.
        </p>
      </motion.div>

      {/* ── Mood Selector ───────────────────────────────────── */}
      <div className="w-full mb-16">
        <MoodSelector onSelect={handleMoodSelect} selectedId={selectedMoodId} />
      </div>

      {/* ── Dynamic Mood-Based Modules ──────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedMoodId && (
          <motion.div
            key={selectedMoodId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg space-y-8"
          >
            {/* Cognitive Reframing for Sad/Anxious */}
            {(selectedMoodId === 'sad' || selectedMoodId === 'anxious') && (
              <ThoughtCheckCard 
                mood={selectedMoodId} 
                onComplete={() => console.log('Thought check complete')} 
              />
            )}

            {/* Body Scan for Anxious */}
            {selectedMoodId === 'anxious' && (
              <BodyScanCard mood={selectedMoodId} />
            )}

            {/* Values Prompter for Happy/Neutral */}
            {(selectedMoodId === 'happy' || selectedMoodId === 'neutral') && (
              <ValuesPrompter onComplete={() => console.log('Values set')} />
            )}

            {/* Standard Suggestions Card */}
            <div className="glass-card p-8 space-y-10 bg-white/40">
              <div className="space-y-4 text-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">A thought for you</h3>
                <p className="text-xl font-medium text-[var(--text-main)] leading-relaxed italic">
                  "{selectedMood?.affirmation}"
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Suggested pathways</h3>
                  <InfoTooltip text="Different tools engage different parts of your brain for regulation." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMood?.tools.includes('breathe') && (
                    <button onClick={openBreathe} className="p-5 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex items-center gap-4 group text-left">
                      <div className="p-3 rounded-2xl bg-blue-100 text-blue-500 group-hover:scale-110 transition-transform">
                        <Wind size={20} />
                      </div>
                      <div>
                        <span className="font-bold text-xs block">Breathing</span>
                        <p className="text-[9px] text-[var(--text-muted)]">Calm your nervous system</p>
                      </div>
                    </button>
                  )}
                  
                  {selectedMood?.tools.includes('journal') && (
                    <button onClick={openJournal} className="p-5 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex items-center gap-4 group text-left">
                      <div className="p-3 rounded-2xl bg-purple-100 text-purple-500 group-hover:scale-110 transition-transform">
                        <PenTool size={20} />
                      </div>
                      <div>
                        <span className="font-bold text-xs block">Journaling</span>
                        <p className="text-[9px] text-[var(--text-muted)]">Express your inner thoughts</p>
                      </div>
                    </button>
                  )}

                  {selectedMood?.tools.includes('grounding') && (
                    <button onClick={openGrounding} className="p-5 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex items-center gap-4 group text-left">
                      <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-500 group-hover:scale-110 transition-transform">
                        <Activity size={20} />
                      </div>
                      <div>
                        <span className="font-bold text-xs block">Grounding</span>
                        <p className="text-[9px] text-[var(--text-muted)]">Stay in the present</p>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3-Minute Reset ──────────────────────────────────── */}
      <motion.div 
        className="mt-20 w-full flex flex-col items-center gap-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
      >
        <button 
          onClick={openBreathe}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--grad-calm)] text-white font-bold shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Zap size={20} /> 3-Minute Reset
        </button>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Quick mental recharge</p>
          <InfoTooltip text="Slow breathing signals your nervous system that it’s safe." />
        </div>
      </motion.div>

      {/* ── About & Privacy ─────────────────────────────────── */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 w-full border-t border-[var(--border-subtle)] pt-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[var(--text-main)] font-bold uppercase tracking-wider text-xs">
            <Info size={16} className="text-[var(--color-primary)]" />
            Why SerenSpace exists
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            SerenSpace was built to provide a gentle, non-overwhelming sanctuary for mental wellness. We believe in emotion-first design that guides you through your toughest moments.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[var(--text-main)] font-bold uppercase tracking-wider text-xs">
            <ShieldCheck size={16} className="text-[var(--color-accent)]" />
            Your Privacy
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Your data stays on your device. We don't use trackers, accounts, or clouds. What you feel and write here is for your eyes only.
          </p>
        </div>
      </div>
    </main>
  )
}
