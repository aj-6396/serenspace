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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full p-8 rounded-[32px] border transition-all duration-700 ${
        dailyRitualDone 
          ? 'bg-emerald-50/70 border-emerald-100 shadow-xl shadow-emerald-500/5' 
          : 'glass-card'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-2xl transition-colors duration-700 ${dailyRitualDone ? 'bg-emerald-100 text-emerald-600' : 'bg-teal-50 text-teal-600'}`}>
            <Sparkles size={22} className={dailyRitualDone ? '' : 'animate-pulse'} />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-heading">Today's Mini-Ritual</h4>
            <p className="text-base font-bold text-[var(--text-main)] font-body">
              {dailyRitualDone 
                ? "Ritual completed. You're doing great." 
                : "3 min breathing + 1 journal prompt."}
            </p>
          </div>
        </div>

        {!dailyRitualDone ? (
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-teal-500/20 btn-hover-scale"
          >
            <CheckCircle size={14} /> Mark Done
          </button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-600 font-heading font-bold text-[10px] uppercase tracking-widest">
            <CheckCircle size={16} /> Day Streak +1
          </div>
        )}
      </div>
    </motion.div>
  )
}
