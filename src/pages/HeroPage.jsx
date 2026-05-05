import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoodSelector from '../components/MoodSelector'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'
import { Wind, PenTool, Activity, ShieldCheck, Info, Zap } from 'lucide-react'

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

  const renderSuggestions = () => {
    if (!selectedMood) return null

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
      >
        {selectedMood.tools.includes('breathe') && (
          <button onClick={openBreathe} className="p-6 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 group-hover:scale-110 transition-transform">
              <Wind size={24} />
            </div>
            <span className="font-semibold text-sm">Breathing Exercise</span>
            <p className="text-[10px] text-[var(--text-muted)] text-center">Calm your nervous system</p>
          </button>
        )}
        
        {selectedMood.tools.includes('journal') && (
          <button onClick={openJournal} className="p-6 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 group-hover:scale-110 transition-transform">
              <PenTool size={24} />
            </div>
            <span className="font-semibold text-sm">Journaling Prompt</span>
            <p className="text-[10px] text-[var(--text-muted)] text-center">Express your inner thoughts</p>
          </button>
        )}

        {selectedMood.tools.includes('grounding') && (
          <button onClick={openGrounding} className="p-6 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-500 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <span className="font-semibold text-sm">Grounding Activity</span>
            <p className="text-[10px] text-[var(--text-muted)] text-center">Stay in the present moment</p>
          </button>
        )}

        {(selectedMood.id === 'happy' || selectedMood.id === 'neutral') && (
          <button onClick={openProgress} className="p-6 rounded-3xl bg-white/60 border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 rounded-full bg-amber-100 text-amber-500 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <span className="font-semibold text-sm">Productivity Boost</span>
            <p className="text-[10px] text-[var(--text-muted)] text-center">Leverage your current flow</p>
          </button>
        )}
      </motion.div>
    )
  }

  return (
    <main className="flex flex-col items-center min-h-screen px-6 pt-24 pb-32 max-w-4xl mx-auto">
      {/* ── Streak Counter ─────────────────────────────────── */}
      <motion.button 
        onClick={openProgress}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mb-12 px-4 py-2 rounded-full bg-white/50 border border-[var(--border-subtle)] text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2"
      >
        <Activity size={14} className="text-[var(--color-primary)]" />
        {streak > 0 ? `You’ve checked in ${streak} days in a row 👏` : "Start your daily streak today"}
      </motion.button>

      {/* ── Hero Heading ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-main)] mb-4 tracking-tight">
          How are you <span className="gradient-text">feeling</span> today?
        </h1>
        <p className="text-[var(--text-muted)] text-lg max-w-lg mx-auto">
          Choose a mood to get personalized wellness suggestions.
        </p>
      </motion.div>

      {/* ── Mood Selector ───────────────────────────────────── */}
      <MoodSelector onSelect={handleMoodSelect} selectedId={selectedMoodId} />

      {/* ── Dynamic Suggestions ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        {renderSuggestions()}
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
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Quick mental recharge</p>
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
