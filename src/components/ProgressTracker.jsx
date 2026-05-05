import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Calendar, ChevronLeft } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'
import InfoTooltip from './InfoTooltip'
import MoodGarden from './MoodGarden'

export default function ProgressTracker() {
  const streak = useWellnessStore(s => s.streak)
  const moodHistory = useWellnessStore(s => s.moodHistory)
  const goHome = useWellnessStore(s => s.goHome)

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 sm:px-8 py-10 sm:py-20 min-h-[90vh]">
      <div className="w-full flex justify-between items-center mb-8">
        <button onClick={goHome} className="text-[var(--text-muted)] flex items-center gap-2 hover:text-[var(--text-main)] transition-colors h-11 px-2 font-bold uppercase tracking-widest text-[10px]">
          <ChevronLeft size={20} /> Back
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full glass-card p-8 sm:p-10 text-center mb-10 bg-pastel relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[32px] bg-[var(--color-primary)] text-white mb-6 shadow-xl shadow-teal-500/30">
            <Award size={40} />
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-[var(--text-main)] mb-2 font-heading tracking-tight">{streak}</h2>
          <p className="text-[var(--text-muted)] font-bold uppercase tracking-[0.2em] text-[10px] font-heading">Day Streak</p>
          <div className="mt-8 p-4 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-sm">
            <p className="text-sm sm:text-base text-[var(--text-main)] font-body leading-relaxed">
              You’ve checked in <span className="font-bold text-[var(--color-primary)]">{streak} days</span> in a row. 👏 Every small step counts towards your peace.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="w-full mb-12">
        <MoodGarden />
      </div>

      <div className="w-full space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-50 text-[var(--color-primary)]">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] font-heading flex items-center gap-2 tracking-tight">
            Recent Journey
            <InfoTooltip text="Tracking your mood over time helps you notice patterns and celebrate small improvements." />
          </h3>
        </div>

        <div className="space-y-4">
          {moodHistory.slice(-7).reverse().map((entry, idx) => {
            const emotion = getEmotion(entry.emotionId)
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-5 rounded-[24px] bg-white border border-[var(--border-subtle)] hover:border-[var(--color-primary)] transition-all group"
              >
                <div className="flex items-center gap-5">
                  <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{emotion?.emoji || '❔'}</span>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-[var(--text-main)] font-heading">{emotion?.label || 'Unknown'}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">
                      <Calendar size={12} className="text-[var(--color-primary)]" /> {entry.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {moodHistory.length === 0 && (
            <div className="text-center py-16 text-[var(--text-muted)] text-sm italic font-body border-2 border-dashed border-[var(--border-subtle)] rounded-[32px]">
              No mood history yet. Start by checking in today!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
