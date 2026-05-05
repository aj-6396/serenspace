import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Brain } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

export default function ThoughtCheckCard({ mood, onComplete }) {
  const [step, setStep] = useState(1)
  const [thought, setThought] = useState('')
  const [isTrue, setIsTrue] = useState(null)
  const [balancedThought, setBalancedThought] = useState('')
  
  const addThoughtCheck = useWellnessStore(s => s.addThoughtCheck)

  const handleFinish = () => {
    addThoughtCheck({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      mood,
      thought,
      isTrue,
      balancedThought
    })
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full glass-card p-6 md:p-8 bg-pastel"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)]">
          <Brain size={20} />
        </div>
        <h3 className="font-semibold text-lg text-[var(--text-main)]">Thought Check-in</h3>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-sm text-[var(--text-muted)]">What’s going through your mind right now?</p>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="I feel like I'm failing at..."
              className="w-full h-32 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--color-primary)] transition-all resize-none text-sm outline-none text-[var(--text-main)] placeholder:opacity-50"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!thought.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium disabled:opacity-50"
            >
              Next <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <p className="text-sm text-[var(--text-muted)]">Is this thought 100% true?</p>
            <div className="grid grid-cols-3 gap-3">
              {['Yes', 'No', 'Not sure'].map((option) => (
                <button
                  key={option}
                  onClick={() => setIsTrue(option)}
                  className={`py-3 rounded-xl border text-xs font-medium transition-all ${
                    isTrue === option 
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' 
                      : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-primary)]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)]">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!isTrue}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium disabled:opacity-50"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-sm text-[var(--text-muted)]">What’s a kinder, more balanced way to see this?</p>
            <textarea
              value={balancedThought}
              onChange={(e) => setBalancedThought(e.target.value)}
              placeholder="While I'm struggling with X, I am doing my best in Y..."
              className="w-full h-32 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--color-primary)] transition-all resize-none text-sm outline-none text-[var(--text-main)] placeholder:opacity-50"
            />
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)]">
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={!balancedThought.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium disabled:opacity-50"
              >
                Complete <Check size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
