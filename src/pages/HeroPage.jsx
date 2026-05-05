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
    <main className="flex flex-col items-center min-h-screen px-4 sm:px-8 pt-24 sm:pt-32 pb-32 sm:pb-40 max-w-5xl mx-auto space-y-12 sm:space-y-16">
      {/* ── Daily Ritual ─────────────────────────────────── */}
      <div className="w-full max-w-lg relative animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <DailyRitualCard />
        <div className="absolute -top-1 -right-1">
          <InfoTooltip text="Daily rituals build mental resilience through consistency." />
        </div>
      </div>

      {/* ── Hero Heading ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="text-center space-y-4 sm:space-y-6"
      >
        <div className="flex flex-col items-center gap-2 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-[var(--text-main)] tracking-tight leading-tight">
            How are you <span className="gradient-text">feeling</span>?
          </h1>
          <InfoTooltip text="Labeling your emotions reduces their intensity in the brain." />
        </div>
        <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg max-w-md mx-auto font-body leading-relaxed px-4">
          Choose a mood to explore personalized pathways for your well-being.
        </p>
      </motion.div>

      {/* ── Mood Selector ───────────────────────────────────── */}
      <div className="w-full px-2">
        <MoodSelector onSelect={handleMoodSelect} selectedId={selectedMoodId} />
      </div>

      {/* ── Dynamic Mood-Based Modules ──────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedMoodId && (
          <motion.div
            key={selectedMoodId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-xl space-y-8 sm:space-y-10"
          >
            {/* Cognitive Reframing / Tools */}
            {(selectedMoodId === 'sad' || selectedMoodId === 'anxious') && (
              <ThoughtCheckCard 
                mood={selectedMoodId} 
                onComplete={() => console.log('Thought check complete')} 
              />
            )}

            {/* Standard Suggestions Card */}
            <div className="glass-card p-6 sm:p-10 space-y-8 sm:space-y-12 bg-white/60 backdrop-blur-xl">
              <div className="space-y-4 sm:space-y-6 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  A thought for you
                </div>
                <p className="text-xl sm:text-2xl font-medium text-[var(--text-main)] leading-relaxed italic font-body">
                  "{selectedMood?.affirmation}"
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-heading">Suggested pathways</h3>
                  <InfoTooltip text="Different tools engage different parts of your brain for regulation." />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {selectedMood?.tools.includes('breathe') && (
                    <button onClick={openBreathe} className="w-full p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white/40 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex items-center gap-4 sm:gap-5 group text-left min-h-[56px]">
                      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-teal-50 text-teal-500 group-hover:scale-110 transition-transform shrink-0">
                        <Wind size={20} />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-xs sm:text-sm block text-[var(--text-main)]">Breathing</span>
                        <p className="text-[10px] text-[var(--text-muted)] font-body leading-tight mt-1">Calm your nervous system</p>
                      </div>
                    </button>
                  )}
                  
                  {selectedMood?.tools.includes('journal') && (
                    <button onClick={openJournal} className="w-full p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white/40 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex items-center gap-4 sm:gap-5 group text-left min-h-[56px]">
                      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-500 group-hover:scale-110 transition-transform shrink-0">
                        <PenTool size={20} />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-xs sm:text-sm block text-[var(--text-main)]">Journaling</span>
                        <p className="text-[10px] text-[var(--text-muted)] font-body leading-tight mt-1">Express your inner thoughts</p>
                      </div>
                    </button>
                  )}

                  {selectedMood?.tools.includes('grounding') && (
                    <button onClick={openGrounding} className="w-full p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white/40 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex items-center gap-4 sm:gap-5 group text-left min-h-[56px]">
                      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-50 text-orange-500 group-hover:scale-110 transition-transform shrink-0">
                        <Activity size={20} />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-xs sm:text-sm block text-[var(--text-main)]">Grounding</span>
                        <p className="text-[10px] text-[var(--text-muted)] font-body leading-tight mt-1">Stay in the present</p>
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
        className="pt-8 w-full flex flex-col items-center gap-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      >
        <button 
          onClick={openBreathe}
          className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-[24px] bg-[var(--grad-calm)] text-white font-heading font-bold shadow-2xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all min-h-[56px]"
        >
          <Zap size={22} /> 3-Minute Reset
        </button>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold font-heading">Quick mental recharge</p>
          <InfoTooltip text="Slow breathing signals your nervous system that it’s safe." />
        </div>
      </motion.div>

      {/* ── About & Privacy ─────────────────────────────────── */}
      <div className="mt-32 sm:mt-40 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full border-t border-[var(--border-subtle)] pt-12 sm:pt-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-3 text-[var(--text-main)] font-heading font-bold uppercase tracking-widest text-[10px] sm:text-xs">
            <Info size={18} className="text-[var(--color-primary)]" />
            Why SerenSpace exists
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-body">
            SerenSpace was built to provide a gentle, non-overwhelming sanctuary for mental wellness. We believe in emotion-first design that guides you through your toughest moments.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-3 text-[var(--text-main)] font-heading font-bold uppercase tracking-widest text-[10px] sm:text-xs">
            <ShieldCheck size={18} className="text-[var(--color-secondary)]" />
            Your Privacy
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-body">
            Your data stays on your device. We don't use trackers, accounts, or clouds. What you feel and write here is for your eyes only.
          </p>
        </div>
      </div>
    </main>
  )
}
