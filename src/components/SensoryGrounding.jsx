import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Hand, Volume2, Wind, Utensils, ChevronRight, Check } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

const GROUNDING_STEPS = [
  { id: 5, label: "5 things you see", icon: <Eye size={24} />, color: "bg-blue-100 text-blue-600" },
  { id: 4, label: "4 things you can feel", icon: <Hand size={24} />, color: "bg-emerald-100 text-emerald-600" },
  { id: 3, label: "3 things you hear", icon: <Volume2 size={24} />, color: "bg-purple-100 text-purple-600" },
  { id: 2, label: "2 things you smell", icon: <Wind size={24} />, color: "bg-amber-100 text-amber-600" },
  { id: 1, label: "1 thing you notice in your body", icon: <Utensils size={24} />, color: "bg-rose-100 text-rose-600" }
]

export default function SensoryGrounding() {
  const [stepIndex, setStepIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const goHome = useWellnessStore(s => s.goHome)

  const currentStep = GROUNDING_STEPS[stepIndex]

  const handleTap = () => {
    if (count < currentStep.id) {
      setCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (stepIndex < GROUNDING_STEPS.length - 1) {
      setStepIndex(prev => prev + 1)
      setCount(0)
    } else {
      setIsFinished(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full glass-card p-8 text-center space-y-8"
          >
            <div className="flex justify-center">
              <div className={`p-4 rounded-full ${currentStep.color}`}>
                {currentStep.icon}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[var(--text-main)]">{currentStep.label}</h2>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">
                Tap the circle for each one you find
              </p>
            </div>

            <div className="flex justify-center items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleTap}
                disabled={count === currentStep.id}
                className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
                  count === currentStep.id 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600' 
                    : 'border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-purple-50'
                }`}
              >
                <span className="text-3xl font-bold">{count}</span>
                <span className="text-[10px] font-bold uppercase">/ {currentStep.id}</span>
              </motion.button>
            </div>

            <div className="flex justify-center gap-2">
              {[...Array(currentStep.id)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${i < count ? 'w-6 bg-emerald-400' : 'w-2 bg-gray-200'}`} 
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={count < currentStep.id}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50 transition-all shadow-lg"
            >
              {stepIndex === GROUNDING_STEPS.length - 1 ? 'Finish' : 'Next Step'} <ChevronRight size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full glass-card p-10 text-center space-y-8"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
              <Check size={40} />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-main)]">You are grounded.</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Take a deep breath. You are in the present moment, and you are safe.
            </p>
            <button
              onClick={goHome}
              className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-bold shadow-lg"
            >
              Back to SerenSpace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
