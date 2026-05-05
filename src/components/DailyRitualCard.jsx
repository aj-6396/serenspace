import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Sparkles } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function DailyRitualCard() {
  const dailyRitualDone = useWellnessStore(s => s.dailyRitualDone)
  const setDailyRitualDone = useWellnessStore(s => s.setDailyRitualDone)
  const updateStreak = useWellnessStore(s => s.updateStreak)

  const handleComplete = () => {
    setDailyRitualDone(true)
    updateStreak()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full p-8 sm:p-10 rounded-[40px] border transition-all duration-1000 premium-shadow ${
        dailyRitualDone 
          ? 'bg-gradient-to-br from-emerald-50/80 to-white/40 border-emerald-100/50 glow-teal' 
          : 'glass-card'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className={`p-5 rounded-2xl transition-all duration-1000 ${dailyRitualDone ? 'bg-emerald-100 text-emerald-600' : 'bg-teal-50 text-teal-600'}`}>
            {dailyRitualDone ? <CheckCircle size={24} /> : <Sparkles size={24} className="animate-pulse" />}
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] font-heading opacity-60">Daily Intention</h4>
            <p className="text-lg sm:text-xl font-bold text-[var(--text-main)] font-body tracking-tight">
              {dailyRitualDone 
                ? "You've nurtured your mind today." 
                : "Mindful check-in & short breathing."}
            </p>
          </div>
        </div>

        {!dailyRitualDone ? (
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-teal-500/20 hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            Complete Ritual
          </button>
        ) : (
          <div className="flex items-center gap-3 text-emerald-600 font-heading font-bold text-[10px] uppercase tracking-[0.3em] bg-emerald-100/50 px-6 py-3 rounded-full">
            <Zap size={14} className="fill-emerald-600" /> Current Streak: {useWellnessStore.getState().streak}
          </div>
        )}
      </div>
    </motion.div>
  )
}
