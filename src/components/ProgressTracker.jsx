import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Calendar, ChevronLeft } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'

export default function ProgressTracker() {
  const streak = useWellnessStore(s => s.streak)
  const moodHistory = useWellnessStore(s => s.moodHistory)
  const goHome = useWellnessStore(s => s.goHome)

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-12 min-h-[80vh]">
      <div className="w-full mb-8">
        <button onClick={goHome} className="text-[var(--text-muted)] flex items-center gap-2 hover:text-[var(--text-main)] transition-colors">
          <ChevronLeft size={20} /> Back
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full glass-card p-8 text-center mb-10 bg-pastel"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-primary)] text-white mb-4 shadow-lg shadow-purple-500/30">
          <Award size={40} />
        </div>
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-2">{streak}</h2>
        <p className="text-[var(--text-muted)] font-medium uppercase tracking-widest text-[10px]">Day Check-in Streak</p>
        <p className="mt-4 text-sm text-[var(--text-main)]">
          You’ve checked in {streak} days in a row. 👏 Keep up the great work!
        </p>
      </motion.div>

      <div className="w-full">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-[var(--color-primary)]" size={20} />
          <h3 className="text-xl font-semibold text-[var(--text-main)]">Recent Moods</h3>
        </div>

        <div className="space-y-3">
          {moodHistory.slice(-7).reverse().map((entry, idx) => {
            const emotion = getEmotion(entry.emotionId)
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-[var(--border-subtle)]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{emotion?.emoji || '❔'}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-main)]">{emotion?.label || 'Unknown'}</p>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                      <Calendar size={10} /> {entry.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {moodHistory.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)] text-sm italic">
              No mood history yet. Start by checking in today!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
