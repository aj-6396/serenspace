import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, ArrowRight, X } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function BreakReminder({ isOpen, onClose }) {
  const setLastBreakReminder = useWellnessStore(s => s.setLastBreakReminder)

  const handleNeverToday = () => {
    setLastBreakReminder(Date.now() + 24 * 60 * 60 * 1000) // 24h later
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-sm glass-card p-8 bg-white"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                <Coffee size={24} />
              </div>
              <button onClick={onClose} className="text-[var(--text-muted)] hover:text-rose-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Time for a gentle break?</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8">
              You’ve been here for a few minutes. Would you like to pause, stretch, or keep going?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Pause and stretch
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl border border-[var(--border-subtle)] text-sm font-semibold text-[var(--text-main)] hover:bg-gray-50 transition-all"
              >
                Keep going
              </button>
              <button
                onClick={handleNeverToday}
                className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-rose-500 transition-all"
              >
                Never ask again today
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
