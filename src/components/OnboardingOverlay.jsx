import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWellnessStore from '../context/useWellnessStore'
import { ShieldCheck, Smile, Wind, PenTool, ArrowRight, Check } from 'lucide-react'

const STEPS = [
  {
    title: "How are you today?",
    desc: "Choose your mood to get personalized support pathways.",
    icon: <Smile className="w-8 h-8" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Find your calm.",
    desc: "Try a 1-minute breathing exercise to ground your mind.",
    icon: <Wind className="w-8 h-8" />,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "Reflect & Grow.",
    desc: "Write short journal entries to track your mental journey.",
    icon: <PenTool className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600"
  }
]

export default function OnboardingOverlay() {
  const [step, setStep] = useState(0)
  const completeOnboarding = useWellnessStore((s) => s.completeOnboarding)

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      completeOnboarding()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md px-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-card max-w-sm w-full p-8 md:p-10 bg-white text-center space-y-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <div className={`p-5 rounded-[2rem] ${STEPS[step].color} shadow-inner`}>
                {STEPS[step].icon}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[var(--text-main)]">{STEPS[step].title}</h2>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {STEPS[step].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-[var(--color-primary)]' : 'w-2 bg-gray-200'}`} 
            />
          ))}
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20"
          >
            {step === STEPS.length - 1 ? 'Get Started' : 'Next'} 
            {step === STEPS.length - 1 ? <Check size={18} /> : <ArrowRight size={18} />}
          </button>
          
          {step === 0 && (
            <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] font-medium">
              <ShieldCheck size={12} />
              Private & Local Only
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
