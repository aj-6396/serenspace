/**
 * EmotionButton.jsx
 *
 * An individual emotion-selection button used in the Hero section.
 * Implements: smooth hover/active animations, visible focus ring (a11y),
 * aria-label, and keyboard enter/space activation.
 */
import React from 'react'
import { motion } from 'framer-motion'

/**
 * @param {object} props
 * @param {string}   props.id        – unique emotion id
 * @param {string}   props.label     – button text e.g. "I feel anxious"
 * @param {string}   props.emoji     – decorative emoji
 * @param {string}   props.color     – 'amber' | 'sage'
 * @param {function} props.onClick   – called with emotion id on activation
 * @param {number}   props.index     – stagger index for entrance animation
 */
export default function EmotionButton({ id, label, emoji, color, onClick, index }) {
  const isAmber = color === 'amber'

  return (
    <motion.button
      id={`emotion-btn-${id}`}
      aria-label={label}
      onClick={() => onClick(id)}
      className="
        relative w-full group
        glass-card glass-card-hover btn-glow
        px-6 py-5 text-left
        cursor-pointer select-none
      "
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Hover accent bar on left edge */}
      <span
        className="
          absolute left-0 top-4 bottom-4 w-0.5 rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        "
        style={{
          background: isAmber
            ? 'linear-gradient(to bottom, #f6c857, #f9d87a)'
            : 'linear-gradient(to bottom, #7db88a, #9fcba9)',
        }}
        aria-hidden="true"
      />

      <span className="flex items-center gap-3">
        {/* Emoji */}
        <span
          className="text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {emoji}
        </span>

        {/* Label */}
        <span
          className="text-base font-medium transition-colors duration-300"
          style={{ color: '#d5cec4' }}
        >
          {label}
        </span>
      </span>

      {/* Subtle glow on hover */}
      <span
        className="
          absolute inset-0 rounded-[inherit] opacity-0
          group-hover:opacity-100 transition-opacity duration-500
          pointer-events-none
        "
        style={{
          background: isAmber
            ? 'radial-gradient(ellipse at 20% 50%, rgba(246,200,87,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 20% 50%, rgba(125,184,138,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </motion.button>
  )
}
