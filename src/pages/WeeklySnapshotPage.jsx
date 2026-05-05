import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronLeft, Moon, Activity, Heart, Check } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function WeeklySnapshotPage() {
  const [step, setStep] = useState(1)
  const [sleep, setSleep] = useState('')
  const [freq, setFreq] = useState('')
  const [gratitude, setGratitude] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  
  const goHome = useWellnessStore(s => s.goHome)
  const addWeeklySnapshot = useWellnessStore(s => s.addWeeklySnapshot)

  const handleFinish = () => {
    addWeeklySnapshot({
      id: Date.now(),
      weekStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      weekEnd: new Date().toISOString(),
      sleep,
      practiceFreq: freq,
      gratitude
    })
    setIsFinished(true)
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-24 pb-32 max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-12">
        <button onClick={goHome} className="text-[var(--text-muted)] flex items-center gap-2 hover:text-[var(--text-main)] transition-colors">
          <ChevronLeft size={20} /> Back
        </button>
        <h1 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Weekly Snapshot</h1>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full space-y-10"
          >
            {/* Step 1: Sleep */}
            <div className={`space-y-4 transition-opacity ${step !== 1 ? 'opacity-30 pointer-events-none' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600"><Moon size={18} /></div>
                <h3 className="font-semibold text-[var(--text-main)]">How’s your sleep this week?</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Good', 'Okay', 'Rough'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSleep(opt); setStep(2) }}
                    className={`py-4 rounded-2xl border text-sm font-medium transition-all ${sleep === opt ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg' : 'bg-white/50 border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-primary)]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Frequency */}
            <div className={`space-y-4 transition-opacity ${step < 2 ? 'opacity-30 pointer-events-none' : step !== 2 ? 'opacity-30' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-600"><Activity size={18} /></div>
                <h3 className="font-semibold text-[var(--text-main)]">How often did you practice?</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-left">
                {['Never', '1-2 times', 'Several times', 'Almost every day'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setFreq(opt); setStep(3) }}
                    className={`p-4 rounded-2xl border text-xs font-medium transition-all ${freq === opt ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg' : 'bg-white/50 border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-primary)]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Gratitude */}
            <div className={`space-y-4 transition-opacity ${step < 3 ? 'opacity-30 pointer-events-none' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-rose-100 text-rose-600"><Heart size={18} /></div>
                <h3 className="font-semibold text-[var(--text-main)]">What’s one thing you’re grateful for?</h3>
              </div>
              <textarea
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="A warm cup of coffee, a call from a friend..."
                className="w-full h-32 p-4 rounded-2xl bg-white/50 border border-[var(--border-subtle)] focus:border-[var(--color-primary)] transition-all resize-none text-sm outline-none"
              />
              <button
                onClick={handleFinish}
                disabled={!gratitude.trim()}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[var(--color-primary)] text-white font-bold shadow-xl shadow-purple-500/20 disabled:opacity-50 transition-all"
              >
                Complete Snapshot <Check size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Check size={40} />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-main)] mb-4">Well done!</h2>
            <p className="text-[var(--text-muted)] mb-12 max-w-sm mx-auto leading-relaxed">
              Reflection is a powerful tool for growth. Your snapshot has been saved to your journey log.
            </p>
            <button
              onClick={goHome}
              className="px-10 py-4 rounded-2xl bg-[var(--color-primary)] text-white font-bold shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Back to SerenSpace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
