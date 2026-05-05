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
      className="flex flex-wrap justify-center gap-4 sm:gap-8 py-8" 
      role="radiogroup" 
      aria-label="Select your current emotion"
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
            className={`
              relative flex flex-col items-center gap-4 p-8 sm:p-10 rounded-[40px] transition-all duration-700
              ${isSelected 
                ? 'bg-white premium-shadow ring-1 ring-[var(--color-primary)]/20 glow-teal' 
                : 'bg-white/40 hover:bg-white/60 border border-white/50 backdrop-blur-md'}
            `}
          >
            <span 
              className={`text-4xl sm:text-6xl transition-all duration-500 filter ${isSelected ? 'grayscale-0 scale-110' : 'grayscale-[0.3] opacity-60'}`}
              aria-hidden="true"
            >
              {mood.emoji}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isSelected ? 'text-[var(--color-primary)] opacity-100' : 'text-[var(--text-muted)] opacity-60'}`}>
              {mood.id}
            </span>
            
            {isSelected && (
              <motion.div 
                layoutId="mood-indicator"
                className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-sm shadow-teal-500"
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
