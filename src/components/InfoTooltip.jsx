import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

export default function InfoTooltip({ text }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block ml-2">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors focus:outline-none"
        aria-label="Why this helps"
      >
        <HelpCircle size={14} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-white/90 backdrop-blur-md border border-[var(--border-subtle)] rounded-xl shadow-xl text-[10px] leading-relaxed text-[var(--text-main)] pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 border-r border-b border-[var(--border-subtle)] rotate-45 -translate-y-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
