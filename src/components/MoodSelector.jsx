import React from 'react'
import { motion } from 'framer-motion'
import { EMOTIONS } from '../utils/emotions'

export default function MoodSelector({ onSelect, selectedId }) {
  return (
    <div className="flex justify-center gap-4 md:gap-6 py-4">
      {EMOTIONS.map((mood) => (
        <motion.button
          key={mood.id}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(mood.id)}
          className={`
            flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300
            ${selectedId === mood.id 
              ? 'bg-white shadow-lg scale-110 border-2 border-[var(--color-primary)]' 
              : 'bg-white/40 hover:bg-white/60 border border-transparent'}
          `}
          aria-label={`Select ${mood.label}`}
        >
          <span className="text-4xl md:text-5xl">{mood.emoji}</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedId === mood.id ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'}`}>
            {mood.id}
          </span>
        </motion.button>
      ))}
    </div>
  )
}
