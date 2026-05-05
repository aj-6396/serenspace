import React from 'react'
import { motion } from 'framer-motion'
import { EMOTIONS } from '../utils/emotions'

export default function MoodSelector({ onSelect, selectedId }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-4 sm:gap-6 py-12 px-2" 
      role="radiogroup" 
      aria-label="How are you feeling right now?"
    >
      {EMOTIONS.map((mood) => {
        const isSelected = selectedId === mood.id
        return (
          <motion.button
            key={mood.id}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(mood.id)}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Feeling ${mood.id}`}
            className={`
              relative flex flex-col items-center justify-center gap-4 p-8 sm:p-10 rounded-[40px] transition-all duration-700
              min-w-[120px] sm:min-w-[140px]
              focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none
              ${isSelected 
                ? 'bg-[var(--bg-base)] premium-shadow ring-1 ring-[var(--color-primary)]/20 glow-teal' 
                : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] backdrop-blur-md'}
            `}
          >
            <span 
              className={`text-5xl sm:text-6xl transition-all duration-500 filter ${isSelected ? 'grayscale-0 scale-110' : 'grayscale-[0.4] opacity-70'}`}
              aria-hidden="true"
            >
              {mood.emoji}
            </span>
            <span className={`text-[11px] font-bold uppercase tracking-[0.3em] font-heading ${isSelected ? 'text-[var(--color-primary)] opacity-100' : 'text-[var(--text-muted)] opacity-70'}`}>
              {mood.id}
            </span>
            
            {isSelected && (
              <motion.div 
                layoutId="mood-indicator"
                className="absolute -bottom-2 w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-sm shadow-teal-500"
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
