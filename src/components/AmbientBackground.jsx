/**
 * AmbientBackground.jsx
 *
 * Renders the animated layered gradient background that fills the viewport.
 * Now supports theming via CSS variables and respects `reduceMotion`.
 */
import React from 'react'
import { motion } from 'framer-motion'

export default function AmbientBackground({ reduceMotion }) {
  // Generate random particles (memoized to avoid re-rendering layout jumps)
  const particles = React.useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 15,
    }))
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-700">
      
      {/* Primary orb — top-left */}
      <motion.div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.08 }}
        animate={reduceMotion ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary orb — bottom-right */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)', opacity: 0.08 }}
        animate={reduceMotion ? {} : { x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Particles */}
      {!reduceMotion && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'var(--color-primary)',
            opacity: 0,
            boxShadow: '0 0 10px var(--color-primary)'
          }}
          animate={{
            y: [0, -150],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 0.4, 0],
            scale: [1, 1.5, 0.8]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
        />
      ))}

      {/* Subtle centre vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />
    </div>
  )
}
