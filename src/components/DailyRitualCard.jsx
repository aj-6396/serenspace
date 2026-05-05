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
      className={`w-full p-6 rounded-3xl border transition-all ${
        dailyRitualDone 
          ? 'bg-emerald-50/50 border-emerald-100' 
          : 'bg-white/50 border-[var(--border-subtle)]'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${dailyRitualDone ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Today's Mini-Ritual</h4>
            <p className="text-sm font-semibold text-[var(--text-main)]">
              {dailyRitualDone 
                ? "Nice work on your ritual today!" 
                : "3 min breathing + 1 journal prompt."}
            </p>
          </div>
        </div>

        {!dailyRitualDone && (
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <CheckCircle size={14} /> Mark as done
          </button>
        )}
      </div>
    </motion.div>
  )
}
