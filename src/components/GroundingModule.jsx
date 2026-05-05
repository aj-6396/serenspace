import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Wind } from 'lucide-react'
import useWellnessStore from '../context/useWellnessStore'

const STEPS = [
  { id: 5, label: "Name 5 things you see." },
  { id: 4, label: "4 things you can touch." },
  { id: 3, label: "3 things you hear." },
  { id: 2, label: "2 things you smell." },
  { id: 1, label: "1 thing you notice in your body." }
]

export default function GroundingModule() {
  const [completed, setCompleted] = useState([])
  const addGroundingSession = useWellnessStore(s => s.addGroundingSession)

  const toggleStep = (id) => {
    const newCompleted = completed.includes(id) 
      ? completed.filter(i => i !== id) 
      : [...completed, id]
    
    setCompleted(newCompleted)
    
    if (newCompleted.length === STEPS.length) {
      addGroundingSession({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        completedSteps: newCompleted
      })
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="text-rose-500" size={18} />
        <h4 className="text-sm font-bold uppercase tracking-widest text-rose-900">Grounding Exercise</h4>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {STEPS.map((step) => {
          const isDone = completed.includes(step.id)
          return (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                isDone 
                  ? 'bg-rose-100/50 border-rose-300 text-rose-900' 
                  : 'bg-white/40 border-rose-100 text-rose-800 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold w-6">{step.id}</span>
                <span className="text-xs font-medium">{step.label}</span>
              </div>
              <AnimatePresence mode="wait">
                {isDone ? (
                  <motion.div
                    key="done"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 size={20} className="text-rose-600" />
                  </motion.div>
                ) : (
                  <motion.div key="not-done">
                    <Circle size={20} className="text-rose-200" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>
      
      {completed.length === STEPS.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[10px] font-bold text-rose-600 uppercase tracking-widest mt-4"
        >
          Excellent. You are back in the present. ✨
        </motion.p>
      )}
    </div>
  )
}
