import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Check, Sparkles } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

const VALUES = ["Peace", "Connection", "Balance", "Creativity", "Rest"]

export default function ValuesPrompter({ onComplete }) {
  const [selectedValue, setSelectedValue] = useState(null)
  const [tinyStep, setTinyStep] = useState('')
  
  const addValuesPrompt = useWellnessStore(s => s.addValuesPrompt)

  const handleSave = () => {
    addValuesPrompt({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      value: selectedValue,
      tinyStep
    })
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full glass-card p-6 md:p-8 bg-pastel"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-amber-100 text-amber-600">
          <Star size={20} />
        </div>
        <h3 className="font-semibold text-lg text-[var(--text-main)]">Values & Goals</h3>
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">What matters most to you this week?</p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {VALUES.map((val) => (
          <motion.button
            key={val}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedValue(val)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedValue === val 
                ? 'bg-[var(--color-primary)] text-white shadow-md' 
                : 'bg-white/50 border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-primary)]'
            }`}
          >
            {val}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedValue && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <p className="text-sm text-[var(--text-muted)]">What’s one tiny step you can take today toward that?</p>
            <textarea
              value={tinyStep}
              onChange={(e) => setTinyStep(e.target.value)}
              placeholder="e.g., Take 5 minutes to just sit and breathe."
              className="w-full h-24 p-4 rounded-2xl bg-white/50 border border-[var(--border-subtle)] focus:border-[var(--color-primary)] transition-all resize-none text-sm outline-none"
            />
            <button
              onClick={handleSave}
              disabled={!tinyStep.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium disabled:opacity-50"
            >
              Set Intention <Check size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
