import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Activity } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

const STEPS = [
  "Notice tension in your shoulders.",
  "Breathe into that area and exhale as if melting it.",
  "Scan from head to feet, releasing one area at a time."
]

export default function BodyScanCard({ mood }) {
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [stepIndex, setStepIndex] = useState(0)
  
  const addBodyScanSession = useWellnessStore(s => s.addBodyScanSession)
  const timerRef = useRef(null)

  useEffect(() => {
    if (running && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
        if (timeLeft % 10 === 0 && stepIndex < STEPS.length - 1) {
          setStepIndex(prev => prev + 1)
        }
      }, 1000)
    } else if (timeLeft === 0) {
      setRunning(false)
      addBodyScanSession({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        mood,
        duration: 30
      })
    }
    return () => clearInterval(timerRef.current)
  }, [running, timeLeft])

  const reset = () => {
    setRunning(false)
    setTimeLeft(30)
    setStepIndex(0)
    clearInterval(timerRef.current)
  }

  const progress = ((30 - timeLeft) / 30) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full glass-card p-8 bg-pastel"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
          <Activity size={20} />
        </div>
        <h3 className="font-semibold text-lg text-[var(--text-main)]">Body Scan</h3>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64" cy="64" r="60"
              fill="transparent"
              stroke="var(--border-subtle)"
              strokeWidth="4"
            />
            <motion.circle
              cx="64" cy="64" r="60"
              fill="transparent"
              stroke="var(--color-accent)"
              strokeWidth="4"
              strokeDasharray="377"
              animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[var(--text-main)]">
            {timeLeft}
          </div>
        </div>

        <div className="text-center min-h-[48px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-[var(--text-main)] font-medium leading-relaxed px-4"
            >
              {STEPS[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setRunning(!running)}
            className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all"
          >
            {running ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={reset}
            className="w-14 h-14 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center hover:bg-white/50 active:scale-95 transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
