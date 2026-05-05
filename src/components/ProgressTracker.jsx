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
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-10 py-20 sm:py-32 min-h-screen">
      <div className="w-full mb-16">
        <button onClick={goHome} className="group text-[var(--text-muted)] flex items-center gap-3 hover:text-[var(--text-main)] transition-all h-12 px-6 rounded-full bg-white/40 border border-white/20 font-bold uppercase tracking-[0.2em] text-[10px]">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Sanctuary
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full glass-card p-12 sm:p-20 text-center mb-16 bg-gradient-to-br from-white/60 to-white/20 relative overflow-hidden premium-shadow"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none grayscale">
          <img src="/assets/logo.png" alt="" className="w-32 h-32 object-contain" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-[36px] bg-white shadow-2xl mb-8"
          >
            <img src="/assets/logo.png" alt="SerenSpace Logo" className="w-14 h-14 object-contain" />
          </motion.div>
          <h2 className="text-7xl sm:text-9xl font-bold gradient-text mb-4 font-heading tracking-tighter leading-none">{streak}</h2>
          <p className="text-[var(--text-muted)] font-bold uppercase tracking-[0.4em] text-xs font-heading">Day Streak Bloom</p>
          
          <div className="mt-12 p-6 rounded-3xl bg-white/50 border border-white/80 backdrop-blur-sm max-w-lg mx-auto shadow-sm">
            <p className="text-base sm:text-lg text-[var(--text-main)] font-body leading-relaxed opacity-90">
              Your dedication is inspiring. You've nurtured your peace for <span className="font-bold text-[var(--color-primary)]">{streak} consecutive days</span>.
            </p>
          </div>
        </div>
      </motion.div>

      <section className="w-full mb-24">
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)] opacity-60">Visualized Mindset</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] font-heading tracking-tight">Emotional Landscape</h3>
        </div>
        <MoodGarden />
      </section>

      <section className="w-full max-w-2xl space-y-12">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-teal-50 text-[var(--color-primary)]">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] font-heading tracking-tight">Recent Journey</h3>
          </div>
          <InfoTooltip text="Seeing your emotional shifts helps build self-compassion and recognition of progress." />
        </div>

        <div className="space-y-6">
          {moodHistory.slice(-7).reverse().map((entry, idx) => {
            const emotion = getEmotion(entry.emotionId)
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-6 sm:p-8 rounded-[32px] bg-white/60 border border-white/80 hover:border-[var(--color-primary)] hover:bg-white transition-all group shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="text-4xl sm:text-5xl filter transition-transform group-hover:scale-110 duration-500">{emotion?.emoji || '❔'}</div>
                  <div>
                    <p className="text-lg font-bold text-[var(--text-main)] font-heading">{emotion?.label || 'Self Check-in'}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-[0.2em] mt-2 opacity-60">
                      <Calendar size={12} className="text-[var(--color-primary)]" /> {entry.date}
                    </div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-20 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
          
          {moodHistory.length === 0 && (
            <div className="text-center py-24 text-[var(--text-muted)] text-sm italic font-body border-2 border-dashed border-white rounded-[40px] opacity-40">
              Your story is waiting to be written. <br /> Check in to see your landscape grow.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
