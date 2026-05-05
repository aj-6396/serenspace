import React from 'react'
import { motion } from 'framer-motion'
import { EMOTIONS } from '../utils/emotions'

export default function MoodSelector({ onSelect, selectedId }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 py-6" role="radiogroup" aria-label="Select your current emotion">
      {EMOTIONS.map((mood) => {
        const isSelected = selectedId === mood.id
        return (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood.id)}
            role="radio"
            aria-checked={isSelected}
            className={`
              flex flex-col items-center gap-3 p-6 rounded-[32px] transition-all duration-500
              ${isSelected 
                ? 'bg-white shadow-xl shadow-teal-500/5 ring-2 ring-[var(--color-primary)]' 
                : 'bg-white/40 hover:bg-white/70 border border-[var(--border-subtle)]'}
              btn-hover-scale
            `}
          >
            <span 
              className="text-5xl md:text-6xl drop-shadow-sm filter grayscale-[0.2] hover:grayscale-0 transition-all"
              aria-hidden="true"
            >
              {mood.emoji}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'}`}>
              {mood.id}
            </span>
            
            {isSelected && (
              <motion.div 
                layoutId="mood-active"
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1"
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
